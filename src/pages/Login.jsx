import { React, useEffect, useState } from "react";
import "./Register.css";
import { Link } from "react-router-dom";
import userService from "../services/userService";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../store/tokenStore";
import { GoogleLogin } from "@react-oauth/google";
import { LoginSocialFacebook } from "reactjs-social-login";
import { FacebookLoginButton } from "react-social-login-buttons";

export const Login = () => {
  const [user, setUser] = useState({
    username: "",
    password: "",
  });

  const appId = process.env.REACT_APP_FB_APP_ID;

  const navigate = useNavigate();

  const { storeToken } = useAuth();
  const { storeUser, checkLogIn } = useAuth();

  // let handle the input field value
  const handleInput = (e) => {
    let name = e.target.name;
    let value = e.target.value;

    setUser({
      ...user,
      [name]: value,
    });
  };

  console.log("isLoggedin", checkLogIn);

  useEffect(() => {
    if (checkLogIn()) {
      navigate("/get-todos");
    }
  }, [checkLogIn]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await userService.login({ user });
      const token = res.data.token;

      const userInfo = res.data.user;

      toast.success(res.data.message, { position: "top-right" });
      setUser({
        username: "",
        password: "",
      });
      await storeToken(token);
      await storeUser(userInfo);
      navigate("/get-todos");
      //console.log(res.data);
    } catch (error) {
      toast.error(error.response?.data?.message || error.message, {
        position: "top-right",
      });
    }
  };

  const responseMessage = async (response) => {
    const googleToken = response.credential;

    try {
      const res = await userService.googleLogin({ googleToken });

      const token = res.data.token;

      const userInfo = res.data.user;

      console.log(res);
      toast.success(res.data.message, { position: "top-right" });

      await storeToken(token);
      await storeUser(userInfo);

      navigate("/get-todos");
      //console.log(res.data);
    } catch (error) {
      toast.error(error.response?.data?.message || error.message, {
        position: "top-right",
      });
    }
  };
  const errorMessage = (error) => {
    console.log(error);
  };

  const FBLoginSuccess = async (response) => {
    const fbData = response.data;
    try {
      const res = await userService.facebookLogin({ fbData });

      const token = res.data.token;

      const userInfo = res.data.user;

      console.log(res);
      toast.success(res.data.message, { position: "top-right" });

      await storeToken(token);
      await storeUser(userInfo);

      navigate("/get-todos");
      //console.log(res.data);
    } catch (error) {
      toast.error(error.response?.data?.message || error.message, {
        position: "top-right",
      });
    }
  };

  const FBLoginError = async (error) => {
    console.log("Error --- ", error);
  };

  return (
    <>
      <div className="Auth-form-container">
        <form onSubmit={handleSubmit} className="Auth-form">
          <div className="Auth-form-content">
            <h3 className="Auth-form-title">Sign In</h3>
            <div className="form-group mt-3">
              <label htmlFor="username">Username</label>
              <input
                type="text"
                className="form-control mt-1"
                name="username"
                onChange={handleInput}
                value={user.username}
                placeholder="Enter username"
                required
              />
            </div>

            <div className="form-group mt-3">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                className="form-control mt-1"
                name="password"
                onChange={handleInput}
                value={user.password}
                placeholder="Enter password"
                required
              />
            </div>
            <div className="d-grid gap-2 mt-3">
              <button type="submit" className="btn btn-primary">
                Login
              </button>
            </div>
            <p className="forgot-password text-right mt-2">
              Not Registered? <Link to={"/register"}>Sign Up</Link>
            </p>
            <div>
              <hr />
              <GoogleLogin onSuccess={responseMessage} onError={errorMessage} />
            </div>
            <div className="mt-4">
              <LoginSocialFacebook
                appId={appId}
                onResolve={FBLoginSuccess}
                onReject={FBLoginError}
              >
                <FacebookLoginButton />
              </LoginSocialFacebook>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};
