import React, { useState, useEffect } from "react";
import Navbar from "./Navbar";
import "./courses.css";
import courseService from "../services/courseService";
import { useAuth } from "../store/tokenStore";
import UpdateCourse from "./getCourse";
import Pagination from "./pagination";
import { useNavigate } from "react-router";

const Courses = () => {
  const { checkLogIn } = useAuth();
  const { checkAdmin } = useAuth();

  const [isLoggedIn, setIsLoggedIn] = useState(checkLogIn);
  const [isAdmin, setIsAdmin] = useState(checkAdmin);

  const [courses, setCourses] = useState([]);
  const [purchased, setPurchased] = useState([]);

  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(3);
  const [totalPages, setTotalPages] = useState(1);
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");

  const user = localStorage.getItem("user");
  const parsedUser = JSON.parse(user);
  const userId = parsedUser._id;
  // console.log("====================================");
  // console.log("USER ID --- ", userId);
  // console.log("====================================");

  const navigate = useNavigate();

  const fetchData = async () => {
    if (isAdmin) {
      const res = await courseService.getCoursesByUser({
        userId,
        page,
        limit,
        search,
      });
      setCourses(res.data);
      setTotalPages(res.totalPages);
    } else {
      const [coursesRes, ordersRes] = await Promise.all([
        courseService.getAllCourses({ page, limit, search }),
        courseService.getUserOrders({ userId }),
      ]);
      setCourses(coursesRes.data);
      setTotalPages(coursesRes.totalPages);
      setPurchased(ordersRes.data.orders.map((order) => order.courseId));
    }
  };
  // console.log("====================================");
  // console.log("Purchased --- ", purchased);
  // console.log("====================================");
  const handlePurchase = async (courseId) => {
    try {
      const res = await courseService.purchaseCourse({ userId, courseId });
      setPurchased([...purchased, courseId]);
      fetchData(); // Refresh course data to reflect the purchase status
    } catch (error) {
      console.error("Error purchasing course:", error);
    }
  };
  const deleteCourse = (id) => {
    setCourses((oldCourses) => {
      return oldCourses.filter((course) => course._id !== id);
    });
  };

  const handleCardClick = (course) => {
    const checkPurchase = purchased.includes(course._id);
    navigate("/details", { state: { course, checkPurchase } });
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(search);
    }, 2000); // 3 seconds debounce

    return () => {
      clearTimeout(timer);
    };
  }, [search]);

  useEffect(() => {
    fetchData();
  }, [page, limit, debouncedSearch]);

  return (
    <>
      {isLoggedIn ? (
        isAdmin ? (
          <>
            <Navbar />
            <div className="userTable">
              <h3>Courses</h3>
              <input
                className="mt-4 col-sm-4 p-2"
                type="text"
                placeholder="Search the courses..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              <UpdateCourse
                courses={courses}
                deleteSingleCourse={deleteCourse}
              />
              <div>
                <Pagination
                  page={page}
                  limit={limit}
                  totalPages={totalPages}
                  onPageChange={setPage}
                  onLimitChange={setLimit}
                />
              </div>
            </div>
          </>
        ) : (
          <>
            <Navbar />
            <div className="align-items-center text-center">
              {/* <h2>Courses</h2> */}
              <div className="d-flex justify-content-end">
                <input
                  className="mt-4 me-4 col-sm-2 p-2"
                  type="text"
                  placeholder="Search the courses..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </div>
              <div>
                <div className="row">
                  {courses?.map((course, index) => (
                    <div key={index} className="col-sm-4">
                      <div className="card">
                        <div
                          className="image"
                          onClick={() => handleCardClick(course)}
                        >
                          <img src={`${course.image}`} alt={course.title} />
                        </div>
                        <div className="card-inner">
                          <div className="header">
                            <h3>{course.title}</h3>
                            {purchased.includes(course._id) ? (
                              <h4>Purchased !!</h4>
                            ) : (
                              <h4>{course.discountedPrice}</h4>
                            )}
                          </div>
                          <div className="content">
                            {purchased.includes(course._id) ? (
                              <p>Happy Learning &#128540;</p>
                            ) : (
                              <p>
                                <del>{course.originalPrice}</del>
                              </p>
                            )}

                            <button
                              className="btn btn-primary w-100"
                              onClick={() => handlePurchase(course._id)}
                              disabled={purchased.includes(course._id)}
                            >
                              {purchased.includes(course._id)
                                ? "Purchased"
                                : "Buy Now"}
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <Pagination
                  page={page}
                  limit={limit}
                  totalPages={totalPages}
                  onPageChange={setPage}
                  onLimitChange={setLimit}
                />
              </div>
            </div>
          </>
        )
      ) : (
        <>{navigate("/")}</>
      )}
    </>
  );
};

export default Courses;
