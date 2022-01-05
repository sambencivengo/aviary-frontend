import { Button, Typography } from 'antd';
import { useEffect } from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
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
				src="/logoBird4.png"
				style={{ paddingTop: '30px', maxHeight: '60vh' }}
			/>
		</>
	);
};

export default Home;
