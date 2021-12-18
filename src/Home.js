import { Button } from 'antd';
import { useEffect } from 'react';
import { useState } from 'react';
import MapContainer from './MapContainer';
import SpottingForm from './SpottingForm';
import SpottingsContainer from './SpottingsContainer';

const Home = ({ handleLogout, currentUser }) => {
	const [spottingMode, setSpottingMode] = useState(false);

	const logOut = () => {
		fetch('/logout', { method: 'DELETE' })
			.then((r) => r.json())
			.then(handleLogout())
			.catch((error) => console.log(error));
	};

	function toggleSpottingMode() {
		setSpottingMode(!spottingMode);
	}

	useEffect(() => {
		fetch('/spottings');
	}, []);

	return (
		<>
			<h1>Hello, {currentUser.username}!</h1>
			<Button value={'small'} danger onClick={logOut}>
				Log Out
			</Button>
			<Button value={'small'} onClick={() => toggleSpottingMode()}>
				See a bird?
			</Button>
			{spottingMode ? <SpottingForm /> : <SpottingsContainer />}
		</>
	);
};

export default Home;
