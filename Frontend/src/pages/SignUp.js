import React from 'react';
import { useFormik } from 'formik';
import {useNavigate } from 'react-router-dom';
import { AuthService } from '../network/authService';
import toast from 'react-hot-toast';
import './pages.scss';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';

const SignUp=()=> {
	const navigate = useNavigate()
	const formik = useFormik({
		initialValues: {
			userName:'',
			email: '',
			password: '',
		},
		
    onSubmit: async(values) => {
		if(values.password !== '' && (values.email !== '' || values.userName !== '')){
			try {
				await AuthService.signUpByUser(values).then(res => {
					if (res.code === 200) {
						toast.success(`${res.message}`, {
							duration: 2000
						});
						navigate('/login');
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
		} else {
			toast.error('Fields are Required', {
				duration: 2000
			});
		}
    },
  });

  return (
    <form onSubmit={formik.handleSubmit}>
		<Grid className='SigInForm'>
			<h4 className='text-center'>Sign Up</h4>
			<Box className='Field'>
			<label>UserName</label>
			<input
			type="text"
			name="userName"
			{...formik.getFieldProps('userName')}
			/>
			</Box>
			<Box className='Field'>
			<label>Email</label>
			<input
			type="email"
			name="email"
			{...formik.getFieldProps('email')}
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
        		<Button	Button onClick={()=>navigate('/login')} variant="outlined">Login</Button>
        	</Box>
		</Grid>

    </form>
  );
}

export default SignUp;
