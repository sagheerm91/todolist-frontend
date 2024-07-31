import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { loadStripe } from "@stripe/stripe-js";
import Navbar from "./Navbar";
import "./cart.css";
import { useAuth } from "../store/tokenStore";
import courseService from "../services/courseService";

const stripekey = process.env.REACT_APP_STRIPE_KEY;

const stripePromise = loadStripe(`${stripekey}`);

const Cart = () => {
  const { checkLogIn } = useAuth();
  const { checkAdmin } = useAuth();

  const [isLoggedIn, setIsLoggedIn] = React.useState(checkLogIn);
  const [isAdmin, setIsAdmin] = React.useState(checkAdmin);

  const [courses, setCourses] = React.useState([]);
  const [totalPrice, setTotalPrice] = React.useState(0);
  const [ids, setIds] = useState([]);

  const userObj = localStorage.getItem("user");
  const parsedUser = JSON.parse(userObj);
  const userId = parsedUser._id;
  const user = parsedUser._id;
  const name = parsedUser.name;

  const navigate = useNavigate();

  const fetchData = async () => {
    try {
      const ordersRes = await courseService.getUserOrders({ userId });
      const orders = ordersRes.data.orders;

      if (orders && Array.isArray(orders)) {
        const coursePromises = orders.map((order) =>
          courseService.getSingleCourse(order.courseId)
        );

        const coursesRes = await Promise.all(coursePromises);
        const coursesData = coursesRes.map((res) => res.data);

        setCourses(coursesData);

        const course_ids = coursesData.map((c) => c._id);
        setIds(course_ids);

        // Calculate the total price
        const total = coursesData.reduce(
          (acc, course) => acc + course.discountedPrice,
          0
        );
        setTotalPrice(total);
      } else {
        console.log("Orders data is not an array:", orders);
      }
    } catch (error) {
      console.log("Error fetching orders:", error);
    }
  };

  React.useEffect(() => {
    fetchData();
  }, []);

  const handleCheckout = async () => {
    const response = await courseService.makePaymentRequest({
      totalPrice,
      name,
      user,
      ids,
    });

    const session = await response;
    const stripe = await stripePromise;

    // Redirect to Stripe Checkout
    const { error } = await stripe.redirectToCheckout({
      sessionId: session.id,
    });

    if (error) {
      console.error("Stripe Checkout error:", error);
    }
  };

  return (
    <>
      <Navbar />
      <div className="cart_section">
        <div className="container-fluid">
          <div className="row">
            <div className="col-lg-10 offset-lg-1">
              <div className="cart_container">
                <div className="cart_title">Shopping Cart</div>
                <div className="cart_items">
                  <ul className="cart_list">
                    {courses?.map((course, index) => (
                      <li key={index} className="cart_item clearfix">
                        <div className="cart_item_image">
                          <img src={course.image} alt={course.title} />
                        </div>
                        <div className="cart_item_info d-flex flex-md-row flex-column justify-content-between">
                          <div className="cart_item_name cart_info_col">
                            <div className="cart_item_text">{course.title}</div>
                          </div>
                          <div className="cart_item_price cart_info_col">
                            <div className="cart_item_text">
                              ${course.discountedPrice}
                            </div>
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="order_total align d-flex justify-content-end">
                  <div className="order_total_content text-md-right">
                    <div className="order_total_title">Order Total:</div>
                    <div className="order_total_amount">${totalPrice}</div>
                  </div>
                </div>
                <div className="cart_buttons">
                  <NavLink
                    type="button"
                    className="button cart_button_clear no-underline"
                    to={"/get-courses"}
                  >
                    Continue Shopping
                  </NavLink>
                  <button
                    type="button"
                    className="button cart_button_checkout"
                    onClick={handleCheckout}
                  >
                    Checkout
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Cart;
