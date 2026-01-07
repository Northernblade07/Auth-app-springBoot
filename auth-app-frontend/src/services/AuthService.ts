import type RegisterData from "@/models/RegisterData"
import apiClient from "@/config/ApiClient"
import type LoginData from "@/models/LoginData";
// auth api calls to server
export const registerUser = async(SignUpData:RegisterData)=>{

    const res = await apiClient.post('/auth/register' , SignUpData)
    console.log(res , "register");
    return res.data;
}

export const loginUser =async(loginData:LoginData)=>{
    const res = await apiClient.post('/auth/login' , loginData);
    console.log(res);
    return res.data
}