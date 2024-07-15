import React, { useEffect, useState } from "react";
import "../App.css";
import Todo from "./Todo";
import toast from "react-hot-toast";
import todoService from "../services/todoService";
import Navbar from "./Navbar";
import { useAuth } from "../store/tokenStore";
import { useNavigate } from "react-router-dom";


const GetTodos = () => {
  const { checkAdmin } = useAuth();
  const { checkLogIn } = useAuth();
  const [todos, setTodos] = useState([]);
  const [todo, setTodo] = useState({ task: "" });
  const [isUpdating, setIsUpdating] = useState(false);
  const [updateId, setUpdateId] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(checkLogIn);
  const [isAdmin, setIsAdmin] = useState(checkAdmin);

  const navigate = useNavigate();

  //console.log("isloggedin---------",checkLogIn,isLoggedIn);

  //console.log(todos);

  const fetchData = async () => {
    const res = await todoService.getAllTodos();
    setTodos(res.data);
  };


  useEffect(() => {
    fetchData();
  }, []);

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
  };

  const submitData = async (e) => {
    e.preventDefault();

    if (isUpdating) {
      try {
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
      } catch (error) {
        toast.error(error.response?.data?.message || error.message, {
          position: "top-right",
        });
      }
    } else {
      try {
        const res = await todoService.createTodo({ todo });
        // console.log("Create Response:", res.todo);
        toast.success(res.message, { position: "top-right" });

        setTodos([...todos, res.todo]);
        setTodo({ task: "" });
      } catch (error) {
        toast.error(error.response?.data?.message || error.message, {
          position: "top-right",
        });
      }
    }
  };

  return (
  <>
    {
      isLoggedIn ? (
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
          <button onClick={submitData} type="button" class="btn btn-primary">
            {isUpdating ? "Update" : "Add"}
          </button>
        </div>

        <Todo
          todos={todos}
          deleteSingleTodo={deleteTodo}
          updateSingleTodo={updateTodo}
          updateId={updateId}
        />
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
      </div>
      </> 
        )
      
      )
      : navigate("/")
    } 
    </>
  );
};

export default GetTodos;
