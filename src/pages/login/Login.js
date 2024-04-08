import { useState } from 'react';
import { useLogin } from '../../hooks/useLogin';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';

//styles
import styles from './Login.module.css';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const {login, error, isPending} = useLogin();
    const [isActive, setIsActive] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        login(email, password)

    }

    const toggleActive = () => {
        setIsActive(!isActive); 
    };

  return (
    <form onSubmit= {handleSubmit} className={styles['login-form']}>
        <h2>LOGIN</h2>
        <label>
            <span>Email:</span>
            <input 
                type='email' 
                onChange={(e) => setEmail(e.target.value)}
                value={email}
            />
        </label>
        <label>
            <span>Password:</span>
            <input
                type={isActive ? 'text': 'password'}
                onChange={(e) => setPassword(e.target.value)}
                value={password}
            />
            <button 
                type='button' 
                className={isActive ? styles.active: ''}
                onClick={toggleActive}
            >
                <span className={styles['fa-eye']}>
                    <FontAwesomeIcon icon={faEye} />
                </span>
                <span className={styles['fa-eye-slash']}>
                    <FontAwesomeIcon icon={faEyeSlash} />
                </span>
            </button>
        </label>
        {isPending ? <button className='btn' disabled>loading</button> : <button className='btn'>Login</button>}
        {error && <p className='error'>Please provide the correct email and password</p>}

    </form>
  )
}

export default Login