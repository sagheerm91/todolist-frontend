import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import "./account-setting.css";
import { useState } from "react";
import toast from "react-hot-toast";
import userService from "../services/userService";
import { useAuth } from "../store/tokenStore";

export const AccountSetting = () => {
  const userFromLS = localStorage.getItem("user");
  const modifiedUser = JSON.parse(userFromLS);
  const userId = modifiedUser._id;
  const [imageFile, setImageFile] = useState(null);
  const [isGoogleUser, setIsGoogleUser] = useState(
    modifiedUser.userType === "Google"
  );

  const [user, setUser] = useState({
    name: modifiedUser.name,
    username: modifiedUser.username,
    email: modifiedUser.email,
    phone: modifiedUser.phone,
    image: modifiedUser.image,
  });

  const [imagePreview, setImagePreview] = useState(user.image);
  const navigate = useNavigate();
  const { storeUser } = useAuth();

  const handleInput = (e) => {
    const { name, value } = e.target;
    setUser({
      ...user,
      [name]: value,
    });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (imageFile) {
      user.image = imageFile;
    }

    try {
      console.log("FORM FROM setting page ... ", user);

      const res = await userService.update({ userId, user }); // Update service call
      const userInfo = res.data.user;
      toast.success(res.data.message, { position: "top-right" });
      await storeUser(userInfo);
      navigate("/");
    } catch (error) {
      toast.error(error.response?.data?.message || error.message, {
        position: "top-right",
      });
    }
  };

  return (
    <>
      {isGoogleUser ? (
        <>
          <Navbar />
          <div className="container rounded bg-white mt-5 mb-5">
            <div className="row">
              <div className="col-md-3 border-right">
                <div className="d-flex flex-column align-items-center text-center p-3 py-5">
                  <div className="position-relative">
                    <img
                      className="rounded-circle mt-5"
                      width="150px"
                      src={imagePreview}
                      alt="User Profile"
                    />
                  </div>
                  <span className="font-weight-bold">{user.email}</span>
                  <span className="text-black-50">{user.phone}</span>
                </div>
              </div>

              <div className="col-md-5 border-right">
                <div className="p-3 py-5">
                  <div className="d-flex justify-content-between align-items-center mb-3">
                    <h4 className="text-right">Profile Settings</h4>
                  </div>
                  <div>
                    <div className="row mt-2">
                      <div className="col-md-12">
                        <label className="labels">Name</label>
                        <input
                          type="text"
                          className="form-control"
                          name="name"
                          placeholder="Your Name"
                          onChange={handleInput}
                          value={user.name}
                        />
                      </div>
                    </div>
                    <div className="row mt-2">
                      <div className="col-md-12">
                        <label className="labels">Username</label>
                        <input
                          disabled
                          type="text"
                          className="form-control"
                          placeholder="Your Username"
                          name="username"
                          onChange={handleInput}
                          value={user.username}
                        />
                      </div>
                    </div>
                    <div className="row mt-2">
                      <div className="col-md-12">
                        <label className="labels">Email</label>
                        <input
                          disabled
                          type="text"
                          className="form-control"
                          placeholder="Enter Email"
                          name="email"
                          onChange={handleInput}
                          value={user.email}
                        />
                      </div>
                    </div>
                    <div className="row mt-2">
                      <div className="col-md-12">
                        <label className="labels">Phone</label>
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Enter Phone"
                          name="phone"
                          onChange={handleInput}
                          value={user.phone}
                        />
                      </div>
                    </div>
                    <div className="mt-5 text-center">
                      <button
                        className="btn btn-primary col-md-6 profile-button"
                        onClick={handleSubmit}
                      >
                        Save Profile
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      ) : (
        <>
          <Navbar />
          <div className="container rounded bg-white mt-5 mb-5">
            <div className="row">
              <div className="col-md-3 border-right">
                <div className="d-flex flex-column align-items-center text-center p-3 py-5">
                  <div className="position-relative">
                    <img
                      className="rounded-circle mt-5"
                      width="150px"
                      src={imagePreview}
                      alt="User Profile"
                    />
                    <input
                      type="file"
                      id="profilePicInput"
                      className="d-none"
                      onChange={handleImageChange}
                    />
                    <i
                      style={{ top: "75%", left: "75%", cursor: "pointer" }}
                      className="fa-solid fa-camera"
                      onClick={() =>
                        document.getElementById("profilePicInput").click()
                      }
                    ></i>
                  </div>
                  <span className="font-weight-bold">{user.email}</span>
                  <span className="text-black-50">{user.phone}</span>
                </div>
              </div>

              <div className="col-md-5 border-right">
                <div className="p-3 py-5">
                  <div className="d-flex justify-content-between align-items-center mb-3">
                    <h4 className="text-right">Profile Settings</h4>
                  </div>
                  <div>
                    <div className="row mt-2">
                      <div className="col-md-12">
                        <label className="labels">Name</label>
                        <input
                          type="text"
                          className="form-control"
                          name="name"
                          placeholder="Your Name"
                          onChange={handleInput}
                          value={user.name}
                        />
                      </div>
                    </div>
                    <div className="row mt-2">
                      <div className="col-md-12">
                        <label className="labels">Username</label>
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Your Username"
                          name="username"
                          onChange={handleInput}
                          value={user.username}
                        />
                      </div>
                    </div>
                    <div className="row mt-2">
                      <div className="col-md-12">
                        <label className="labels">Email</label>
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Enter Email"
                          name="email"
                          onChange={handleInput}
                          value={user.email}
                        />
                      </div>
                    </div>
                    <div className="row mt-2">
                      <div className="col-md-12">
                        <label className="labels">Phone</label>
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Enter Phone"
                          name="phone"
                          onChange={handleInput}
                          value={user.phone}
                        />
                      </div>
                    </div>
                    <div className="mt-5 text-center">
                      <button
                        className="btn btn-primary col-md-6 profile-button"
                        onClick={handleSubmit}
                      >
                        Save Profile
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};
