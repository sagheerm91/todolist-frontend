import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import { useNavigate } from "react-router";
import courseService from "../services/courseService";
import toast from "react-hot-toast";
import { useParams } from "react-router-dom";
import courseSchema from "../validations/course-validation";

export const AddCourse = () => {
  const [course, setCourse] = useState({
    title: "",
    originalPrice: "",
    discountedPrice: "",
    description: "",
    image: "",
  });

  const [imageFile, setImageFile] = useState(null);

  const { id } = useParams();

  const [errors, setErrors] = useState([]);

  const navigate = useNavigate();

  const handleInput = (e) => {
    //console.log(e);
    let name = e.target.name;
    let value = e.target.value;

    setCourse({
      ...course,
      [name]: value,
    });
    setErrors({
      ...errors,
      [name]: "", // Clear the error when the user starts typing
    });
  };

  const fetchData = async (id) => {
    const res = await courseService.getSingleCourse(id);
    setCourse(res.data.data);
    // console.log("====================================");
    // console.log("COURSES ---- ", res.data.data);
    // console.log("====================================");
  };

  useEffect(() => {
    if (id) {
      fetchData(id);
    }
  }, []);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setCourse({
        ...course,
        image: file, // Set the file directly
      });
      setErrors({
        ...errors,
        image: "", // Clear the error when the user starts typing
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await courseSchema.validate(course, { abortEarly: false });

      // if (imageFile) {
      //   course.image = imageFile;
      // }

      let res;
      if (id) {
        res = await courseService.updateCourse({ id, course });
      } else {
        res = await courseService.createCourse({ course });
      }
      //  const token = res.data.token;
      // const courseInfo = res.data.course;

      toast.success(res.data.message, { position: "top-right" });

      navigate("/get-courses");
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
      <Navbar />
      <div className="container rounded bg-white mt-5 mb-5 ">
        <h2>{id ? "Update Course" : "Add New Course"}</h2>
        <div>
          <div className="col-md-5 border-right">
            <label htmlFor="title">Title</label>
            <input
              type="text"
              className="form-control"
              name="title"
              value={course.title}
              onChange={handleInput}
              required
            />
            {errors.title && <div className="error">{errors.title}</div>}
          </div>
          <div className="col-md-5 border-right">
            <label htmlFor="description">Description</label>
            <input
              type="text"
              className="form-control"
              name="description"
              value={course.description}
              onChange={handleInput}
              required
            />
            {errors.description && (
              <div className="error">{errors.description}</div>
            )}
          </div>
          <div className="col-md-5 border-right">
            <label htmlFor="originalPrice">Original Price</label>
            <input
              type="number"
              className="form-control"
              name="originalPrice"
              value={course.originalPrice}
              onChange={handleInput}
              required
            />
            {errors.originalPrice && (
              <div className="error">{errors.originalPrice}</div>
            )}
          </div>
          <div className="col-md-5 border-right">
            <label htmlFor="discountedPrice">Discounted Price</label>
            <input
              type="number"
              className="form-control"
              name="discountedPrice"
              value={course.discountedPrice}
              onChange={handleInput}
              required
            />
            {errors.discountedPrice && (
              <div className="error">{errors.discountedPrice}</div>
            )}
          </div>
          <div className="col-md-5 border-right">
            <label htmlFor="image">Image URL</label>
            <input
              type="file"
              className="form-control"
              name="image"
              onChange={handleImageChange}
              required
            />
            {errors.image && <div className="error">{errors.image}</div>}
          </div>
          <button
            type="button"
            className="btn btn-primary col-md-5 mt-4 "
            onClick={handleSubmit}
          >
            {id ? "Update Course" : "Add Course"}
          </button>
        </div>
      </div>
    </>
  );
};
