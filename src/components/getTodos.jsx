import React, { useEffect, useState } from "react";
import "../App.css";
import Todo from "./Todo";
import toast from "react-hot-toast";
import todoService from "../services/todoService";
import Navbar from "./Navbar";
import { useAuth } from "../store/tokenStore";
import { useNavigate } from "react-router-dom";
import Pagination from "./pagination";
import todoSchema from "../validations/todo-validations";

const GetTodos = () => {
  const { checkAdmin } = useAuth();
  const { checkLogIn } = useAuth();
  const [todos, setTodos] = useState([]);
  const [todo, setTodo] = useState({ task: "" });
  const [isUpdating, setIsUpdating] = useState(false);
  const [updateId, setUpdateId] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(checkLogIn);
  const [isAdmin, setIsAdmin] = useState(checkAdmin);

  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(3);
  const [totalPages, setTotalPages] = useState(1);

  const [errors, setErrors] = useState([]);

  const navigate = useNavigate();

  //console.log("isloggedin---------",checkLogIn,isLoggedIn);

  //console.log(todos);

  const fetchData = async () => {
    const result = await todoService.getAllTodos(page, limit);
    if (result.error) {
      console.error(result.error);
    } else {
      setTodos(result.data);
      setTotalPages(result.totalPages);
    }
  };

  useEffect(() => {
    fetchData();
  }, [page, limit]);

  const updateTodo = (id, index) => {
    setIsUpdating(true);
    setUpdateId(id);
    let t = todos.find((i) => i._id === id);
    setTodo({ task: t.task });
    //console.log(t.task);
    // setTodos(tasks => {
    //   return tasks.filter(task => task._id !== id);
    // })
  };

  const deleteTodo = (id) => {
    setTodos((oldTodos) => {
      return oldTodos.filter((todo) => todo._id !== id);
    });
  };

  const inputHandler = (e) => {
    const { name, value } = e.target;
    setTodo({ ...todo, [name]: value });
    setErrors({
      ...errors,
      [name]: "", // Clear the error when the user starts typing
    });
  };

  const submitData = async (e) => {
    e.preventDefault();

    try {
      await todoSchema.validate(todo, { abortEarly: false });

      if (isUpdating) {
        const response = await todoService.updateTodo({ updateId, todo });
        //console.log("Update Response:", response);

        toast.success(response.message, { position: "top-right" });
        setTodos(
          todos.map((t) =>
            t._id === updateId ? { ...t, task: response.todo.task } : t
          )
        );
        setTodo({ task: "" });
        setIsUpdating(false);
        setUpdateId(null);
      } else {
        const res = await todoService.createTodo({ todo });
        // console.log("Create Response:", res.todo);
        toast.success(res.message, { position: "top-right" });

        setTodos([...todos, res.todo]);
        setTodo({ task: "" });
      }
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
      {isLoggedIn ? (
        isAdmin ? (
          <>
            <Navbar />
            <div className="userTable">
              <h3>ToDos List</h3>
              <div className="input-div">
                <input
                  onChange={inputHandler}
                  type="text"
                  name="task"
                  value={todo.task}
                  placeholder="Add New To-Do"
                />
                <button
                  onClick={submitData}
                  type="button"
                  class="btn btn-primary"
                >
                  {isUpdating ? "Update" : "Add"}
                </button>
                {errors.task && <div className="error">{errors.task}</div>}
              </div>

              <Todo
                todos={todos}
                deleteSingleTodo={deleteTodo}
                updateSingleTodo={updateTodo}
                updateId={updateId}
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
            <div className="userTable">
              <h3>ToDos List</h3>
              <Todo
                todos={todos}
                deleteSingleTodo={deleteTodo}
                updateSingleTodo={updateTodo}
                updateId={updateId}
              />
              <Pagination
                page={page}
                limit={limit}
                totalPages={totalPages}
                onPageChange={setPage}
                onLimitChange={setLimit}
              />
            </div>
          </>
        )
      ) : (
        navigate("/")
      )}
    </>
  );
};

export default GetTodos;
