import React, { useState } from "react";
import { Formik, Form, Field } from "formik";
import { TextField } from "./TextField";
import * as Yup from "yup";
import axios from "axios";
import { Navigate, useNavigate } from "react-router-dom";
import {LogIn} from "./LogIn";

export function Register() {
  const navigate = useNavigate();
  const [response, setResponse] = useState({});
  const [registered, setRegistered] = useState(false);
  const [error, setError] = useState(false);
  const [logInClicked, setLogInClicked] = useState(false);


const handleLogin = () =>{
setLogInClicked(true);
  
}

  const validate = Yup.object({
    username: Yup.string()
      .max(15, "Must be 15 characters or less")
      .required("Username is Required"),
    password: Yup.string()
      .min(8, "Must be 8 characters or more")
      .required("Password is Required"),
  });

  const logIn = () =>{
    navigate("/login");


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
  }


  return (
    
    <Formik
      initialValues={{ username: "", password: "" }}
      validationSchema={validate}
      onSubmit={async (values, { setSubmitting }) => {
        fetch("http://localhost:3002/api/users", {
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
                  console.log("CC" + JSON.stringify(resJ));
                })
                .catch((err) => {
                  console.log(err);
                });
            }
          })
         
      }}

    >
      {(formik) => (
       <center>
       <div>
          <h1 className="pl-20 my-4 font-weight-bold-display-4">Register</h1>
            <div className=" pl-20 col-md-2">
              <Form>
                <TextField label="USERNAME" name="username" type="text" />
                <br />
                <TextField label="PASSWORD" name="password" type="text" />
                <button className="btn btn-success mt-3" type="submit">
                  Register
                </button>
                <button className="btn btn-warning mt-3" type="submit" onClick={logIn}>LogIn</button>
              </Form>
            </div>
          {/* {console.log("Response"+response["username"])} */}

          {showAck()}

          {/* <p> Hi {response.username+" Added"} </p> */}
        </div>
        </center>
      )}
    </Formik>
  );
      }
      
