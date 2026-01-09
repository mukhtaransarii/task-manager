import { useState } from 'react'
import { Routes, Route } from "react-router-dom";
import Home from '../pages/Home.jsx';
//import Login from '../pages/Login.jsx';

export default function ReactRouter() {
  //if (!user) return <Login/>

  return (
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
  );
}
