import React from 'react'
import {useNavigate } from 'react-router-dom';
import './pages.scss';

const LandingPage = () => {
	const navigate = useNavigate()
    return (
        <>
            <h1 className='text-center mt-5'>Welcome to Task-Manager</h1>
            <h4 className='text-center mt-4'><strong onClick={()=>navigate('register')} className='Addbutton'>Register</strong><strong onClick={()=>navigate('login')} className='Addbutton'>Login</strong></h4>
        </>
    )
}

export default LandingPage;
