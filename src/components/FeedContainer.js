import {
	Card,
	Col,
	DatePicker,
	Divider,
	Form,
	Input,
	message,
	Row,
	Space,
	Spin,
	Typography,
} from 'antd';
import Sider, { SiderContext } from 'antd/lib/layout/Sider';
import Title from 'antd/lib/typography/Title';
import moment from 'moment';
import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import FeedMap from './FeedMap';

import FollowedUsersContainer from './FollowedUsersContainer';

import UnfollowedUsersContainer from './UnfollowedUsersContainer';
import { UserContext } from './UserProvider';

const FeedContainer = () => {
	const [users, setUsers] = useState([]);
	const [followings, setFollowings] = useState([]);
	const [followedLoaded, setFollowedLoaded] = useState(false);
	const [notfollowedLoaded, setNotFollowedLoaded] = useState(false);
	const navigate = useNavigate();

	const { currentUser } = useContext(UserContext);

	const [spottings, setSpottings] = useState([]);

	const [selectedSpotting, setSelectedSpotting] = useState({});
	const handleInfoWindow = (spotting) => {
		setSelectedSpotting(spotting);
	};

	useEffect(() => {
		fetch('/feed')
			.then((r) => r.json())
			.then((users) => {
				setUsers(users);
			})
			.finally(() => setNotFollowedLoaded(true));
		fetch('/followings')
			.then((r) => r.json())
			.then((followedUsers) => {
				setFollowings(followedUsers);
			})
			.finally(() => setFollowedLoaded(true));
		fetch('/spottings')
			.then((r) => r.json())
			.then((spottings) => {
				setSpottings(spottings);
			});
	}, []);

	const stateReset = () => {
		fetch('/feed')
			.then((r) => r.json())
			.then((users) => {
				setUsers(users);
			})
			.catch((error) => console.log(error));
		fetch('/followings')
			.then((r) => r.json())
			.then((followedUsers) => {
				setFollowings(followedUsers);
			})
			.catch((error) => console.log(error));
	};
	const { Text } = Typography;

	function handleFollow(user) {
		const dataobj = {
			follower_id: currentUser.id,
			followed_user_id: user.id,
		};

		fetch('/follows', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(dataobj),
		})
			.then((r) => r.json())
			.then((users) => {
				setUsers(users);
				stateReset();
			})
			.catch((error) => console.log(error));
	}

	const handleUnFollow = (follow) => {
		fetch(`/follows/${follow}`, {
			method: 'DELETE',
		})
			.then((r) => r.json())
			.then((follows) => {
				stateReset();
			});
	};

	const success = (username) => {
		message.success({
			content: `You have unfollowed ${username}.`,
			className: 'custom-class',
			style: {
				marginTop: '20vh',
			},
		});
	};

	const { RangePicker } = DatePicker;

	// });
	const [startDate, setStartDate] = useState();
	const [endDate, setEndDate] = useState();

	const [range, setRange] = useState();

	const filteredSpottings = spottings.filter((spotting) => {
		let spottingDate = new Date(spotting.date);
		if (range) {
			return spottingDate >= startDate && spottingDate <= endDate;
		}
		return spotting;
	});

	return (
		<>
			{followedLoaded && notfollowedLoaded ? (
				<>
					<Row>
						{/* <Col span={18}>
						<FollowedUsersContainer
							followings={followings}
							handleUnFollow={handleUnFollow}
						/>
					</Col>
					{/* <Col span={6}></Col> */}
						{/* <Col span={6}>
						<UnfollowedUsersContainer
							users={users}
							handleFollow={handleFollow}
						/>
					</Col>{' '} */}
						{/* */}
					</Row>
					<Row>
						<Title level={4}>
							Check out what users are spotting!
						</Title>
					</Row>
					<Row>
						<RangePicker
							value={range}
							disabledDate={(current) => current > moment.now()}
							onChange={(val) => {
								if (val) {
									setRange(val);
									setStartDate(val[0]['_d']);
									setEndDate(val[1]['_d']);
								} else {
									setRange(null);
								}
							}}
						/>
					</Row>
					<Divider></Divider>
					<Row>
						<Col span={17}>
							<FeedMap
								spottings={filteredSpottings}
								handleInfoWindow={handleInfoWindow}
								selectedSpotting={selectedSpotting}
							/>
						</Col>
						<Col span={7}>
							<div
								style={{
									padding: '20px',
									overflowY: 'scroll',
									backgroundColor: '#E7E7E7',
									color: 'white',
									height: '70vh',
									borderRadius: '2px 2px 2px 2px',
								}}
							>
								<Space direction="vertical">
									{filteredSpottings
										.slice(0, 20)
										.map((spotting) => {
											let spottingDate = new Date(
												spotting.date
											).toDateString();
											return (
												<>
													<Card
														style={{
															width: '100%',
														}}
														onClick={() => {
															setSelectedSpotting(
																spotting
															);
														}}
														hoverable={true}
													>
														<Row>
															<Col span={12}>
																<Text
																	style={{
																		textAlign:
																			'left',
																	}}
																>
																	{
																		spotting
																			.bird
																			.common_name
																	}
																</Text>
																<Text>
																	Seen by:{' '}
																	{
																		spotting
																			.user
																			.username
																	}
																</Text>
																{/* <Row> */}
																{/* </Row> */}
															</Col>
															<Col span={12}>
																{spottingDate}
															</Col>
														</Row>
													</Card>
												</>
											);
										})}
								</Space>
							</div>
						</Col>
					</Row>
				</>
			) : (
				<Spin size="large" />
			)}
		</>
	);
};

export default FeedContainer;
