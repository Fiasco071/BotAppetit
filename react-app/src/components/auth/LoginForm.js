import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { login } from '../../store/session';


const LoginForm = () => {
  const [errors, setErrors] = useState([]);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const user = useSelector(state => state.session.user);
  const dispatch = useDispatch();

  const onLogin = async (e) => {
    e.preventDefault();
    const data = await dispatch(login(email, password));
    if (data) {
      setErrors(data);
    }
  };

  const demoLogin = async (e) => {
    const data = await dispatch(login("demo@aa.io", "notpassword"));
    if (data) {
      setErrors(data);
    }
  };

  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  if (user) {
    return <Redirect to='/home' />;
  }

  
  return (
    <form 
    className='log-in-form'
    onSubmit={onLogin}>
      {errors.length != 0 && (
          <div className={`angry-bot-face ${errors.length != 0 ? 'showbotface' : null}`}>
              <div className='angry-bot-eye l'></div>
              <div className='angry-bot-eye r'></div>
              <div className='angry-bot-mouth'></div>
          </div>
        )}

{errors.length === 0 && (
      <>
        <div className='sign-up-bubble-speech'>Let's Create an Account!</div>
        <div className='happy-bot-face'>
          <p>u</p>
          <p>w</p>
          <p>u</p>
        </div>
      </>
    )}
      <div className='log-in-error-box'>
        {errors.map((error, ind) => (
          <div key={ind}>{error}</div>
        ))}
        {errors.length == 0 && (
          <p className='bubble-speech-login'>Let's Log In!</p>
        )}
      </div>
      <h1 className='log-in-title'>Log In</h1>
      
      <div className='log-in-input-box'>
        <label htmlFor='email'>Email</label>
        <input
          name='email'
          type='text'
          placeholder='Email'
          value={email}
          onChange={updateEmail}
        />
      </div>
      <div className='log-in-input-box'>
        <label htmlFor='password'>Password</label>
        <input
          name='password'
          type='password'
          placeholder='Password'
          value={password}
          onChange={updatePassword}
        />
        <button type='submit' className='log-in-button'>Login</button>
        <button 
        onClick={e => onLogin(e)}
        type='submit' className='log-in-button'>Demo</button>
      </div>
    </form>
  );
};

export default LoginForm;
