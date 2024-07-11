import { React, useState, useNavigate } from "react";
import "./Register.css";
import userService from "../services/userService";
import toast from "react-hot-toast";

export const Register = () => {
  const [user, setUser] = useState({
    username: "",
    email: "",
    phone: "",
    password: "",
  });

  //const navigate = useNavigate();
  const handleInput = (e) => {
    //console.log(e);
    let name = e.target.name;
    let value = e.target.value;

    setUser({
      ...user,
      [name]: value,
    });
  };

  const handleSubmit = async() => {
    
    try {
      const res = await userService.register({user});
      toast.success(res.data.message, { position: "top-right" });
      setUser({
        username: "",
        email: "",
        phone: "",
        password: ""
      });
      console.log(res.data);
    } catch (error) {
      toast.error(error.response?.data?.message || error.message, { position: "top-right" });
    }
  };
  return (
    <>
      <div className="Auth-form-container">
        <form onSubmit={handleSubmit} className="Auth-form">
          <div className="Auth-form-content">
            <h3 className="Auth-form-title">Sign Up</h3>
            <div className="form-group mt-3">
              <label htmlFor="username">Username</label>
              <input
                type="text"
                className="form-control mt-1"
                name="username"
                onChange={handleInput}
                autoComplete="on"
                value={user.username}
                placeholder="Enter username"
              />
            </div>
            <div className="form-group mt-3">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                className="form-control mt-1"
                name="email"
                autoComplete="on"
                onChange={handleInput}
                value={user.email}
                placeholder="Enter email"
              />
            </div>
            <div className="form-group mt-3">
              <label htmlFor="phone">Phone</label>
              <input
                type="text"
                className="form-control mt-1"
                name="phone"
                autoComplete="on"
                onChange={handleInput}
                value={user.phone}
                placeholder="Enter phone"
              />
            </div>
            <div className="form-group mt-3">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                className="form-control mt-1"
                name="password"
                onChange={handleInput}
                autoComplete="on"
                value={user.password}
                placeholder="Enter password"
              />
            </div>
            <div className="d-grid gap-2 mt-3">
              <button type="submit" className="btn btn-primary">
                Submit
              </button>
            </div>
            <p className="forgot-password text-right mt-2">
              Already Registered? <a href="#">Sign In</a>
            </p>
          </div>
        </form>
      </div>
    </>
  );
};
