import { useEffect, useState } from "react";
import { useLogin } from "../../hooks/useLogin";
import { useNavigate } from 'react-router-dom'

//styles
import styles from './Login.module.css';

const ForgotPassword = () => {
    const [email, setEmail] = useState('');
    const {error, resetPassword, isPending, resetPwd} = useLogin();
    const [message, setMessage] = useState('')
    const navigate = useNavigate()
    
    const handleSubmit = (e) => {
        e.preventDefault();
        resetPassword(email)
    }

    useEffect(() => {
        if (resetPwd) {
            setMessage('Please check your inbox for further instructions');
            setTimeout(() => {
                navigate('/login')
            }, 2000)
        }
    }, [resetPwd, navigate]);



  return (
    <form onSubmit= {handleSubmit} className={styles['login-form']}>
        {message && <p className="success">{message}</p>}
        <h2>Password Reset</h2>
        <label>
            <span>Email:</span>
            <input 
                type='email' 
                onChange={(e) => setEmail(e.target.value)}
                value={email}
            />
        </label>
        <button className='btn' disabled={isPending}>Send Reset Email</button>
        {error && <p className='error'>{error}</p>}
    </form>
  )
}

export default ForgotPassword