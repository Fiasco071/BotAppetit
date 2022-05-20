import './index.css'
import { useHistory } from 'react-router-dom';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsis } from "@fortawesome/free-solid-svg-icons";
import { useCallback, useEffect, useRef, useState } from 'react';
import Test from '../test';
import { getAllIngredients } from '../../store/ingredient';
import { useDispatch, useSelector } from 'react-redux';
// import HelperBox from '../HelperBox';
import { logout } from '../../store/session';
import HelperBoxModal from '../HelperBox/HelperBoxModal';


const MenuBar = () => {
    const history = useHistory();
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

    const onLogout = async (e) => {
        await dispatch(logout());
    };

    return (
        <>
            <div
                className='explain-box'>
                <h1>Helpful Info</h1>
                <div className='explain-box-content'>
                    <div className='info-pill-box'>
                        <p className='label-tag'>Click</p>
                        <p className='label-tag-text'>Menu</p>
                    </div>
                    <div className='info-pill-box'>
                        <p className='label-tag'>Drag</p>
                        <p className='label-tag-text'>Ingredients</p>
                    </div>
                    <div className='info-pill-box'>
                        <p className='label-tag'>Click</p>
                        <p className='label-tag-text'>Bubble</p>
                    </div>
                    <HelperBoxModal />
                </div>
                <div className='robot-helper-icon'></div>

                {showHelper && (
                    <div className='helperbox-holder'>

                        {/* <HelperBox /> */}
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
                    <div>Ingredients</div>
                    <div
                        onClick={() => history.push('/home')}
                        className='home-button'></div>
                    <div
                        onClick={onLogout}
                        className='logout-button'>
                    </div>
                </div>
                <div className='menubar-contentbox'>
                    <Test />
                    <div className='dnd-back'></div>
                </div>

            </div>
        </>
    );
}

export default MenuBar