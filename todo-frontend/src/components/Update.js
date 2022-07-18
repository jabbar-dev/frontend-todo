import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { Formik, Form, Field } from "formik";
import { TextField } from "./TextField";
import * as Yup from "yup";
import axios from "axios";
import { Navigate, useNavigate } from "react-router-dom";

export  function Update() {


    const handleLogin = () =>{
    }
    
      const validate = Yup.object({
        username: Yup.string()
          .max(15, "Must be 15 characters or less")
          .required("Username is Required"),
        password: Yup.string()
          .min(8, "Must be 8 characters or more")
          .required("Password is Required"),
      });

   const {id} =  useParams ();
   const navigate = useNavigate();
   const [response, setResponse] = useState({});
   const [registered, setRegistered] = useState(false);
   const [error, setError] = useState(false);
   const [dataUser, setDataUser] = useState();
   const [loading, setLoading] = useState(true);

   const showReg = ()=>{

    navigate("/dashboard");
  }

  const showAck = () => {
    if (response.username != undefined) {
      return (
        <div className="alert alert-success">
          {" "}
          {response.username + " Added Successfully"}
        </div>
      );
    }
    if (error) {
      return <div className="alert alert-danger"> {"Already Exist"}</div>;
    }
  };


    useEffect (() => {


        const token = ((JSON.parse(localStorage.getItem("userInfo"))).accessToken);
            const config = {
                headers: { Authorization : "Bearer " + token },
                method: "GET",
                
                
            }

        fetch(`http://localhost:3002/api/users/${id}`,config).then(response =>{response.json().then(
                
            
            (thedata) =>{
                
                console.log(thedata.user)
                localStorage.setItem('user',thedata.user.username);
                localStorage.setItem('pass',thedata.user.password);
                setDataUser(thedata.user);
                setLoading(false);
              
            
            
            })})

    } , []);


    if(loading){return<><h1>Loading Data</h1></>}
    else{
  return (
    
    <Formik
    enableReinitialize={true}
    initialValues={{ username: localStorage.getItem('user') , password : localStorage.getItem('pass')}}
    validationSchema={validate}
    onSubmit={async (values, { setSubmitting }) => {
      fetch(`http://localhost:3002/api/users/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: values.username,
          password: values.password,
        }),
      })
        .then((res) => {
          console.log(res);
          //console.log(res.json())
          if (res.status == 409) {
            setError(true);
            setRegistered(true);


            
          }
          if (res.status == 200) {
          navigate('/dashboard')
          }
        })
       
    }}

    //  onSubmit =  {values=>{

    //   //POST API
    //   const article = {"username":values.username, "password":values.password}
    //   const response = axios.post('https://todo-iba.herokuapp.com/api/users',article).then(
    //   console.log(response.data))

    // }}
  >
    {(formik) => (
      <div>
          <center>
        <h1 className="pl-20 my-4 font-weight-bold-display-4" >Update {localStorage.getItem("user")}</h1>
        
          <div className=" pl-20 col-md-2">
            <Form>
              <TextField label="USERNAME" name="username" type="text" />
              <br />
              <TextField label="PASSWORD" name="password" type="text" />
              <button className="btn btn-success mt-3" type="submit">
                Update
              </button>
              <button className="btn btn-warning mt-3" type="submit" onClick={showReg}>Dashboard</button>
            </Form>
          </div>
        </center>
        {/* {console.log("Response"+response["username"])} */}

        {showAck()}

        {/* <p> Hi {response.username+" Added"} </p> */}
      </div>
    )}
  </Formik>


  )}
}
