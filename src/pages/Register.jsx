import { React, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Register.css";
import userService from "../services/userService";
import toast from "react-hot-toast";
import { useAuth } from "../store/tokenStore";
import signupSchema from "../validations/signup-validations";

export const Register = () => {
  const [user, setUser] = useState({
    name: "",
    username: "",
    email: "",
    phone: "",
    password: "",
    image:
      "https://icons.veryicon.com/png/o/miscellaneous/two-color-icon-library/user-286.png",
  });

  const [errors, setErrors] = useState([]);
  const navigate = useNavigate();

  const { storeToken, storeUser } = useAuth();

  const handleInput = (e) => {
    //console.log(e);
    let name = e.target.name;
    let value = e.target.value;

    setUser({
      ...user,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await signupSchema.validate(user, { abortEarly: false });

      const res = await userService.register({ user });
      const token = res.data.token;
      const userInfo = res.data.user;
      toast.success(res.data.message, { position: "top-right" });
      setUser({
        name: "",
        username: "",
        email: "",
        phone: "",
        password: "",
        image: "",
      });
      await storeToken(token);
      await storeUser(userInfo);
      navigate("/");
      //console.log(res.data);
    } catch (error) {
      const newErrors = {};

      error.inner.forEach((err) => {
        newErrors[err.path] = err.message;
      });

      setErrors(newErrors);

      toast.error(error.response?.data?.message || error.message, {
        position: "top-right",
      });
    }
  };
  return (
    <>
      <div className="Auth-form-container">
        <form onSubmit={handleSubmit} className="Auth-form">
          <div className="Auth-form-content">
            <h3 className="Auth-form-title">Sign Up</h3>
            <div className="form-group mt-3">
              <label htmlFor="email">Name</label>
              <input
                type="name"
                className="form-control mt-1"
                name="name"
                autoComplete="on"
                onChange={handleInput}
                value={user.name}
                placeholder="Enter name"
              />
              {errors.name && <div className="error">{errors.name}</div>}
            </div>
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
              {errors.username && (
                <div className="error">{errors.username}</div>
              )}
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
              {errors.email && <div className="error">{errors.email}</div>}
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
              {errors.phone && <div className="error">{errors.phone}</div>}
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
              {errors.password && (
                <div className="error">{errors.password}</div>
              )}
            </div>
            <div className="d-grid gap-2 mt-3">
              <button type="submit" className="btn btn-primary">
                Submit
              </button>
            </div>
            <p className="forgot-password text-right mt-2">
              Already Registered? <Link to={"/"}>Sign In</Link>
            </p>
          </div>
        </form>
      </div>
    </>
  );
};
