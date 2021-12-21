import { Button } from 'antd';
import { useEffect } from 'react';
import { useState } from 'react';

import SpottingForm from './SpottingForm';
import SpottingsContainer from './SpottingsContainer';

const Home = ({ currentUser }) => {
	const [spottingMode, setSpottingMode] = useState(false);
	const [editMode, setEditMode] = useState(false);

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
			<Button
				value={'small'}
				danger
				onClick={() => {
					setEditMode(!editMode);
				}}
			>
				Edit Aviary
			</Button>
			{spottingMode ? (
				<SpottingForm currentUser={currentUser} />
			) : (
				<SpottingsContainer
					currentUser={currentUser}
					editMode={editMode}
				/>
			)}
		</>
	);
};

export default Home;
