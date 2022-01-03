import { Button, Typography } from 'antd';
import { useEffect } from 'react';
import { useState } from 'react';
import FeedContainer from './FeedContainer';

import SpottingForm from './SpottingForm';
import SpottingsContainer from './SpottingsContainer';

const Home = () => {
	useEffect(() => {
		fetch('/spottings');
	}, []);

	return (
		<>
			<Typography>Welcome to Aviary!</Typography>
		</>
	);
};

export default Home;
