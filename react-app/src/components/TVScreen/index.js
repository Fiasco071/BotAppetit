import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../store/session';
import './index.css'



const TVScreen = () => {
    const dispatch = useDispatch();
    const user = useSelector(state => state.session.user)

    
    const onLogout = async (e) => {
        await dispatch(logout());
    };

    return (
        <div className='tv-screen-wrapper'>
            <div className='tv-outline'></div>
            <div className='tv-screen'>
                <div className='tv-screen-shadow'></div>
            </div>
            <div className='tv-mount-stick'><div className='tv-mount-stick-shadow'></div></div>
            <div 
            onClick={() => onLogout()}
            className={`tv-button power ${user ? 'poweroff' : null}`}></div>
            <div className='tv-button up'></div>
            <div className='tv-button down'></div>
        </div>

    );
}


export default TVScreen