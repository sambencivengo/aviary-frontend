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

	return (
		<>
			<h1>Hello, {currentUser.username}!</h1>
			<button onClick={logOut}>Log Out</button>
			<button onClick={() => toggleSpottingMode()}>See a bird?</button>
			{spottingMode ? <SpottingForm /> : <SpottingsContainer />}
		</>
	);
};

export default Home;
