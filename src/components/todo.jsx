import React from 'react'
import "../App.css"
import toast from 'react-hot-toast';
import todoService from '../services/todoService';

const todo = ({todos,deleteSingleTodo, updateSingleTodo,updateId}) => {

    const deleteTodo =async(id)=>{
        try {
            const response = await todoService.deleteTodo({id});
            if(response){
              toast.success(response.data.message, {position:"top-right"});
                deleteSingleTodo(id);
            }
          } catch (error) {
            console.log("Error while deleting the record", error);
          }
    };
    const updateTodo = async (id,index) => {
      try {
            updateSingleTodo(id,index);
      } catch (error) {
        console.log("Error while updating record", error);
      }
      
    }
  return (
    <div>
      <table className="table table-bordered">
        <thead>
          <tr>
            <th scope="col">Task No.</th>
            <th scope="col">Task Description</th>
            <th scope="col">Actions</th>
          </tr>
        </thead>
        <tbody>
          {todos?.map((todo, index) => {

            return (
              <tr key={todo._id}>
                <td>{index + 1}</td>
                <td>{todo.task}</td>
                <td className="actionButtons">
                 {todo._id === updateId ?
                 <><div className='text'>Updating</div></>
                 :
                 <>
                  <button
                    onClick={() => updateTodo(todo._id,index)}
                    type="button"
                    className="btn btn-info"
                  >
                    <i class="fa-solid fa-pen-to-square"></i>
                  </button>
                  <button
                     onClick={() => deleteTodo(todo._id)}
                    type="button"
                    className="btn btn-danger"
                  >
                    <i class="fa-solid fa-trash"></i>
                  </button>
                  </>
                  }
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  )
}

export default todo
