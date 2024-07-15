import { React, useState } from "react";
import "./Register.css"
import { Link } from "react-router-dom";
import userService from "../services/userService";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../store/tokenStore";

export const Login = () => {
  const [user, setUser] = useState({
    username: "",
    password: "",
  });

const navigate = useNavigate();
const {storeToken} = useAuth();

  // let handle the input field value
  const handleInput = (e) => {
    let name = e.target.name;
    let value = e.target.value;

    setUser({
      ...user,
      [name]: value,
    });
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    try {
      const res = await userService.login({user});
      const token = res.data.token;
      toast.success(res.data.message, { position: "top-right" });
      setUser({
        username: "",
        password: ""
      });
     await storeToken(token);
      navigate("/get-todos");
      //console.log(res.data);
    } catch (error) {
      toast.error(error.response?.data?.message || error.message, { position: "top-right" });
    }
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
          </div>
        </form>
      </div>
    </>
  );
};
