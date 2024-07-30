// Success.jsx
import React, { useEffect } from "react";
import { NavLink, useLocation } from "react-router-dom";
import courseService from "../services/courseService";
import "../App.css";

const Success = () => {
  const location = useLocation();
  const query = new URLSearchParams(location.search);
  const sessionId = query.get("session_id");

  useEffect(() => {
    const savePaymentDetails = async () => {
      console.log("====================================");
      console.log("Session --- ", sessionId);
      console.log("====================================");
      if (sessionId) {
        try {
          const response = await courseService.savePaymentDetails({
            sessionId,
          });
          console.log("Payment details saved:", response);
        } catch (error) {
          console.error("Error saving payment details:", error);
        }
      }
    };

    savePaymentDetails();
  }, [sessionId]);

  return (
    <>
      <div class="vh-100 d-flex justify-content-center align-items-center">
        <div class="col-md-4">
          <div class="border border-3 border-success"></div>
          <div class="card  bg-white shadow p-5">
            <div class="mb-4 text-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="text-success"
                width="75"
                height="75"
                fill="#198754"
                class="bi bi-check-circle"
                viewBox="0 0 16 16"
              >
                <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
                <path d="M10.97 4.97a.235.235 0 0 0-.02.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-1.071-1.05z" />
              </svg>
            </div>
            <div class="align-items-center text-center">
              <h1 className="text-success">Thank You !</h1>
              <p>You have successfully purchased</p>
              <NavLink
                type="button"
                className="btn btn-primary no-underline"
                to={"/get-courses"}
              >
                Back to Courses
              </NavLink>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Success;
