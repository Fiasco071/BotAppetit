import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { Redirect } from 'react-router-dom';
import { signUp } from '../../store/session';

const SignUpForm = () => {
  const [errors, setErrors] = useState([]);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const [feErrors, setFEErrors] = useState([]);

  const user = useSelector(state => state.session.user);
  const dispatch = useDispatch();

  const onSignUp = async (e) => {
    e.preventDefault();
    setHasSubmitted(true);



    const data = await dispatch(signUp(username, email, password));
    if (data) {
      setErrors(data)
    }
    // setHasSubmitted(false)
  };

  let errorArray = []
  useEffect(() => {
    if (password !== repeatPassword) errorArray.push('Passwords do not match.')
    setFEErrors(errorArray)
  }, [password, repeatPassword])


  const updateUsername = (e) => {
    setUsername(e.target.value);
  };

  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  const updateRepeatPassword = (e) => {
    setRepeatPassword(e.target.value);
  };

  if (user) {
    return <Redirect to='/home' />;
  }


  return (
    <>
      {errors.length != 0 && (
        <div className={`angry-bot-face ${errors.length != 0 ? 'showbotface' : null}`}>
          <div className='angry-bot-eye l'></div>
          <div className='angry-bot-eye r'></div>
          <div className='angry-bot-mouth'></div>
        </div>
      )}
      {errors.length === 0 && feErrors.length === 0 && !hasSubmitted && (
        <>
          <div className='sign-up-bubble-speech'>Let's Create an Account!</div>
          <div className='happy-bot-face'>
            <p>u</p>
            <p>w</p>
            <p>u</p>
          </div>
          <ul className='cartoon-effect'>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
          </ul>
        </>
      )}

      <form
        className='sign-up-form'
        onSubmit={onSignUp}>
        <h2 className='sign-up-title'>Sign Up</h2>
        <div className='signup-error-box'>
          {errors.map((error, ind) => (
            <>
              <div key={ind}>{error.split(":")[1]}</div>
            </>
          ))}
          {hasSubmitted && feErrors.length > 0 && feErrors.map(error => (
            <div className='signup-fe-errors'>{error}</div>
          ))}
        </div>

        <div className='log-in-input-box'>
          <label>User Name</label>
          <input
            type='text'
            name='username'
            onChange={updateUsername}
            value={username}
          ></input>
        </div>

        <div className='log-in-input-box'>
          <label>Email</label>
          <input
            type='text'
            name='email'
            onChange={updateEmail}
            value={email}
          ></input>
        </div>

        <div className='log-in-input-box'>
          <label>Password</label>
          <input
            type='password'
            name='password'
            onChange={updatePassword}
            value={password}
          ></input>
        </div>

        <div className='log-in-input-box'>
          <label>Confirm Password</label>
          <input
            type='password'
            name='repeat_password'
            onChange={updateRepeatPassword}
            value={repeatPassword}
            required={true}
          ></input>
        </div>


        <div>


        </div>
        <div>

        </div>
        <div>

        </div>
        <button type='submit' className='sign-up-button'>Sign Up</button>
      </form></>
  );
};

export default SignUpForm;
