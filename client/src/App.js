import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Register from './components/Register/Register';
import Login from "./components/Login/Login";
import MovieDetails from "./components/MovieDetails/MovieDetails";
import Movie from "./components/Movie/Movie";
import PrivateRoute from "./PrivateRoute";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/movie" element={<PrivateRoute><Movie /></PrivateRoute>} />
          <Route path="/moviedetails/:id" element={<PrivateRoute><MovieDetails /></PrivateRoute>} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
