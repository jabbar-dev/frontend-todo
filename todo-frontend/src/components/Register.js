import React, { useState } from 'react'
import {Formik, Form, Field} from 'formik'
import {TextField} from './TextField'
import * as Yup from 'yup'
import axios from 'axios'

export  function Register() {

  const[response, setResponse] = useState({});
  const[loggedIn, setLoggedIn] = useState(false);


  const validate = Yup.object({
    username:Yup.string()
    .max(15, 'Must be 15 characters or less')
    .required('Username is Required'),
    password:Yup.string()
    .min(8, 'Must be 8 characters or more')
    .required('Password is Required')

  })

  const showAck = () => {
    if(response.username!=undefined){
      return <div className='alert alert-success'> {response.username +" Added Successfully"}</div>
    }
   
  }

  return (

    <Formik
    initialValues={ {username: '', password: ''} }
    validationSchema={validate}

    onSubmit={ async (values, { setSubmitting }) => {
      const res = await fetch('localhost:3002/api/users', 
      {method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ "username" : values.username, "password" : values.password }) }
      
      ).then(response => response.json());
      
      console.log(res);
      setResponse(res);
      setLoggedIn(true);
  }}


    //  onSubmit =  {values=>{

    //   //POST API
    //   const article = {"username":values.username, "password":values.password}
    //   const response = axios.post('https://todo-iba.herokuapp.com/api/users',article).then(
    //   console.log(response.data))


    // }}
    >
      {
        formik =>(
          <div >
            
            <h1 className='pl-20 my-4 font-weight-bold-display-4'>Register</h1>
            <center>
            <div className=' pl-20 col-md-2'>
            <Form>
            <TextField label="USERNAME" name="username" type="text"/>
            <br/>
            <TextField label="PASSWORD" name="password" type="text"/>
              <button className='btn btn-success mt-3' type="submit">Register</button>
            </Form>
            </div>
             </center>
            {/* {console.log("Response"+response["username"])} */}

            {showAck()}
              
            {/* <p> Hi {response.username+" Added"} </p> */}
          </div>
        )
      }
      
    </Formik>

  )
}
