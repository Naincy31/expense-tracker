import { Link } from 'react-router-dom/cjs/react-router-dom.min';
import useLogout from '../hooks/useLogout';
import { useAuthContext } from '../hooks/useAuthContext';
//styles
import styles from './Navbar.module.css';

const Navbar = () => {
    const { logout } = useLogout();
    const { user } = useAuthContext();

  return (
    <nav className={styles.navbar}>
        <ul>
            <li className={styles.title}>Expense Tracker</li>

            {!user ? (
              <>
                <li><Link to='/login'>Login</Link></li>
                <li><Link to='/signup'>Signup</Link></li>
              </>
            ) : 
            ( 
              <>
                <li className={styles.name}>Hello, {user.displayName}</li>
                <li><button className='btn' onClick={ logout }>Logout</button></li>
              </>
            )
            }
            
            
        </ul>
    </nav>
  )
}

export default Navbar