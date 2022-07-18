import React, { useState } from "react";
import { Formik, Form, Field } from "formik";
import { TextField } from "./TextField";
import * as Yup from "yup";
import axios from "axios";
import { Navigate, useNavigate } from "react-router-dom";


export function LogIn() {
    const navigate = useNavigate();
  const [response, setResponse] = useState({});
  const [registered, setRegistered] = useState(false);
  const [error, setError] = useState(false);
  const [logInClicked, setLogInClicked] = useState(false);


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

  const showReg = ()=>{

    navigate("/register");
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

 
  return (
    
    <Formik
      initialValues={{ username: "", password: "" }}
      validationSchema={validate}
      onSubmit={async (values, { setSubmitting }) => {
        fetch("http://localhost:3002/login", {
          method: "POST",
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
              res
                .json()
                .then((resJ) => {
                  setResponse(resJ);
                  setRegistered(true);
                  setError(false);
                  localStorage.setItem("userInfo", JSON.stringify(resJ));
                navigate("/dashboard");
                })
                .catch((err) => {
                  console.log(err);
                });
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
          <h1 className="pl-20 my-4 font-weight-bold-display-4" >LOGIN</h1>
          
            <div className=" pl-20 col-md-2">
              <Form>
                <TextField label="USERNAME" name="username" type="text" />
                <br />
                <TextField label="PASSWORD" name="password" type="text" />
                <button className="btn btn-warning mt-3" type="submit">
                  LogIn
                </button>
                <button className="btn btn-success mt-3" type="submit" onClick={showReg}>Register</button>
              </Form>
            </div>
          </center>
          {/* {console.log("Response"+response["username"])} */}

          {showAck()}

          {/* <p> Hi {response.username+" Added"} </p> */}
        </div>
      )}
    </Formik>
  );
}
