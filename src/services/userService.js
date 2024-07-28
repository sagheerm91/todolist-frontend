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

    async update({userId, user}){
        console.log('====================================');
        console.log("FORM DATA ---- ", user);
        console.log('====================================');
        const response = await instance.put(`${baseUrl}/users/update-user/${userId}`, user, {
            headers : {
                "Content-Type": "multipart/form-data"
            }
        });
        return response;
    }
}

export default new userService();