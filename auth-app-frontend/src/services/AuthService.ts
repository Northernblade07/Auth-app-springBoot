import type RegisterData from "@/models/RegisterData"
import apiClient from "@/config/ApiClient"
import type LoginData from "@/models/LoginData";
import type LoginResponseData from "@/models/LoginResponseData";
// auth api calls to server
export const registerUser = async(SignUpData:RegisterData)=>{

    const res = await apiClient.post('/auth/register' , SignUpData)
    console.log(res , "register");
    return res.data;
}

export const loginUser =async(loginData:LoginData)=>{
    const res = await apiClient.post<LoginResponseData>('/auth/login' , loginData);
    console.log(res);
    return res.data
}

export const logout = async()=>{

    const res = await apiClient.post('/auth/logout');
    return res.data;
}

// get current loged in user info
export const getCurrentUser = async(emailId:string|undefined)=>{
 
    const res = await apiClient.get(`/users/email/${emailId}`)
    return res.data;
}

// refresh token 
export const refreshToken = async()=>{

    const res = await apiClient.post<LoginResponseData>(`/auth/refresh`);
    return res.data;
}