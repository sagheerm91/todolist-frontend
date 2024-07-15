import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import GetTodos from "./components/getTodos.jsx";
import { Register } from "./pages/Register.jsx";
import { Login } from "./pages/Login.jsx";
import { Logout } from "./pages/Logout.jsx";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />

          <Route path="/get-todos" element={<GetTodos />} />

          <Route path="/logout" element={<Logout />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
