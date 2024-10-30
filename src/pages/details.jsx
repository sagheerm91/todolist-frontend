import React, { useEffect, useState } from "react";
import styles from "./details.module.css";
import { useLocation } from "react-router-dom";
import courseService from "../services/courseService";

export const Details = () => {
  const location = useLocation();
  const { course, checkPurchase } = location.state;
  const [purchased, setPurchased] = useState(checkPurchase);

  const user = localStorage.getItem("user");
  const parsedUser = JSON.parse(user);
  const userId = parsedUser._id;

  const fetchOrders = async () => {
    try {
      const ordersRes = await courseService.getUserOrders({ userId });
      const purchasedCourses = ordersRes.data.orders.map(
        (order) => order.courseId
      );
      // console.log("====================================");
      // console.log("Purchased? ", purchasedCourses);
      // console.log("====================================");
      if (purchasedCourses.includes(course._id)) {
        console.log("isPurchased? ", purchasedCourses.includes(course._id));
        setPurchased(true);
      }
    } catch (error) {
      console.error("Error fetching user orders:", error);
    }
  };
  const handlePurchase = async (courseId) => {
    try {
      await courseService.purchaseCourse({ userId, courseId });
      setPurchased(true);
      fetchOrders();
    } catch (error) {
      console.error("Error purchasing course:", error);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  return (
    <>
      {}
      <section>
        <div className={`${styles.container} ${styles.flex}`}>
          <div className={styles.left}>
            <div className={styles.main_image}>
              <img
                src={course.image}
                alt={course.image}
                className={styles.main_image}
              />
            </div>
          </div>
          <div className={styles.right}>
            <h3>{course.title}</h3>
            <p>{course.description}</p>
            <h6 className="mt-4">
              {purchased ? (
                <p>YOU HAVE ALREADY PURCHASED IT ...</p>
              ) : (
                <del>
                  <small>${course.originalPrice}</small>
                </del>
              )}
            </h6>
            <h4>
              {purchased ? (
                <p>Happy Learning &#128540;</p>
              ) : (
                <small>${course.discountedPrice}</small>
              )}
            </h4>

            <button
              className="btn btn-primary w-100"
              onClick={() => handlePurchase(course._id)}
              disabled={purchased}
            >
              {purchased ? "Purchased" : "Buy Now"}
            </button>
          </div>
        </div>
      </section>
    </>
  );
};
