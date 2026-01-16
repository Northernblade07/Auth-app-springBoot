export default interface User{
    id:string;
    email:string;
    // password:string
    name?:string;
    image?:string;
    enabled:boolean;
    updatedAt?:string;
    createdAt?:string;
    provider:string;
}