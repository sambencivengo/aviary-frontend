import { Button, Typography } from 'antd';
import { useEffect } from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import FeedContainer from './FeedContainer';

import SpottingForm from './SpottingForm';
import SpottingsContainer from './SpottingsContainer';

const Home = () => {
	const navigate = useNavigate();
	useEffect(() => {
		const timeoutId = setTimeout(() => {
			navigate('/myaviary');
		}, 3000);

		return () => {
			clearTimeout(timeoutId);
		};
	}, []);

	return (
		<>
			<Typography>Welcome to Aviary!</Typography>
			<img src="/logoBird4.png" style={{ maxHeight: '50vh' }} />
		</>
	);
};

export default Home;
