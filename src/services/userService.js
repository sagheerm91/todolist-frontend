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

    async googleLogin({googleToken}){
       // console.log("G Token --- ", googleToken);
        const response = await instance.post(`${baseUrl}/users/google-login`, {googleToken});
        return response;
    }

    async facebookLogin({fbData}){
        console.log("FB Data --- ", fbData);
        const response = await instance.post(`${baseUrl}/users/facebook-login`, {fbData});
        return response;
    }

    async update({userId, user}){
        // console.log('====================================');
        // console.log("FORM DATA ---- ", user);
        // console.log('====================================');
        const response = await instance.put(`${baseUrl}/users/update-user/${userId}`, user, {
            headers : {
                "Content-Type": "multipart/form-data"
            }
        });
        return response;
    }
}

export default new userService();