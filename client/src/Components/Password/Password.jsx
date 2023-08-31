import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import './Password.css'
import Avatar from '@mui/material/Avatar'
import { useFormik } from 'formik'
import toast, { Toaster } from 'react-hot-toast'
import { passwordValidate } from '../../helpers/validate'
import { useFetch } from '../../hooks/fetch.hook'
import { useAuthStore } from '../../store/store'
import { verifyPassword } from '../../helpers/helper'
import LoadingAnimationPage from '../LoadingAnimationPage/LoadingAnimationPage'
import LockIcon from '@mui/icons-material/Lock';

function Password() {

    const navigate = useNavigate();

    const { email } = useAuthStore(state => state.auth)
    const { apiData, isLoading, serverError } = useFetch(`user/${email}`)


    const formik = useFormik({
        initialValues: {
            password: ''
        },
        validate: passwordValidate,
        validateOnBlur: false,
        validateOnChange: false,
        onSubmit: async values => {
            
            let loginPromise = verifyPassword({ email, password : values.password })
            toast.promise(loginPromise, {
                loading: 'Checking.. Please wait.',
                success: <b>Login Successfull.</b>,
                error: <b>Password Not Match</b>
            });

            loginPromise.then(res => {
                let { token } = res.data;
                localStorage.setItem('token', token)
                navigate('/dashboard')
            })
        }
    })

    if(isLoading) return <LoadingAnimationPage />
    if(serverError) return <h1>{serverError.message}</h1>
    if(apiData){
        console.log("yes apiData")
    }else{
        console.log('no api data')
    }
  return (
    <div className='passwordContainer'>
        <Toaster position='top-center' reverseOrder={false}></Toaster>
        <section>
            <div className="form">
                <form onSubmit={formik.handleSubmit}>
                <h2><span>Welcome</span> <br />{apiData?.email || apiData?.firstName}</h2>
                    {/*<div className='password_img'>
                        {apiData.profile ? <img src={apiData.profile} alt='Profile' className='profilePic'/> :  <Avatar className='avatar'/>}
                    </div>*/}

                    <div className='inputBox'>
                        <span className='icon'><LockIcon /></span>
                        <input {...formik.getFieldProps('password')} type='password'/>
                        <label>Password</label>
                    </div>

                    <button type='submit'>Login</button>
                </form>
                <div class="signUpLink">
                    <p>Forgot Password? <span><Link to='/getOTP' className='link'>Recover Here</Link></span></p>
                </div>
            </div>
        </section>

    </div>
  )
}

export default Password