import CookBot from "../CookBot";
import './index.css'
import bigImg from '../../assets/img/bg-recipebox.jpg'
import { useRef, useState } from "react";




const Home = () => {
    const ref = useRef(null);
    const [sliderFlag, setSliderFlag] = useState(false)

    const slidein = () => {
        if (!sliderFlag) {
            ref.current.classList.add("slideanimation");
            setSliderFlag(true)
        } else {
            ref.current.classList.remove("slideanimation");
            setSliderFlag(false)
        }
    }

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
            <div ref={ref} className="ingredient-dnd-box">
                <p onClick={slidein} className="ing-dnd-box-tab">Ingredients</p>
            </div>
        </div>
    );
}

export default Home