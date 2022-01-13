import { Affix, Button, Col, Divider, Row, Space, Spin } from 'antd';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import SpottingCard from './SpottingCard';
import { EnvironmentOutlined } from '@ant-design/icons';
import AviaryMap from './AviaryMap';

import { Link, Outlet } from 'react-router-dom';

const UserAviary = ({}) => {
	let params = useParams();
	const [loading, setLoading] = useState(false);
	const [user, setUser] = useState({});

	const [top, setTop] = useState(10);
	const [bottom, setBottom] = useState(10);
	const [showMap, setShowMap] = useState(false);
	const [selectedSpotting, setSelectedSpotting] = useState(null);

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
		// setSelectedSpotting(null);
		// setShowMap(!showMap);
		// setEnableCardClick(!enableCardClick);
	};

	console.log(user);
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
						setShowMap(!showMap);
					}}
				>
					Map <EnvironmentOutlined />
				</Button>
			</Affix>
			<h2>{user.username}'s Aviary </h2>
			<Divider></Divider>

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
									<Space size="large" align="center" wrap>
										{user.spottings.map((spotting) => {
											console.log(spotting);
											return (
												<>
													<SpottingCard
														key={spotting.id}
														spotting={spotting}
													/>
												</>
											);
										})}
									</Space>
								</div>
							</Col>
							<Col span={12}>
								<Space size="large" wrap>
									<div
										style={{ paddingTop: '30px' }}
										id="map"
									>
										<AviaryMap spottings={user.spottings} />
									</div>
								</Space>
							</Col>
						</Row>
					</>
				) : (
					user.spottings.map((spotting) => {
						console.log(spotting);
						return (
							<>
								<Space key={spotting.id} size={[8, 16]} wrap>
									<> </>
									<SpottingCard
										key={spotting.id}
										spotting={spotting}
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
