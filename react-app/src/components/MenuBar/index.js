import './index.css'
import { NavLink } from 'react-router-dom';
import LogoutButton from '../auth/LogoutButton';

const MenuBar = () => {
    return (
        <div className='menubar-wrapper'>
            <div className='menubar-list'>
                <ul>
                    <li>Menu</li>
                    <li>Ingredients</li>
                    <li>
                        <NavLink to='/' exact={true} activeClassName='active'>
                            Home
                        </NavLink>
                    </li>
                    <li>
                        <LogoutButton />
                    </li>
                </ul>
            </div>
            <div className='menubar-contentbox'>

            </div>

        </div>
    );
}

export default MenuBar