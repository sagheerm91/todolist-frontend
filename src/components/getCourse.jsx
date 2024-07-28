import React from "react";
import "../App.css";
import toast from "react-hot-toast";
import { useAuth } from "../store/tokenStore";
import { useState } from "react";
import courseService from "../services/courseService";
import { Link, useNavigate } from "react-router-dom";

const Course = ({ courses, deleteSingleCourse }) => {
  const { checkAdmin, checkLogIn } = useAuth();
  const [isAdmin, setIsAdmin] = useState(checkAdmin);
  const [isLoggedIn, setIsLoggedIn] = useState(checkLogIn);

  // console.log("====================================");
  // console.log("CHECK IS ADMIN --- ", isAdmin);
  // console.log("====================================");

  const deleteCourse = async (id) => {
    try {
      const response = await courseService.deleteCourse({ id });
      if (response) {
        toast.success(response.data.message || "Course deleted successfully", {
          position: "top-right",
        });
        deleteSingleCourse(id);
      }
    } catch (error) {
      console.log("Error while deleting the record", error);
      toast.error(
        error.response?.data?.message ||
          error.message ||
          "Failed to delete course",
        {
          position: "top-right",
        }
      );
    }
  };
  const navigate = useNavigate();
  return (
    <>
      {isLoggedIn ? (
        isAdmin ? (
          <div>
            <div className="d-flex justify-content-end mb-3">
              <Link to="/add-course" className="btn btn-primary col-md-3">
                Add New
              </Link>
            </div>
            <table className="table table-bordered">
              <thead>
                <tr>
                  <th scope="col">S. No.</th>
                  <th scope="col">Title</th>
                  <th scope="col">Price</th>
                  <th scope="col">Dis. Price</th>
                  <th scope="col">Img</th>
                  <th scope="col">Actions</th>
                </tr>
              </thead>
              <tbody>
                {courses?.map((course, index) => (
                  <tr key={course._id}>
                    <td>{index + 1}</td>
                    <td>{course.title}</td>
                    <td>{course.originalPrice}</td>
                    <td>{course.discountedPrice}</td>
                    <td>
                      {
                        <img
                          src={course.image}
                          alt={course.title}
                          className="course-image"
                        />
                      }
                    </td>
                    <td className="actionButtons">
                      <Link
                        /// onClick={() => updateCourse(course._id, index)}
                        type="button"
                        to={"/update-course/" + course._id}
                        className="btn btn-info"
                      >
                        <i className="fa-solid fa-pen-to-square"></i>
                      </Link>
                      <button
                        onClick={() => deleteCourse(course._id)}
                        type="button"
                        className="btn btn-danger"
                      >
                        <i className="fa-solid fa-trash"></i>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div>
            <table className="table table-bordered">
              <thead>
                <tr>
                  <th scope="col">Task No.</th>
                  <th scope="col">Task Description</th>
                </tr>
              </thead>
              <tbody>
                {courses?.map((course, index) => (
                  <tr key={course._id}>
                    <td>{index + 1}</td>
                    <td>{course.title}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )
      ) : (
        navigate("/")
      )}
    </>
  );
};

export default Course;
