import { Box } from '@mui/material';
import React from 'react';
import {useNavigate } from 'react-router-dom';


const Error = () => {
	const navigate = useNavigate()

	return (
		<>
			<Box>
				<Box className="mainContainer">
					<Box>
						<h1
							className={`text-center animate__animated animate__slow animate__pulse animate__infinite`}
						>
							404
						</h1>
						<h3 className={`text-center animate__animated animate__slow animate__pulse animate__infinite`}>Page Not Found</h3>
						<button className={`text-center animate__animated animate__slow animate__pulse animate__infinite`} onClick={()=>navigate('/')}>Go Back</button>
					</Box>
				</Box>
			</Box>
		</>
	);
};

export default Error;
