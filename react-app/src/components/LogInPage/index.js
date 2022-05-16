import CookBot from "../CookBot";
import './index.css'

import LoginForm from "../auth/LoginForm";
import SignUpForm from "../auth/SignUpForm";
import { useState } from "react";



const LogInPage = () => {
    const [flag, setFlag] = useState('login')

    return (
        <div className="login-wrapper loginpage">
            <div className="recipe-box main-login">
            <div className="website-title-back loginpage-title-back"></div>
                <h1 className="website-title">Bot-Appetit</h1>
                {flag == 'login' && (
                    <div>
                        <LoginForm />
                    </div>
                )}
                {flag == 'signup' && (
                    <div>
                        <SignUpForm />
                    </div>
                )}
            </div>
            <div
                onClick={() => setFlag('login')}
                className={`log-in-icon ${flag == 'signup' ? 'unselected' : null}`}> Log In</div>
            <div
                onClick={() => setFlag('signup')}
                className={`sign-up-icon ${flag == 'login' ? 'unselected' : null}`}>Sign Up</div>
            <div className="cookbot-container-login">
                <CookBot />
            </div>
        </div>
    );
}

export default LogInPage