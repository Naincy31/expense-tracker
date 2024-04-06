import { NavLink } from 'react-router-dom';
import useLogout from '../hooks/useLogout';
import { useAuthContext } from '../hooks/useAuthContext';
//styles
import './Navbar.css';

const Navbar = () => {
    const { logout } = useLogout();
    const { user } = useAuthContext();

  return (
    <nav className='navbar'>
        <ul>
            <li className='title'>Expense Tracker</li>

            {!user ? (
              <>
                <li><NavLink to='/login'>LOGIN</NavLink></li>
                <li><NavLink to='/signup'>SIGN UP</NavLink></li>
              </>
            ) : 
            ( 
              <>
                <li className='name'>Hello, {user.displayName}</li>
                <li><button className='btn' onClick={ logout }>Logout</button></li>
              </>
            )
            }
            
            
        </ul>
    </nav>
  )
}

export default Navbar