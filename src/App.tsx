import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import AuthGuard from "./Util/AuthGuard";
import Home from "./Pages/Home/Home";
import Login from "./Pages/Login/Login";
import "./App.css";


function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route element={<AuthGuard />}>
            <Route  path="/" element={<Home />} />
            <Route  path="/home" element={<Home />} />
          </Route>
          <Route path="/login" element={<Login />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
