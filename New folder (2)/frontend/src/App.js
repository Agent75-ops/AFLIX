import React from 'react'
import {Routes, Route} from 'react-router-dom'
import './App.css';
import LoginPage from "./pages/login";
import Home from './pages/Home';
import Register from "./pages/Register";
import MoviesPage from './pages/moviesPage';
function App() {
  return (
    <div className="App">
      <Routes>
        <Route path='/' element={<Home />}></Route>
        <Route path='register' element={<Register />}></Route>
        <Route path="login" element={<LoginPage />}></Route>
        <Route path="movies" element={<MoviesPage />}></Route>
      </Routes>
    </div>
  );
}

export default App;
