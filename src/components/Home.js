import { Button } from 'antd';
import { useEffect } from 'react';
import { useState } from 'react';
import Feed from './Feed';

import SpottingForm from './SpottingForm';
import SpottingsContainer from './SpottingsContainer';

const Home = ({ currentUser, spottingMode, showAviary, renderFeed }) => {
	useEffect(() => {
		fetch('/spottings');
	}, []);

	return (
		<>
			<h1>Hello, {currentUser.username}!</h1>

			{spottingMode ? <SpottingForm currentUser={currentUser} /> : null}
			{showAviary ? (
				<SpottingsContainer currentUser={currentUser} />
			) : null}
			{renderFeed ? <Feed /> : null}
		</>
	);
};

export default Home;
