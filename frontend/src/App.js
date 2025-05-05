import React from "react";

import Login from "./pages/Login";
import Signup from "./pages/Signup";
//import Home from "./pages/HomePage";
import WelcomePage from "./pages/WelcomePage";
import InventoryManage from "./pages/InventoryManage";
import { Routes,Route } from "react-router-dom";


function App() {
    return (
      <Routes>
      <Route path="/" element={<WelcomePage/>} />
      <Route path="/login" element={<Login/>} />
      <Route path="/signup" element={<Signup/>} />
      <Route path="/home" element={<InventoryManage/>} />
      </Routes>
      
    );
}

export default App;
