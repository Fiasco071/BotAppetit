import React, { useRef, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { login } from '../../store/session';


const LoginForm = () => {
  const [errors, setErrors] = useState([]);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const user = useSelector(state => state.session.user);
  const dispatch = useDispatch();
  const ref = useRef(null)


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

  const switchChannel = () => {
    ref.current.classList.add('switchChannel')
    setTimeout(() => {
      ref.current.classList.remove('switchChannel')
    }, 500)
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
          <div className='happy-bot-face'>
            <p>u</p>
            <p>w</p>
            <p>u</p>
          </div>
        </>
      )}
      <div className='log-in-error-box'>
        {errors.map((error, ind) => (
          <div 
          className='log-in-error-message'
          key={ind}>{error.split(":")[1]}</div>
        ))}
        {errors.length == 0 && (
          <><div ref={ref} className='white-noise-screen'></div>
          <div className='channel-switch-button-lgi channelup'
          onClick={switchChannel}></div>
          <div className='channel-switch-button-lgi channeldown' onClick={switchChannel}></div>
          <div className='introduction-box'>
              <h1 className='introduction-box-title'>Bot Appetit</h1>
              <div className='introduction-box-title-back'></div>
              <div className='introduction-box-content'>
                  <p>Welcome</p>
                  <p>Bot Appetit is a cooking recipe platform!</p>
                  <p>View/Create/Share recipes with others.</p>
              
              </div>
          </div></>
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
          className={errors.filter(error => error.includes('email')).length > 0 ? 'error-field' : null}
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
          className={errors.filter(error => error.includes('password')).length > 0 ? 'error-field' : null}
        />
        <div className='login-button-box'>
          <button type='submit' className='log-in-button'>Login</button>
          <button
            onClick={e => demoLogin(e)}
            type='submit' className='log-in-button'>Demo</button>
        </div>
      </div>
     
    </form>
  );
};

export default LoginForm;
