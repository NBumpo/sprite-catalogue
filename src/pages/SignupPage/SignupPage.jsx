
import { useState } from 'react'

import { Link, useNavigate } from 'react-router-dom'

import ErrorMessage from '../../components/ErrorMessage/ErrorMessage';

import userService from '../../utils/userService';



function SignUpPage({ handleSignUpOrLogin }) {

    const [state, setState] = useState({

        
        email: '',
        password: '',
        passwordConf: '',
        bio: '',


    })

    const [photo, setPhoto] = useState('')

    const [error, setError] = useState('')

    const navigate = useNavigate();

    async function handleSubmit(e) {
        e.preventDefault();

        const formData = new FormData();

        formData.append('photo', photo);

        for (let key in state) {
            formData.append(key, state[key])
        }

        try {
            await userService.signup(formData)

            handleSignUpOrLogin();

            navigate('/')

        } catch(err) {
            console.log(err.message)
            setError('Try signing up again')
        }
    }

    function handleChange(e){
        setState({
            ...state,
            [e.target.name]: e.target.value
        })
    }

    function handleFileInput(e) {

        console.log(e.target.files)
        setPhoto(e.target.files[0])
    }

    return (
        <>
        <main>
            <h1>Signup Page</h1>
            <section className="formwrapper">
            <form onSubmit={handleSubmit}>
                <input type='email' placeholder='Email' name='email' value={state.email} onChange={handleChange} required/>
                <input type='password' placeholder='Password' name='password' value={state.password} onChange={handleChange} required></input>
                <input type='passwordConf' placeholder='Confirm Password' name='passwordConf' value={state.passwordConf} onChange={handleChange} required></input>
                <textarea label='bio' name='bio' placeholder='Bio' onChange={handleChange}></textarea>
                <input type='file' name='photo' placeholder='Upload Image' onChange={handleFileInput}></input>
                <button type="submit" className="loginsignupbtn">Sign Up</button>

                
                {error ? <ErrorMessage error={error} /> : null}
            </form>
            </section>
            <div className='loginsignupswitch'>Already a User? <Link to="/login">Login</Link></div>
        </main>
        </>
    )
}

export default SignUpPage