import useAuth from '@/auth/store';
import { refreshToken } from '@/services/AuthService';
import axios from 'axios'
const BASE_URL ="http://localhost:8082/api/v1"

const apiClient = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_USL || BASE_URL,
    headers:{
        'Content-Type': "application/json",
    },
    withCredentials:true,
    timeout:10000,
});

apiClient.interceptors.request.use((config)=>{

const accessToken = useAuth.getState().accessToken
if(accessToken){
    config.headers.Authorization=`Bearer ${accessToken}`;

}

    return config
})


let isRefreshing = false;
let pending:any[] = [];


// to push the request that are passed when refreshing the token
function queueRequest(cb:any){
    pending.push(cb);
}

// to resolve the pending request while token was refreshing 
function resolveRequest(newToken:string){

    pending.forEach((cb)=>cb(newToken));
    pending = [];
}


apiClient.interceptors.response.use((response)=>response,
async(error)=>{
    const is401 = error.response.status == 401;
    const original = error.config;
    if(!is401 || original._retry){
        return Promise.reject(error);
    }

    // we will try to refresh the token 
    if(isRefreshing){
        return new Promise((resolve , reject)=>{
            queueRequest((newToken:string)=>{
                if(!newToken){
                   return reject();
                }

                original.headers.Authorization = `Bearer ${newToken}`;
                resolve(apiClient(original))
            })
        })
    }

    // start refresh
    isRefreshing=true;
    try {
        
        const loginResponse = await refreshToken()
        const newToken = loginResponse.accessToken;
        if(!newToken){
            throw new Error("no access token recieved ");
        }
        
    } catch (error) {
        console.log(error)
    }

})
export default apiClient