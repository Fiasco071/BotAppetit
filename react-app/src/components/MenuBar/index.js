import './index.css'
import { NavLink } from 'react-router-dom';
import LogoutButton from '../auth/LogoutButton';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsis } from "@fortawesome/free-solid-svg-icons";
import { useCallback, useEffect, useRef, useState } from 'react';
import Test from '../test';
import { getAllIngredients } from '../../store/ingredient';
import { useDispatch, useSelector } from 'react-redux';
import HelperBox from '../HelperBox';


const MenuBar = () => {

    const dispatch = useDispatch();
    const ingredients = useSelector(state => Object.values(state.ingredients))
    const [showHelper, setShowhelper] = useState(false)


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

    const escFunction = useCallback((event) => {
        if (event.keyCode === 27) {
            setShowhelper(false)
        }

      }, []);
    
      useEffect(() => {
        document.addEventListener("keydown", escFunction);
    
        return () => {
          document.removeEventListener("keydown", escFunction);
        };
      }, [escFunction]);


    return (
        <>
            <div 
            onClick={() => setShowhelper(true)}
            className='explain-box'>
                <h1>How to use Bot!</h1>
                <div>
                    {!showHelper 
                    ? <><p>Click and Open Menu on the top right.</p>
                    <p>Grab some ingredients and feed Bot.</p>
                    <p>Click his thought bubble and let him find your recipe for you!</p></> 
                    : <p>Press ESC on keyboard or press X to close helper window</p>
                    }
                    
                </div>
                <div className='robot-helper-icon'></div>
                
                {showHelper && (
                <div className='helperbox-holder'>
                    <p 
                    onClick={() => setShowhelper(false)}
                    className='close-button'>X</p>
                 <HelperBox />
                </div>
                )}
            </div>
            <div className='explain-box-back'></div>
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
                    <Test />
                </div>

            </div>
        </>
    );
}

export default MenuBar