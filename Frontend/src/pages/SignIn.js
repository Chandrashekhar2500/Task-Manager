import React from 'react';
import { useFormik } from 'formik';
import {useNavigate } from 'react-router-dom';
import { AuthService } from '../network/authService';
import AppDispatcher from '../redux/dispatchers/appDispatcher';
import { setCookie } from '../components/Cookie';
import toast from 'react-hot-toast';
import jwt_decode from "jwt-decode";
import './pages.scss';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';


const SignIn=()=> {
	const navigate = useNavigate()
	const formik = useFormik({
		initialValues: {
		user: '',
		password: '',
		},
    onSubmit: async(values) => {
	  	try {
			var isEmailType = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values?.user);
			var payload = { password: values?.password };
			if (isEmailType) {
				payload.email = values?.user;
			} else {
				payload.userName = values?.user;
			}

			await AuthService.loginByUser(payload).then(res => {
				if (res.code === 200) {
					const token = res.data.token;
					if (!!token) {
						AppDispatcher.updateLoginStatus(true);
						const decoded = jwt_decode(token, { header: true })
						setCookie('token', token);
						setCookie('uuid', decoded.id);
						setCookie('path', '/dashboard');
						navigate('/dashboard');
					}
				} else {
					toast.error(`${res.message}`, {
						duration: 2000
					});
				}
			});
		} catch (err) {
			toast.error('Sever Connection Failed', {
				duration: 2000
			});
		}
    },
  });

  return (
    <form onSubmit={formik.handleSubmit}>
		<Grid className='SigInForm'>
			<h4 className='text-center'>Sign In</h4>
			<Box className='Field'>
			<label>UserName/Email</label>
			<input
			type="text"
			name="user"
			{...formik.getFieldProps('user')}
			/>
			</Box>
			<Box className='Field'>
				<label>Password</label>
				<input
				type="password"
				name="password"
				{...formik.getFieldProps('password')}
				/>
			</Box>
			<Box className='Buttons'>
        		<Button type="submit" variant="outlined" color="success">Submit</Button>
        		<Button	Button onClick={()=>navigate('/register')} variant="outlined">Sign Up</Button>
        	</Box>
		</Grid>
    </form>
  );
}

export default SignIn;
