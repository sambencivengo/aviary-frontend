import { Button, Col, Row, Space, Drawer } from 'antd';
import { useState } from 'react';
import { useContext } from 'react';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AviaryMap from './AviaryMap';

import EditCardForm from './EditCardForm';
import SpottingCard from './SpottingCard';
import { UserContext } from './UserProvider';

const SpottingsContainer = () => {
	const [spottings, setSpottings] = useState([]);
	const [showEditForm, setShowEditForm] = useState(false);
	const [spottingToEdit, setSpottingToEdit] = useState({});
	const [editMode, setEditMode] = useState(false);
	const [cardInfo, setCardInfo] = useState(null);
	const [drawerVisible, setDrawerVisible] = useState(false);
	function displayEditForm(spotting) {
		setSpottingToEdit(spotting);
		showEditForm ? setShowEditForm(false) : setShowEditForm(true);
	}
	const [showMap, setShowMap] = useState(false);
	const [spotting, setSpotting] = useState(spottings[1]);
	const [enableCardClick, setEnableCardClick] = useState(false);

	console.log(spotting);

	useEffect(() => {
		fetch('/mybirds')
			.then((r) => r.json())
			.then((data) => {
				setSpottings(data);
			});
	}, []);

	const handleDelete = (bird) => {
		fetch(`/spottings/${bird.id}`, { method: 'DELETE' })
			.then((r) => r.json())
			.then((newSpottings) => setSpottings(newSpottings));
	};

	const handleShowMap = () => {
		setShowMap(!showMap);
		setEnableCardClick(!enableCardClick);
	};

	const showDrawer = (spotting) => {
		setDrawerVisible(true);
	};
	const onClose = () => {
		setDrawerVisible(false);
	};
	const [drawerBird, setDrawerBird] = useState({});
	const handleCardClick = (spotting) => {
		if (showMap === false) {
			setDrawerBird(spotting.bird.id);
			showDrawer(spotting);
			return null;
		} else {
			if (cardInfo !== null) {
				setCardInfo(null);
			} else {
				setCardInfo(spotting.id);
			}
		}
	};

	const renderCards = spottings.map((spotting) => {
		return (
			<>
				<Space key={spotting.id} size={[8, 16]} wrap>
					{new Array(1).fill(null).map((_, index) => (
						// eslint-disable-next-line react/no-array-index-key
						<SpottingCard
							key={spotting.id}
							handleCardClick={handleCardClick}
							handleDelete={handleDelete}
							spotting={spotting}
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
	// console.log(drawerBird.bird);
	return (
		<>
			<Button
				value={'small'}
				danger
				onClick={() => {
					setEditMode(!editMode);
				}}
			>
				Edit Aviary
			</Button>
			<Button onClick={handleShowMap}>Show Map</Button>
			{showEditForm ? <EditCardForm spotting={spottingToEdit} /> : null}

			<Row
				type="flex"
				justify="center"
				align="center"
				style={{ minHeight: '80vh' }}
			>
				{showMap ? (
					<Col span={12}>
						<div
							style={{
								maxHeight: '75vh',
								overflowY: 'scroll',
							}}
						>
							<Space size="large" align="center" wrap>
								{renderCards}
							</Space>
						</div>
					</Col>
				) : (
					<div>
						<Space size="large" wrap>
							{renderCards}
						</Space>
						{/* <Drawer
							// title={drawerBird.bird.common_name}
							placement="right"
							onClose={onClose}
							visible={drawerVisible}
							size="medium"
						>
							<>
								<p>...</p>
							</>
						</Drawer> */}
					</div>
				)}
				<Col span={12}>
					{showMap ? (
						<Space size="large" wrap>
							<div style={{ paddingTop: '30px' }} id="map">
								{' '}
								<AviaryMap
									// showInfo={showInfo}
									spottings={spottings}
									cardInfo={cardInfo}
								/>
							</div>
						</Space>
					) : null}
				</Col>
			</Row>
		</>
	);
};

export default SpottingsContainer;
