import React from 'react';
import axios from "axios";
import toast from 'react-hot-toast';


const updateTodo = async ({updateTodoId}) => {
    try {
        const response = await axios.put(
          "http://localhost:8000/todos/update-single-todo/" + updateTodo);
          if(response){
            //updateSingleTodo(id);
            toast.success(response.data, {position:"top-right"});
          }
      } catch (error) {
        console.log("Error while updating record", error);
      }

      return(
        <div className="userTable">
    <h3>ToDos List</h3>
      <div className="input-div">
      <input  type="text" name="task" placeholder="Add New To-Do" />
        <button type="button" className="btn btn-primary">
        Add 
      </button>
      </div>
      </div>
      );
}
export default updateTodo;