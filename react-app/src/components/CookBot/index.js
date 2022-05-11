import './index.css'

const CookBot = () => {
    return (
        <div className='bot-wrapper'>
            <div className='bot-head'></div>
            <div className='bot-side'></div>
            <div className='bot-face'>
                <div className='bot-face-screen'>
                    <div className="bot-eyes"></div>
                    {/* <div className='bot-stache'></div> */}
                </div>
                <div className='ing-dnd'>
                    <div className='bot-stomach-lid'></div>
                    <div className='bot-stomach-lid-side'></div>
                </div>
            </div>
            <div className="left-arm"></div>
            <div className="right-arm"></div>
            <div>
                <div className="left-leg">
                    
                </div>
                <div className='left-foot'></div>
                <div className="right-leg"></div>
                <div className='right-foot'></div>
                <div className='logo'>BOT</div>
            </div>
        </div>
    );
}

export default CookBot