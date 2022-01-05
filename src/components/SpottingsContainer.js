import { Button, Col, Row, Space, Drawer, DatePicker } from 'antd';
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
	const [selectedSpotting, setSelectedSpotting] = useState(null);
	const [drawerVisible, setDrawerVisible] = useState(false);
	function displayEditForm(spotting) {
		setSpottingToEdit(spotting);
		showEditForm ? setShowEditForm(false) : setShowEditForm(true);
	}
	const [showMap, setShowMap] = useState(false);

	const [enableCardClick, setEnableCardClick] = useState(false);

	const { RangePicker } = DatePicker;
	//
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
		setSelectedSpotting(null);
		setShowMap(!showMap);
		setEnableCardClick(!enableCardClick);
	};

	const showDrawer = () => {
		if (!editMode) {
			setDrawerVisible(true);
		}
	};

	const closeDrawer = () => {
		setSelectedSpotting(null);
		setDrawerVisible(false);
	};

	const handleCardClick = (spotting) => {
		if (editMode === true) {
			setSelectedSpotting(null);
		} else {
			console.log(spotting);
			setSelectedSpotting(spotting);
		}
		if (showMap === false) {
			showDrawer();
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
							onClick={handleCardClick}
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

			<RangePicker />

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

						<Drawer
							// title={drawerBird.bird.common_name}
							placement="right"
							onClose={closeDrawer}
							visible={drawerVisible}
							size="large"
							destroyOnClose={true}
						>
							{selectedSpotting && (
								<>
									<Space align="center">
										<img
											style={{ maxWidth: '90vh' }}
											src={selectedSpotting.bird.image}
										/>
									</Space>
									<h1>{selectedSpotting.bird.common_name}</h1>

									<p>{selectedSpotting.bird.description}</p>
								</>
							)}
						</Drawer>
					</div>
				)}
				<Col span={12}>
					{showMap ? (
						<Space size="large" wrap>
							<div style={{ paddingTop: '30px' }} id="map">
								{' '}
								<AviaryMap
									spottings={spottings}
									selectedSpotting={selectedSpotting}
									onMarkerClicked={(spotting) =>
										setSelectedSpotting(spotting)
									}
									onMarkerCloseClicked={() =>
										setSelectedSpotting(null)
									}
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
