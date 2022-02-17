import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth } from '../firebase';
import '../css/Login.css'

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate();

  const signIn = e => {
    e.preventDefault();

    auth
      .signInWithEmailAndPassword(email, password)
      .then((auth) => {
        if (auth) {
          navigate('/')
        }
      })
      .catch(error => alert(error.message))
  }

  const register = e => {
    e.preventDefault();

    auth
      .createUserWithEmailAndPassword(email, password)
      .then((auth) => {
        if (auth) {
          navigate('/')
        }
      })
      .catch(error => alert(error.message))
  }

  return ( 
    <div className='login'>
      <div className='login__container'>
        <h1>Sign In</h1>
        <h5>Email</h5>
        <input
          type='text' 
          value={email}
          onChange={e => setEmail(e.target.value)} 
        />
        <h5>Password</h5>
        <input 
          type='password' 
          value={password}
          onChange={e => setPassword(e.target.value)} 
        />
        <button 
          type='submit' 
          className='login__signIn'
          onClick={signIn}
        >
          Sign In
        </button>
        <button 
          className='login__register'
          onClick={register}
        >
          Create your Amazon account
        </button>
      </div>
    </div>
  )
}

export default Login;
