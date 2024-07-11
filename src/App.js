import { createBrowserRouter } from 'react-router-dom';
import './App.css';
import GetTodos from './components/getTodos.jsx';
import { Register } from './components/Register.jsx';
import { Login } from './components/Login.jsx';

function App() {
  
  return (
    <div className="App">
      <Register />
    </div>
  );
}

export default App;
