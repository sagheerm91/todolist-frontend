import axios from "axios";

const instance = axios.create({
    baseUrl : process.env.REACT_APP_BASE_URL,
    timeout: 10000,
    headers:{
        author : 'Sagheer'
      }
      
});


instance.interceptors.request.use((config) => {
    console.log("This Request Is From Interceptor");
    return config;
},
error => {
    return Promise.reject(error);
  }
); 

instance.interceptors.response.use((response) => {
    console.log("Response From Interceptor ", response);
    if(response.status === 200){
        console.log("This is response from interceptor with 200 status code...");
    }
    return response;
},
error => {
    if(error.response.status === 404){
        console.log("This is 404 from interceptor...");
    }
    return Promise.reject(error);
}
);

export default instance;