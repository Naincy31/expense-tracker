import { useState } from 'react';
import { useLogin } from '../../hooks/useLogin';

//styles
import styles from './Login.module.css';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const {login, error, isPending} = useLogin();

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(email, password);
        login(email, password)

    }

  return (
    <form onSubmit= {handleSubmit} className={styles['login-form']}>
        <h2>login</h2>
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
                type='password'
                onChange={(e) => setPassword(e.target.value)}
                value={password}
            />
        </label>
        {isPending ? <button className='btn' disabled>loading</button> : <button className='btn'>Login</button>}
        {error && <p>{error}</p>}

    </form>
  )
}

export default Login