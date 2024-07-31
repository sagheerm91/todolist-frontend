import React, { useEffect } from "react";
import { NavLink, useLocation } from "react-router-dom";
import courseService from "../services/courseService";
import "../App.css";

const Declined = () => {
  const location = useLocation();
  const query = new URLSearchParams(location.search);
  const orderId = query.get("order_id");

  useEffect(() => {
    const handleDeclinedPayment = async () => {
      if (orderId) {
        try {
          const response = await courseService.handleCancelPayment({ orderId });
          console.log("Order status updated:", response);
        } catch (error) {
          console.error("Error updating order status:", error);
        }
      }
    };

    handleDeclinedPayment();
  }, [orderId]);

  return (
    <div className="vh-100 d-flex justify-content-center align-items-center">
      <div className="col-md-4">
        <div className="border border-3 border-danger"></div>
        <div className="card bg-white shadow p-5">
          <div className="mb-4 text-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="text-danger"
              width="75"
              height="75"
              fill="#dc3545"
              viewBox="0 0 16 16"
            >
              <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
              <path d="M11.854 4.146a.5.5 0 0 0-.708 0L8 7.293 4.854 4.146a.5.5 0 1 0-.708.708L7.293 8l-3.147 3.146a.5.5 0 0 0 .708.708L8 8.707l3.146 3.147a.5.5 0 0 0 .708-.708L8.707 8l3.147-3.146a.5.5 0 0 0 0-.708z" />
            </svg>
          </div>
          <div className="align-items-center text-center">
            <h1 className="text-danger">Payment Declined</h1>
            <p>Your payment could not be processed.</p>
            <NavLink
              type="button"
              className="btn btn-primary"
              to="/get-courses"
            >
              Back to Courses
            </NavLink>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Declined;
