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
                            <a href='https://linkedin.com/in/schoi017'>
                            <img className='dev-link-icon linkedin' src={require(`../../assets/img/linkedin.png`).default} />
                            </a>
                            <a href='https://fiasco071.github.io/Portfolio/'>
                            <img className='dev-link-icon portfolio' src={require(`../../assets/img/portfolio.png`).default} />
                            </a>
                            
                           
                        </p>
                    </div>
                    <div className='info-pill-box'>
                        <p className='label-tag'>Othr Wrk</p>
                        <p className='label-tag-text'>
                        <a href='https://input-app.herokuapp.com/'>
                            <img className='dev-link-icon project1' src={require(`../../assets/img/floppy-disk.png`).default} />
                            </a>
                            <a href='https://rocket-note-app.herokuapp.com/'>
                            <img className='dev-link-icon project2' src={require(`../../assets/img/floppy-disk.png`).default} />
                            </a>
                            <a href='https://tothemoon-investment-app.herokuapp.com/'>
                            <img className='dev-link-icon project3' src={require(`../../assets/img/floppy-disk.png`).default} />
                            </a>
                        </p>
                    </div>
                </div>
            </div>
        </>
    );
}

export default DevInfo