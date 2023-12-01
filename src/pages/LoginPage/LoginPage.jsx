import { useState } from 'react'

import React from 'react';
import './LoginPage.css';

import { Link, useNavigate } from 'react-router-dom'

import ErrorMessage from '../../components/ErrorMessage/ErrorMessage';

import userService from "../../utils/userService";



export default function LoginPage({ handleSignUpOrLogin }) {

  const [state, setState] = useState({
    email: '',
    password: ''
  })

  const [error, setError] = useState('')

  // this function takes a path defined in App.js for our routes
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      // We always pass in an OBJECT as the data we want to send to the server
      await userService.login(state)// making the http request to the server

      handleSignUpOrLogin();

      navigate('/')
      // this comes from app.js as a prop, which it gets the token from localstorage and stores the decoded 
      // token in the app.js state

    } catch (err) {
      console.log(err)
      setError('check terminal and console')
    }

  }

  function handleChange(e) {
    setState({
      ...state,
      [e.target.name]: e.target.value
    })
  }

  return (
    <main>
      <h1>Login Page</h1>
      <section className="formwrapper">
        <form autoComplete='off' onSubmit={handleSubmit}>
          <input type='email' placeholder='Email' name='email' value={state.email} onChange={handleChange} required></input>
          <input type='password' placeholder='Password' name='password' value={state.password} onChange={handleChange} required></input>

          <button type="submit" className="loginsignupbtn">
            Login
          </button>
          <div className='loginsignupswitch'>New User? <Link to="/signup">Sign up</Link></div>
          {error ? <ErrorMessage error={error} /> : null}
        </form>
      </section>
    </main>
  );
}

