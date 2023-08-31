import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import './Login.css'
import { Toaster } from 'react-hot-toast'
import { useFormik } from 'formik'
import { emailValidate } from '../../helpers/validate'
import { useAuthStore } from '../../store/store'
import EmailIcon from '@mui/icons-material/Email';

function Login() {
    const [isLoadingAnimation, setIsLoadingAnimation] = useState(false);
    const navigate = useNavigate()
    const setEmail = useAuthStore(state => state.setEmail)

    const formik = useFormik({
        initialValues: {
            email: ''
        },
        validate: emailValidate,
        validateOnBlur: false,
        validateOnChange: false,
        onSubmit: async values => {
            try {
                setIsLoadingAnimation(true)
                setEmail(values.email)
                navigate('/password')
            } catch (error) {
                
            }finally{
                setIsLoadingAnimation(false)
            }

        }
    })

  return (
    <div className='loginContainer'>
        <Toaster position='top-center' reverseOrder={false}></Toaster>
        <section>
            <div className='form'>
                <form onSubmit={formik.handleSubmit}>
                    <h2>Sign in</h2>
                    <div className="inputBox">
                        <span className='icon'><EmailIcon /></span>
                        <input {...formik.getFieldProps('email')} type='email' className='username' />
                        <label>Email</label>
                    </div>
                    <button type='submit'>{isLoadingAnimation ? 'Please Wait' : 'Continue'}</button>
                </form>
                <div class="signUpLink">
                    <p>Don't have an account <span><Link to='/signup' className='link'>Register</Link></span></p>
                </div>
                
            </div>
        </section>

    </div>
  )
}

export default Login