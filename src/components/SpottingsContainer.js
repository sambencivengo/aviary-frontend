import { Button, Col, Row, Space } from 'antd';
import { useState } from 'react';
import { useEffect } from 'react';
import AviaryMap from './AviaryMap';
import EditCardForm from './EditCardForm';
import SpottingCard from './SpottingCard';

const SpottingsContainer = ({ currentUser, editMode }) => {
	const [spottings, setSpottings] = useState([]);
	const [showEditForm, setShowEditForm] = useState(false);
	const [spottingToEdit, setSpottingToEdit] = useState({});

	function displayEditForm(spotting) {
		setSpottingToEdit(spotting);
		showEditForm ? setShowEditForm(false) : setShowEditForm(true);
	}

	const [showMap, setShowMap] = useState(false);
	console.log(spottings);

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
			.then((r) => r.json())
			.then((newSpottings) => setSpottings(newSpottings));
	};

	const reFetch = () => {
		fetch('/mybirds')
			.then((r) => r.json())
			.then((data) => {
				setSpottings(data);
			});
	};

	const handleShowMap = () => {
		setShowMap(!showMap);
	};
	console.log(showMap);
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
			<Button onClick={handleShowMap}>Show Map</Button>
			{showEditForm ? <EditCardForm spotting={spottingToEdit} /> : null}

			<Row
				type="flex"
				justify="center"
				align="center"
				style={{ minHeight: '80vh' }}
			>
				{showMap ? (
					<Col span={12}>{renderCards}</Col>
				) : (
					<Col span={24}>{renderCards}</Col>
				)}

				<Col span={12}>
					{showMap ? (
						<div id="map">
							{' '}
							<AviaryMap spottings={spottings} />
						</div>
					) : null}
				</Col>
			</Row>
		</>
	);
};

export default SpottingsContainer;
