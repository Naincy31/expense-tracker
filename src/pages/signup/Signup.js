import { useState } from 'react';
import useSignup from '../../hooks/useSignup';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { GoogleButton } from 'react-google-button'
import { Link } from 'react-router-dom';


//styles
import styles from './Signup.module.css';

const Signup = () => {
    const [displayName, setDisplayName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { signup, error, isPending, googleSignIn} = useSignup();
    const [passwordError, setPasswordError] = useState(null)
    const [isActive, setIsActive] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        const passwordRegex = /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*\W)(?!.* ).{8,16}$/
        if (passwordRegex.test(password)){
            signup(email, password, displayName);
        } else {
            setPasswordError("Password must be 8-16 characters with at least one digit, lowercase letter, uppercase letter, and special character.")
        }
    }

    const handleGoogleSignIn = () => {
        googleSignIn()
    }

    const toggleActive = () => {
        setIsActive(!isActive); 
    };

  return (
    <form onSubmit = {handleSubmit} className={styles['signup-form']}>
        <h2>SIGN UP</h2>
        <label>
            <span>Your Name:</span>
            <input
                type='text'
                onChange={(e) => setDisplayName(e.target.value)}
                value={displayName}
                required
            />
        </label>
        <label>
            <span>Email:</span>
            <input
                type='email'
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                required
            />
        </label>
        <label>
            <span>Password:</span>
            <input
                type={isActive ? 'text': 'password'}
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                required
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
        {isPending ? <button className='btn' disabled>loading</button> : <button className='btn'>Signup</button>}
        <p>Already have an account? <Link to='/login'>Login</Link></p>
        
        <p>Or</p>
        <div className={styles['google-button']}>
            <GoogleButton onClick = {handleGoogleSignIn}  style={{ width: '100%' }}/>
        </div>

        {error && <p className='error'>{error}</p>}
        {passwordError && <p className='error'>{passwordError}</p>}
    </form>
  )
}

export default Signup