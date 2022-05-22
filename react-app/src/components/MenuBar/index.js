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
import HelperBox from '../HelperBox';


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
    const ref2 = useRef(null)

    const handleClick = (e) => {
        e.stopPropagation()
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

    const switchChannel = (e) => {
        e.stopPropagation()
        ref2.current.classList.add('switchChannel')
        setTimeout(() => {
            ref2.current.classList.remove('switchChannel')
        }, 500)
    }

    const prop = { showMenu, setShowMenu };
    return (
        <> {!showMenu && (
            <div>
                <div className='helper-box-wrappers'>
                    <HelperBox />
                </div>
            </div>
        )}
            <div
                onClick={e => handleClick(e)}
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
                    <Test clicked={prop} />
                    <div className='dnd-back'></div>
                </div>

            </div>
        </>
    );
}

export default MenuBar