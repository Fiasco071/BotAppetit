import { useState } from 'react'
import './index.css'

const HelperBox = () => {
    const list = ['inst1', 'inst2', 'inst3', 'inst4']
    const [showDiv, setShowDiv] = useState(1)
    

    const handleRClick = () => {
        setShowDiv(showDiv + 1 <= 4 ? showDiv + 1 : 1)
    }
    const handleLClick = () => {
        setShowDiv(showDiv - 1 >= 1 ? showDiv - 1 : 4)
    }
    return (
        <div className='helper-box-wrapper'>
            <div className='helper-box'>
                <p 
                className='slider-button'
                onClick={handleLClick}>{'<'}</p>
                <p 
                className='slider-button'
                onClick={handleRClick}>{'>'}</p>
                {list.map((item, idx) => (
                    showDiv === idx + 1 && (
                        <div key={idx} className={`instruction-image-box ${item}`}>
                            <div className={`helper-hand-box ${item}`}></div>
                            <p className='inst-step-text'>{`Step ${idx+1}`}</p>
                        </div>
                    )
                ))}
                <div></div>
            </div>
        </div>
    )
}

export default HelperBox