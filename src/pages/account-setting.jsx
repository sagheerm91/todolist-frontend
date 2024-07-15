import { json } from "react-router-dom";
import Navbar from "../components/Navbar";
import "./account-setting.css";

export const AccountSetting = () => {
    const userFromLS = localStorage.getItem("user");
    const modifiedUser = JSON.parse(userFromLS);
    const isAdmin = modifiedUser.isAdmin;
  return (
    <>
      <Navbar />
      <div class="container rounded bg-white mt-5 mb-5">
        <div class="row">
          <div class="col-md-3 border-right">
            <div class="d-flex flex-column align-items-center text-center p-3 py-5">
              <img
                class="rounded-circle mt-5"
                width="150px"
                src="https://st3.depositphotos.com/15648834/17930/v/600/depositphotos_179308454-stock-illustration-unknown-person-silhouette-glasses-profile.jpg"
              />
              <span class="font-weight-bold">{modifiedUser.email}</span>
              <span class="text-black-50">{modifiedUser.phone}</span>
              <span> </span>
            </div>
          </div>
          <div class="col-md-5 border-right">
            <div class="p-3 py-5">
              <div class="d-flex justify-content-between align-items-center mb-3">
                <h4 class="text-right">Profile Settings</h4>
              </div>
              <div class="row mt-2">
                <div class="col-md-12">
                  <label class="labels">Name</label>
                  <input
                    type="text"
                    class="form-control"
                    placeholder="Your Name"
                    value={modifiedUser.name}
                  />
                </div>
              </div>
              <div class="row mt-2">
                <div class="col-md-12">
                  <label class="labels">Email</label>
                  <input
                    type="text"
                    class="form-control"
                    placeholder="Enter Email"
                    value={modifiedUser.email}
                  />
                </div>
              </div>
              <div class="row mt-2">
                <div class="col-md-12">
                  <label class="labels">Phone</label>
                  <input
                    type="text"
                    class="form-control"
                    placeholder="Enter Phone"
                    value={modifiedUser.phone}
                  />
                </div>
              </div>
              <div class="row mt-2">
                <div class="col-md-12">
                  <label class="labels">Account Type</label>
                  <input disabled
                    type="text"
                    class="form-control"
                    placeholder="Your Account Type"
                    value={isAdmin ? 'Admin' : 'General User'}
                  />
                </div>
              </div>
              {/* <div class="row mt-3">
                                <div class="col-md-6"><label class="labels">State/Region</label><input type="text" class="form-control" value="" placeholder="state" /></div>
                            </div> */}
              <div class="mt-5 text-center">
                <button class="btn btn-primary col-md-6 profile-button" type="button">
                  Save Profile
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
