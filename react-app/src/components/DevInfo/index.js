import './index.css'


const DevInfo = () => {
    return (
        <>

            <div className="dev-info-box">
                <div className="dev-icon-button"></div>
                <div className="dev-info-box-content">
                <h1 className='dev-info-title'>Developer Info</h1>
                <div className='info-pill-box'>
                    <p className='label-tag'>Name</p>
                    <p className='label-tag-text'>Steve Choi</p>
                </div>
                <div className='info-pill-box'>
                    <p className='label-tag'>Contacts</p>
                    <p className='label-tag-text'>1,2,3</p>
                </div>
                <div className='info-pill-box'>
                    <p className='label-tag'>Other Works</p>
                    <p className='label-tag-text'>1,2,3</p>
                </div>
                </div>
            </div>
        </>
    );
}

export default DevInfo