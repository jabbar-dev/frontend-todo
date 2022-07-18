import logo from './logo.svg';
import './App.css';
import {Formik, Form, Field} from 'formik';
import {Register} from './components/Register'
import React , { Component, useEffect, useState}  from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {LogIn} from './components/LogIn'
import { BrowserRouter, Link, Route, Routes, useNavigate } from 'react-router-dom';
import { Button } from 'bootstrap';
import {Dashboard} from './components/Dashboard'
import { Update } from './components/Update';



function App() {


  const [showLogout , setShowLogout] = useState(false);
    

    useEffect(() => {
      console.log(localStorage.getItem("userInfo"));
      if(localStorage.getItem("userInfo") === null){
         setShowLogout(false);
      }
      else{
          setShowLogout(true);
      }

   }, []);
  
  return (
    <BrowserRouter>
    
    <div>
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
  <div className="collapse navbar-collapse" id="navbarNav">
    <ul className="navbar-nav">
      <li className="nav-item active">
        <Link className='nav-link' to ="/register">Register</Link>
      </li>
      <li className="nav-item active">
        <Link className='nav-link'  to ="/logIn">LogIn</Link>
      </li>
      <li>
        <Link className='nav-link'  to ="/dashboard">Dashboard</Link>
      </li>
      <li>
        <Link className='nav-link'  to ="/update">Update</Link>
      </li>
    </ul>
  </div>
</nav>



<main>
  <Routes>
    
    <Route path="/register" element={<Register/>}></Route>
    <Route path="/login" element={<LogIn/>}></Route>
    <Route path="/dashboard" element={<Dashboard/>}></Route>
    <Route path="/update/:id" element={<Update/>}></Route>

  </Routes>
</main>





    </div>
    
    </BrowserRouter>
    )}

export default App;
