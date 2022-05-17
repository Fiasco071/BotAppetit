import './index.css'
import { NavLink } from 'react-router-dom';
import LogoutButton from '../auth/LogoutButton';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsis } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useRef, useState } from 'react';
import Test from '../test';
import { getAllIngredients } from '../../store/ingredient';
import { useDispatch, useSelector } from 'react-redux';


const MenuBar = () => {

    const dispatch = useDispatch();
    const ingredients = useSelector(state => Object.values(state.ingredients))


  useEffect(() => {
    dispatch(getAllIngredients())
  }, [dispatch])

    const [showMenu, setShowMenu] = useState(false)
    const ref = useRef(null)

    const handleClick = () => {
        if (!showMenu) {
            ref.current.classList.add('show-menu')
            setShowMenu(true)
        } else {
            ref.current.classList.remove('show-menu')
            setShowMenu(false)
        }
    }

    return (
        <>
        <div 
        onClick={handleClick}
        className='menu-collapse-button'>
            <div>
                <FontAwesomeIcon icon={faEllipsis} />
            </div>
        </div>
        <div ref={ref} className='menubar-wrapper'>
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
                <Test ingredients={ingredients}/>
            </div>

        </div>
        </>
    );
}

export default MenuBar