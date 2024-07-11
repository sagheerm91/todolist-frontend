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
      const response = await instance.get(`${baseUrl}/todos/get-todos`);
      return response.data.data;
    } catch (error) {
      if (error.response && error.response.status === 409) {
        return { error: "Task already exists" };
      }
      return { error: "Error creating todo" };
    }
  }

  async createTodo({ todo }) {
      const response = await instance.post(
        `${baseUrl}/todos/create-todo`,
        todo
      );

      return response.data;
  }

  async updateTodo({ updateId, todo }) {
    try {
      const res = await instance.put(
        `${baseUrl}/todos/update-todo/${updateId}`,
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
        `${baseUrl}/todos/delete-todo/` + id
      );
      return response;
    } catch (error) {
      throw error;
    }
  };
}
export default new todoService();
