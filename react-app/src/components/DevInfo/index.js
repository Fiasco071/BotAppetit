import './index.css'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { } from "@fortawesome/free-solid-svg-icons";

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
                        <p className='label-tag-text'>
                            <a href='https://github.com/fiasco071'>
                            <img 
                            className='dev-link-icon github' src={require(`../../assets/img/github.png`).default} />
                            </a>
                            <a href='https://www.linkedin.com/schoi017/'>
                            <img className='dev-link-icon linkedin' src={require(`../../assets/img/linkedin.png`).default} />
                            </a>
                            <a href='https://fiasco071.github.io/Portfolio/'>
                            <img className='dev-link-icon portfolio' src={require(`../../assets/img/portfolio.png`).default} />
                            </a>
                            
                           
                        </p>
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