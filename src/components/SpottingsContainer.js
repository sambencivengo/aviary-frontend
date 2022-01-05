import {
	Button,
	Col,
	Row,
	Space,
	Drawer,
	DatePicker,
	Typography,
	Divider,
	Affix,
} from 'antd';
import { EnvironmentOutlined } from '@ant-design/icons';
import Text from 'antd/lib/typography/Text';
import Title from 'antd/lib/typography/Title';
import { useState } from 'react';
import { useContext } from 'react';
import { useEffect } from 'react';

import AviaryMap from './AviaryMap';

import EditCardForm from './EditCardForm';
import SpottingCard from './SpottingCard';
import { UserContext } from './UserProvider';
import { useNavigate } from 'react-router-dom';

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
	const { Title } = Typography;
	const { RangePicker } = DatePicker;

	useEffect(() => {
		fetch('/mybirds')
			.then((r) => r.json())
			.then((data) => {
				setSpottings(data);
			});
	}, []);
	const { currentUser } = useContext(UserContext);
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
	const [top, setTop] = useState(10);
	const [bottom, setBottom] = useState(10);

	return (
		<>
			<Affix offsetTop={top}>
				<Button
					style={{ float: 'right' }}
					type="primary"
					onClick={handleShowMap}
				>
					Map <EnvironmentOutlined />
				</Button>
			</Affix>
			<Button
				value={'small'}
				danger
				style={{ float: 'left' }}
				onClick={() => {
					setEditMode(!editMode);
				}}
			>
				Edit Aviary
			</Button>
			{/* <Button onClick={handleShowMap}>Show Map</Button> */}
			{showEditForm ? <EditCardForm spotting={spottingToEdit} /> : null}

			<RangePicker />
			<Divider></Divider>

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
						<Space size="large" align="center" wrap>
							<Col>{renderCards}</Col>
						</Space>

						<Drawer
							// title={drawerBird.bird.common_name}
							placement="right"
							onClose={closeDrawer}
							visible={drawerVisible}
							destroyOnClose={true}
							size="large"
						>
							{selectedSpotting && (
								<>
									<Space align="center">
										<img
											style={{
												maxWidth: '100%',
												// maxWidth: '90vh',
											}}
											src={selectedSpotting.bird.image}
										/>
									</Space>
									<Title
										level={2}
										style={{ paddingTop: '15px' }}
									>
										{selectedSpotting.bird.common_name}
									</Title>
									<Divider orientation="left">
										<Text italic>
											{selectedSpotting.bird.sci_name}
										</Text>
									</Divider>
									<div
										style={{
											backgroundColor: '#f8edeb',
											padding: '10px',
										}}
									>
										<Text>
											{selectedSpotting.bird.description}
										</Text>
									</div>
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
