import { useState } from 'react';
import useSignup from '../../hooks/useSignup';

//styles
import styles from './Signup.module.css';

const Signup = () => {
    const [displayName, setDisplayName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { signup, error, isPending} = useSignup()

    const handleSubmit = (e) => {
        e.preventDefault();
        signup(email, password, displayName);
    }

  return (
    <form onSubmit = {handleSubmit} className={styles['signup-form']}>
        <h2>Signup</h2>
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
                type='password'
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                required
            />
        </label>
        {isPending ? <button className='btn' disabled>loading</button> : <button className='btn'>Signup</button>}
        {error && <p>{error}</p>}
        
    </form>
  )
}

export default Signup