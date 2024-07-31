import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import GetTodos from "./components/getTodos.jsx";
import { Register } from "./pages/Register.jsx";
import { Login } from "./pages/Login.jsx";
import { Logout } from "./pages/Logout.jsx";
import {AccountSetting} from "./pages/account-setting.jsx";
import Courses from "./components/courses.jsx";
import {AddCourse} from "./components/addCourse.jsx";
import { Details } from "./pages/details.jsx";
import Cart from "./components/cart.jsx";
import Success from "./pages/success.jsx";
import Declined from "./pages/declined.jsx";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />

          <Route path="/get-todos" element={<GetTodos />} />

          <Route path="/get-courses" element={<Courses/>} />

          <Route path="/account-setting" element={<AccountSetting />} />

          <Route path="/add-course" element={<AddCourse />} />
          <Route path="/update-course/:id" element={<AddCourse />} />

          <Route path="/details" element={<Details/>} />

          <Route path="/cart" element={<Cart />} />
          <Route path="/success" element={<Success/>} />
          <Route path="/declined" element={<Declined />} />


          <Route path="/logout" element={<Logout />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
