import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import './Signup.css'
import Avatar from '@mui/material/Avatar'
import convertToBase64 from '../../helpers/convert'
import { toast, Toaster } from 'react-hot-toast'
import { useFormik } from 'formik'
import { registrationValidation } from '../../helpers/validate'
import { registerUser } from '../../helpers/helper'
import EmailIcon from '@mui/icons-material/Email';
import LockIcon from '@mui/icons-material/Lock';
import PersonIcon from '@mui/icons-material/Person';

function Signup() {
  const navigate = useNavigate();

  const [file, setFile] = useState();

  const formik = useFormik({
    initialValues:{
      username: '',
      email: '',
      password: ''
    },
    validate: registrationValidation,
    validateOnBlur: false,
    validateOnChange: false,
    onSubmit: async values => {
      values = await Object.assign(values, { profile: file || ''})
      let registerPromise =  registerUser(values)
      toast.promise(registerPromise, {
        loading: 'Creating...',
        success: <b>Register Successfully</b>,
        error: <b>Could not register.</b>
      });

      registerPromise.then(function(){navigate('/login')})
    }
  })

  const unUpload = async e => {
    const base64 = await convertToBase64(e.target.files[0]);
    setFile(base64);
  }

  return (
    <div className='signupContainer'>
      <Toaster position='top-center' reverseOrder={false}></Toaster>
          <section>
            <div className="form">
              <h2>Get Started</h2>
              <form onSubmit={formik.handleSubmit}>

                  <div className="inputBox">
                    <span className='icon'><PersonIcon /></span>
                    <input {...formik.getFieldProps('username')} type='text'/>
                    <label>UserName</label>
                  </div>

                  <div className="inputBox">
                    <span className='icon'><EmailIcon /></span>
                    <input {...formik.getFieldProps('email')} type='email'/>
                    <label>Email</label>
                  </div>

                  <div className="inputBox">
                    <span className='icon'><LockIcon /></span>
                    <input {...formik.getFieldProps('password')} type='password'/>
                    <label>Password</label>
                  </div>

                  <button type='submit'>Signup</button>
              </form>
              <div className="links">
                <p>Already a member? <Link to='/login' className='link'>Login Here</Link></p>
              </div>
            </div>
          </section>
    </div>
  )
}

export default Signup