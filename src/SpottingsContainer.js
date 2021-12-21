import { GoogleMap, LoadScript } from '@react-google-maps/api';
import { Col, Row, Space } from 'antd';
import { useState } from 'react';
import { useEffect } from 'react';
import EditCardForm from './EditCardForm';
import MapContainer from './MapContainer';
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

	const mapStyles = {
		height: '50vh',
		width: '50vh',
	};
	const defaultCenter = {
		lat: 40.6602,
		lng: -73.969749,
	};


	// GET STATE TO UPDATE!!!

	const handleDelete = (bird) => {
		fetch(`/spottings/${bird.id}`, { method: 'DELETE' })
			.then((r) => r.json())
			.then(() => {});
	};

	const renderCards = spottings.map((bird) => {
		return (
			<>
				<Space size={[8, 16]} wrap>
					{new Array(1).fill(null).map((_, index) => (
						// eslint-disable-next-line react/no-array-index-key
						<SpottingCard
							handleDelete={handleDelete}
							key={bird.id}
							bird={bird}
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
