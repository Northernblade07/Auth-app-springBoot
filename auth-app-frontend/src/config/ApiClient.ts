import useAuth from '@/auth/store';
import { refreshToken } from '@/services/AuthService';
import axios from 'axios'
const BASE_URL ="http://localhost:8082/api/v1"

const apiClient = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL || BASE_URL,
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
    console.log(error)
   const status = error?.response?.status;
const is401 = status === 401;
    const original = error.config;
    console.log("original" , original);
    console.log("original" , original._retry);
    if(!is401 || original._retry){
        return Promise.reject(error);
    }
    original._retry=true;
    // we will try to refresh the token 
    if(isRefreshing){
        console.log("already refreshing...");
        return new Promise((resolve , reject)=>{
            queueRequest((newToken:string)=>{
                if(!newToken){
                   return reject(new Error("Token refresh failed"));
                }

                original.headers.Authorization = `Bearer ${newToken}`;
                resolve(apiClient(original))
            })
        })
    }

    // start refresh
    isRefreshing=true;
    try {
        console.log("start refreshing...");
        const loginResponse = await refreshToken()
        const newToken = loginResponse.accessToken;
        if(!newToken){
            throw new Error("no access token recieved ");
        }
        useAuth.getState().changeLocalLoginData(loginResponse.accessToken , loginResponse.user ,true );

        resolveRequest(newToken);

        original.headers.Authorization=`Bearer ${newToken}`;
        return apiClient(original);
    } catch (error) {
        console.log(error)
        resolveRequest('');
        pending=[];
        useAuth.getState().logout();
        return Promise.reject(error);

    } finally{
        isRefreshing = false;
    }

})
export default apiClient