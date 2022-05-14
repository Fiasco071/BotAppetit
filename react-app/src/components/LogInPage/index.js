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
                <p>Log In</p>
                <p>Sign Up</p>
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
            <img 
            onClick={() => setFlag('login')}
            className={`log-in-icon ${flag == 'signup' ? 'unselected': null}`} src={require(`../../assets/img/login.png`).default} />
            <img 
            onClick={() => setFlag('signup')}
            className={`sign-up-icon ${flag == 'login' ? 'unselected': null}`} src={require(`../../assets/img/signup.png`).default} />
            <div className="cookbot-container-login">
                <CookBot />
            </div>
        </div>
    );
}

export default LogInPage