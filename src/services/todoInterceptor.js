import axios from "axios";

const getToken = () => {
  return localStorage.getItem("token");
};
const getUser = () => {
  return localStorage.getItem("user");
};

const instance = axios.create({
  baseUrl: process.env.REACT_APP_BASE_URL,
  timeout: 10000,
  headers: {
    accept: "application/json",
  },
});

instance.interceptors.request.use(
  (config) => {
    const token = getToken();
    if (token) {
      const user = JSON.parse(getUser());

      console.log("This Request Is From Interceptor");

    //   console.log("====================================");
    //   console.log("USER ID FROM INTERCEPTOR --- ", user._id);
    //   console.log("====================================");

      config.headers["Authorization"] = token;
      config.headers["UserId"] = user._id;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

instance.interceptors.response.use(
  (response) => {
    console.log("Response From Interceptor ", response);
    if (response.status === 200) {
      console.log("This is response from interceptor with 200 status code...");
    }
    return response;
  },
  (error) => {
    if (error.response.status === 404) {
      console.log("This is 404 from interceptor...");
    }
    return Promise.reject(error);
  }
);

export default instance;
