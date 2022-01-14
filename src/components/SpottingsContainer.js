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
	BackTop,
} from 'antd';
import moment from 'moment';

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
import { useLocation } from 'react-use';

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

	const navigate = useNavigate();
	const location = useLocation();
	useEffect(() => {
		// fetch('/me').then((r) =>
		// 	r
		// 		.json()
		// 		.then((user) => {
		// 			if (user.username !== undefined && location('/myaviary')) {
		// 				navigate('/home');
		// 			} else {
		// 				navigate('/login');
		// 			}
		// 		})
		// 		.catch((error) => {
		// 			navigate('/login');
		// 			console.log(error);
		// 		})
		// );
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

	const [startDate, setStartDate] = useState();
	const [endDate, setEndDate] = useState();
	console.log(startDate, endDate);

	console.log(spottings);
	const [range, setRange] = useState();

	const filteredSpottings = spottings.filter((spotting) => {
		let spottingDate = new Date(spotting.date);
		if (range) {
			return spottingDate >= startDate && spottingDate <= endDate;
		}
		return spotting;
	});
	console.log(filteredSpottings);
	const renderCards = filteredSpottings.map((spotting) => {
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
	console.log(range);

	const [top, setTop] = useState(10);
	const [bottom, setBottom] = useState(10);

	console.log(startDate, endDate);

	function disabledDate(current) {
		return current && current > moment().endOf('day');
	}

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

			{/* <RangePicker
				onCalendarChange={(e) => {
				
				}}
			/> */}
			{/* <RangePicker
				// value={hackValue || value}
				disabledDate={disabledDate}
				onCalendarChange={(val) => {
				
				}}
				// onChange={(val) => setValue(val)}
				// onOpenChange={onOpenChange}
			/> */}

			<RangePicker
				value={range}
				disabledDate={(current) => current > moment.now()}
				onChange={(val) => {
					setRange(val);
					setStartDate(val[0]['_d']);
					setEndDate(val[1]['_d']);
				}}
			/>
			<Divider></Divider>

			<Row
				type="flex"
				justify="center"
				align="center"
				style={{ minHeight: '80vh' }}
			>
				{/* {spottings.length < 1 ? (
					<>
						<Title>You don't have any birds in your aviary!</Title>
						<img
							style={{ maxWidth: '80vh' }}
							src="spottingBird3.png"
						/>
					</>
				) : null} */}

				{showMap ? (
					<Col span={12}>
						{/* <div
						
								paddingLeft: '15px',
							}}
						> */}

						<div
							style={{
								maxHeight: '75vh',
								overflowY: 'scroll',
								paddingBottom: '20px',
							}}
						>
							{renderCards}
							{/* <Affix offsetBottom={bottom}></Affix> */}
						</div>
					</Col>
				) : (
					<div>
						<Space size="large" align="center" wrap>
							<Col>{renderCards}</Col>
							<BackTop />
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
											backgroundColor: '#E8E8E4',
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
									spottings={filteredSpottings}
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
