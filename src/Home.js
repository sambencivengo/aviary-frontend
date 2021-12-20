import { Button } from 'antd';
import { useEffect } from 'react';
import { useState } from 'react';
import MapContainer from './MapContainer';
import SpottingForm from './SpottingForm';
import SpottingsContainer from './SpottingsContainer';

const Home = ({ currentUser }) => {
	const [spottingMode, setSpottingMode] = useState(false);

	function toggleSpottingMode() {
		setSpottingMode(!spottingMode);
	}

	useEffect(() => {
		fetch('/spottings');
	}, []);

	return (
		<>
			<h1>Hello, {currentUser.username}!</h1>

			<Button value={'small'} onClick={() => toggleSpottingMode()}>
				See a bird?
			</Button>
			{spottingMode ? (
				<SpottingForm currentUser={currentUser} />
			) : (
				<SpottingsContainer currentUser={currentUser} />
			)}
		</>
	);
};

export default Home;
