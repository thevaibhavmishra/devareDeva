import './App.css';
import {Routes, Route } from "react-router-dom";
import Login from './component/Login'
import Register from './component/Register';
import Dashboard from './component/Dashboard';
import Notfound from './component/Notfound';
import { Toaster } from 'react-hot-toast';

function App() {

  return (
    <div className="App">
      <div>
        <Toaster 
          position='top-right'
          reverseOrder={false}
        />
      </div>
      <Routes>
        <Route index path="/Login" element={
                  <Login />
              }
                />
        <Route path="/register" element={
                  <Register />
              }
                />
        <Route path="/" element={
                  <Dashboard />
              }
                />
        <Route path="*" element={
                  <Notfound />
              }
                />
      </Routes>
    </div>
  );
}

export default App;
