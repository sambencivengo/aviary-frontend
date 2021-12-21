import { Space } from 'antd';
import { useState } from 'react';
import { useEffect } from 'react';
import EditCardForm from './EditCardForm';
import SpottingCard from './SpottingCard';

const SpottingsContainer = ({ currentUser, editMode }) => {
	const [spottings, setSpottings] = useState([]);
	const [showEditForm, setShowEditForm] = useState(false);

	function displayEditForm() {
		showEditForm ? setShowEditForm(false) : setShowEditForm(true);
	}

	useEffect(() => {
		fetch('/mybirds')
			.then((r) => r.json())
			.then((data) => {
				setSpottings(data);
			});
	}, []);

	// GET STATE TO UPDATE!!!

	const handleDelete = (bird) => {
		fetch(`/spottings/${bird.id}`, { method: 'DELETE' })
			.then((r) => console.log(r))
			.then(reFetch());
	};
	const reFetch = () => {
		fetch('/mybirds')
			.then((r) => r.json())
			.then((data) => {
				setSpottings(data);
			});
	};

	const renderCards = spottings.map((spotting) => {
		return (
			<>
				<Space size={[8, 16]} wrap>
					{new Array(1).fill(null).map((_, index) => (
						// eslint-disable-next-line react/no-array-index-key
						<SpottingCard
							handleDelete={handleDelete}
							key={spotting.id}
							spotting={spotting}
							currentUser={currentUser}
							editMode={editMode}
							displayEditForm={displayEditForm}
						/>
					))}
				</Space>
			</>
		);
	});
	// console.log(spottings[0].lat, spottings[0].long);
	// set spottings into an array
	// pass them to the google maps component
	// iterate through them (lat & long) to create Markers

	// MAP IDEAS
	// map conatiner might not be the way to render the
	// map if each marker is customized to the fetch

	return (
		<>
			<h4>This is the container for the User's spotted birds.</h4>
			{showEditForm ? <EditCardForm /> : null}
			{renderCards}
		</>
	);
};

export default SpottingsContainer;
