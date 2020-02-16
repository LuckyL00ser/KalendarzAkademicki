import axios from 'axios'

function  login(credentials) {
    return axios.post('/api/auth/login',credentials).then(response=>{
        setAxiosToken(response.data.access_token);
        return response;
    })
}
 function register(userData){
    return axios.post('/api/auth/register',userData)
}
 function logout(){
     return axios.post('/api/auth/logout').finally((response)=>{
         axios.defaults.headers.common['Authorization'] = null;
         return response;
     });

 }
function getLocalUser(){
    const userStr = localStorage.getItem("user");
    if(!userStr)
        return null;
    return JSON.parse(userStr);
}
function setAxiosToken(token){
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
}



export {login,register,logout,getLocalUser,setAxiosToken};
