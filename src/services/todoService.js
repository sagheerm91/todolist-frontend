import axios from "axios";
import instance from "./todoInterceptor";

const baseUrl = process.env.REACT_APP_BASE_URL;
//console.log("BASE URL ---", baseUrl);

/*
const instance = axios.create({
  baseUrl : baseUrl,
  headers:{
    author : 'Sagheer'
  }
}); */

class todoService {
  async getAllTodos() {
    try {
      const response = await instance.get(`${baseUrl}/get-todos`);
      return response.data.data;
    } catch (error) {
      console.log("Error while fetching the record", error);
    }
  }

  async createTodo({ todo }) {
      const response = await instance.post(
        `${baseUrl}/create-todo`,
        todo
      );

      return response.data;
  }

  async updateTodo({ updateId, todo }) {
    try {
      const res = await instance.put(
        `${baseUrl}/update-todo/${updateId}`,
        todo
      );

      if (res) {
        //console.log("Response:", res);
        return res.data;
      }
    } catch (error) {
      throw error;
    }
  }

  async deleteTodo({ id }) {
    try {
      const response = await instance.delete(
        `${baseUrl}/delete-todo/` + id
      );
      return response;
    } catch (error) {
      throw error;
    }
  };
}
export default new todoService();
