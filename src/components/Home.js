import { Button, Typography } from 'antd';
import { useEffect } from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../logo.css';
import FeedContainer from './FeedContainer';

import SpottingForm from './SpottingForm';
import SpottingsContainer from './SpottingsContainer';

const { Title } = Typography;
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
			<Title>Welcome to Aviary!</Title>
			<img
				className="birdIcon"
				src="/logoBird4.png"
				style={{ paddingTop: '50px', maxHeight: '50vh' }}
			/>
		</>
	);
};

export default Home;
