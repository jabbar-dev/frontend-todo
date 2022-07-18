import React from 'react'
import {ErrorMessage, useField } from 'formik'

export  function TextField({ label, ...props }) {
    const [field, meta] = useField(props)
  return (
<div>
    <label htmlFor={field.name}/>{label}
    <div><input className='form-control shadow-none' {...field} {...props} autoComplete='off'/>
    <ErrorMessage name={field.name} component='div' className='text-danger'/>
</div>
</div>
  )
}
