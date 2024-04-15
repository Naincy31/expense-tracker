import useLogout from '../hooks/useLogout';
import { useAuthContext } from '../hooks/useAuthContext';
//styles
import './Navbar.css';
import { Link } from 'react-router-dom';

const Navbar = () => {
    const { logout } = useLogout();
    const { user } = useAuthContext();

  return (
    <nav className='navbar'>
        <ul>
            <li className='title'><Link to ='/'>Expense Tracker</Link></li>

            {user &&
            ( 
              <>
                <li className='name'>Hi, {user.displayName.split(' ')[0]}</li>
                <li><button className='btn' onClick={ logout }>Logout</button></li>
              </>
            )
            }
            
            
        </ul>
    </nav>
  )
}

export default Navbar