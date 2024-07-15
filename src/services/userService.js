import instance from "./todoInterceptor";

const baseUrl = process.env.REACT_APP_BASE_URL;

class userService{
    async register({user}){
        const response = await instance.post(
            `${baseUrl}/users/register-user`,
            user
          );
    
          return response;
    }

    async login({user}){
        const response = await instance.post(`${baseUrl}/users/login`, user);
        return response;
    }
}

export default new userService();