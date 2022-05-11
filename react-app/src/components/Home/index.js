import CookBot from "../CookBot";
import './index.css'
import bigImg from '../../assets/img/bg-recipebox.jpg'

const Home = () => {
    return (
        <div className="home-wrapper">
            <div className="recipe-box">
                <div className="big-img-box"></div>
                <div className="ing-box">
                    <div className="ing-box-groc-icon"></div>
                </div>
                <div className="direc-box-1"></div>
                <div className="direc-box-2"></div>
            </div>
            <CookBot />
        </div>
    );
}

export default Home