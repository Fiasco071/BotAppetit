import { useRef, useState } from 'react'
import './index.css'
import video1 from '../../assets/img/instructions/login-video.mp4'
import video2 from '../../assets/img/instructions/recipelist-video.mp4'
import video3 from '../../assets/img/instructions/fun-search-video.mp4'
import video4 from '../../assets/img/instructions/recipe-create-video.mp4'
import video5 from '../../assets/img/instructions/comment-video.mp4'
import { useHistory } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { logout } from '../../store/session'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretLeft, faCaretRight } from "@fortawesome/free-solid-svg-icons";


const HelperBox = () => {
    const list = [
        { 'name': 'Log In', 'video': video1 },
        { 'name': 'Search', 'video': video2 },
        { 'name': 'Fun Search!', 'video': video3 },
        { 'name': 'Recipes', 'video': video4 },
        { 'name': 'Comments', 'video': video5 }]

    const [showDiv, setShowDiv] = useState(1)
    const history = useHistory();
    const ref2 = useRef(null);
    const dispatch = useDispatch();
    // const switchChannel = (e) => {
    //     e.stopPropagation()
    //     ref2.current.classList.add('switchChannel')
    //     setTimeout(() => {
    //         ref2.current.classList.remove('switchChannel')
    //     }, 500)
    // }

    const handleRClick = (e) => {
        e.stopPropagation()
        setShowDiv(showDiv + 1 <= 6 ? showDiv + 1 : 1)
        ref2.current.classList.add('switchChannel')
        setTimeout(() => {
            ref2.current.classList.remove('switchChannel')
        }, 500)
    }
    const handleLClick = (e) => {
        e.stopPropagation()
        setShowDiv(showDiv - 1 >= 1 ? showDiv - 1 : 6)
        ref2.current.classList.add('switchChannel')
        setTimeout(() => {
            ref2.current.classList.remove('switchChannel')
        }, 500)
    }

    const onLogout = async (e) => {
        e.stopPropagation()
        await dispatch(logout());
    };

    return (
        <div className='helper-box-wrapper'>
            <div className='helper-box'>
                <div ref={ref2} className='white-noise-screen'></div>
                <div className='channel-switch-button-lgi channelup'
                    onClick={e => handleLClick(e)}>
                    <FontAwesomeIcon className='channel-button' icon={faCaretLeft} />
                </div>
                <div className='channel-switch-button-lgi channeldown' onClick={e => handleRClick(e)}><FontAwesomeIcon className='channel-button' icon={faCaretRight} /></div>
                <div className='channel-switch-button-lgi powerdown' onClick={(e) => onLogout(e)}></div>

                {showDiv === 1 && (
                    <div className='tv-ql-wrapper'>
                        <div className="tv-content-wrapper">
                            <div className='introduction-box'>
                                <h1 className='introduction-box-title'>Quick Links</h1>
                                <div className='introduction-box-title-back'></div>
                                <div className='introduction-box-content'>
                                    <div
                                        onClick={() => history.push('/recipes/add')}
                                        className='tv-screen-icon-box'>
                                        <img className='tv-screen-icon' src={require(`../../assets/img/sketchbook.png`).default} />
                                        <p className='tv-screen-icon-text'>Write</p>
                                    </div>
                                </div>
                                <div className='channel-point-box'>
                                    <p className='tv-screen-icon-text channel-point-text'>Change Channel</p>
                                    <img className='tv-screen-icon channel-point-icon' src={require(`../../assets/img/arrow.png`).default} />
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {list.map((item, idx) => (
                    showDiv === idx + 2 && (
                        <div key={idx} className={`instruction-video-box`}>
                            <p className='video-title'>{item.name}</p>
                            <video
                                autoPlay="true"
                                controls
                                className={`instruction-video ${idx}`} src={item.video}>
                            </video>
                            {/* <div className={`helper-hand-box ${item}`}></div>
                            <p className='inst-step-text'>{`Step ${idx+1} `}</p>
                            {showDiv === 4 && (
                                <p className='esc-text'>ESC to close</p>
                            )} */}
                        </div>
                    )
                ))}
                <div></div>
            </div>
        </div>
    )
}

export default HelperBox