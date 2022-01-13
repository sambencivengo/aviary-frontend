import { Affix, Button, Col, Divider, Drawer, Row, Space, Spin } from 'antd';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import SpottingCard from './SpottingCard';
import { EnvironmentOutlined } from '@ant-design/icons';
import AviaryMap from './AviaryMap';

import { Link, Outlet } from 'react-router-dom';
import Title from 'antd/lib/typography/Title';
import Text from 'antd/lib/typography/Text';

const UserAviary = ({}) => {
	let params = useParams();
	const [loading, setLoading] = useState(false);
	const [user, setUser] = useState({});

	const [top, setTop] = useState(10);
	const [bottom, setBottom] = useState(10);
	const [showMap, setShowMap] = useState(false);
	const [selectedSpotting, setSelectedSpotting] = useState(null);
	const [drawerVisible, setDrawerVisible] = useState(false);
	const [enableCardClick, setEnableCardClick] = useState(false);

	useEffect(() => {
		fetch(`/users/${params.userId}`)
			.then((r) => r.json())
			.then((data) => {
				console.log(data);
				setUser(data);
			})
			.finally(() => setLoading(true));
	}, []);

	const handleShowMap = () => {
		setSelectedSpotting(null);
		setShowMap(!showMap);
		setEnableCardClick(!enableCardClick);
	};

	const closeDrawer = () => {
		setDrawerVisible(false);
		setSelectedSpotting(null);
	};
	const openDrawer = (spotting) => {
		setDrawerVisible(true);
		setSelectedSpotting(spotting);
	};

	const onMarkerClicked = (spotting) => {
		setSelectedSpotting(spotting);
	};
	const handleCardClick = (spotting) => {
		if (showMap === false) {
			openDrawer(spotting);
		} else {
			setSelectedSpotting(spotting);
		}
	};
	const resetInfoWindow = () => {
		setSelectedSpotting(null);
		console.log('clicked map');
	};

	if (loading === false) {
		return <Spin size="large" />;
	}

	return (
		<>
			<Affix offsetTop={top}>
				<Button style={{ float: 'left' }}>
					<Link to={'/feed'}>Back to Feed</Link>
				</Button>
				<Button
					style={{ float: 'right' }}
					type="primary"
					onClick={() => {
						handleShowMap();
					}}
				>
					Map <EnvironmentOutlined />
				</Button>
			</Affix>
			<h2>{user.username}'s Aviary </h2>
			<Divider></Divider>
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
						<Title level={2} style={{ paddingTop: '15px' }}>
							{selectedSpotting.bird.common_name}
						</Title>
						<Divider orientation="left">
							<Text italic>{selectedSpotting.bird.sci_name}</Text>
						</Divider>
						<div
							style={{
								backgroundColor: '#E8E8E4',
								padding: '10px',
							}}
						>
							<Text>{selectedSpotting.bird.description}</Text>
						</div>
					</>
				)}
			</Drawer>

			{user.spottings.length > 0 ? (
				showMap ? (
					<>
						<Row>
							<Col span={12}>
								<div
									style={{
										maxHeight: '75vh',
										overflowY: 'scroll',
										paddingBottom: '20px',
									}}
								>
									{user.spottings
										.sort(function (a, b) {
											return (
												new Date(b.date) -
												new Date(a.date)
											);
										})
										.map((spotting) => {
											console.log(spotting);
											return (
												<Space
													key={spotting.id}
													size={[8, 16]}
													wrap
												>
													<>
														<SpottingCard
															key={spotting.id}
															spotting={spotting}
															onClick={
																handleCardClick
															}
														/>
													</>
												</Space>
											);
										})}
								</div>
							</Col>
							<Col span={12}>
								<div style={{ paddingTop: '30px' }}></div>
								<AviaryMap
									onMarkerClicked={onMarkerClicked}
									spottings={user.spottings}
									selectedSpotting={selectedSpotting}
									resetInfoWindow={resetInfoWindow}
								/>
							</Col>
						</Row>
					</>
				) : (
					user.spottings
						.sort(function (a, b) {
							return new Date(b.date) - new Date(a.date);
						})
						.map((spotting) => {
							return (
								<>
									<Space
										key={spotting.id}
										size={[8, 16]}
										wrap
									>
										<SpottingCard
											key={spotting.id}
											spotting={spotting}
											onClick={handleCardClick}
										/>
									</Space>
								</>
							);
						})
				)
			) : (
				<h1>This user hasn't seen any birds!</h1>
			)}
		</>
	);
};

export default UserAviary;
