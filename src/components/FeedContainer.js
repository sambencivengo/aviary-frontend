import {
	Button,
	Card,
	Checkbox,
	Col,
	DatePicker,
	Divider,
	Drawer,
	Form,
	Input,
	message,
	Row,
	Space,
	Spin,
	Typography,
} from 'antd';
import Meta from 'antd/lib/card/Meta';
import Sider, { SiderContext } from 'antd/lib/layout/Sider';
import Title from 'antd/lib/typography/Title';
import moment from 'moment';
import { useContext, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import FeedMap from './FeedMap';
import FollowedUsersContainer from './FollowedUsersContainer';
import RecentSpottingsContainer from './RecentSpottingsContainer';

import UnfollowedUsersContainer from './UnfollowedUsersContainer';
import { UserContext } from './UserProvider';

const FeedContainer = () => {
	const [drawerVisible, setDrawerVisible] = useState(false);
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

	const handleSelectedSpotting = (spotting) => {
		setSelectedSpotting(spotting);
	};

	async function getUser(url = '') {
		const response = await fetch(url);
		return response.json();
	}

	const [drawerSpotting, setDrawerSpotting] = useState(null);
	const [drawerUser, setDrawerUser] = useState(null);
	useEffect(() => {
		drawerSpotting &&
			getUser(`/users/${drawerSpotting.user.id}`).then((user) =>
				setDrawerUser(user)
			);
	}, [drawerSpotting]);

	function openDrawer(spotting) {
		setDrawerVisible(true);
		setDrawerSpotting(spotting);
	}
	function closeDrawer() {
		setDrawerSpotting(null);
		setDrawerVisible(false);
	}

	const filteredSpottings = spottings.filter((spotting) => {
		let spottingDate = new Date(spotting.date);
		if (range) {
			return spottingDate >= startDate && spottingDate <= endDate;
		}
		return spotting;
	});

	const [filterUsersSpottings, setFilterUsersSpottings] = useState(false);
	const spottingsMinusUserSpottings = filteredSpottings.filter(
		(spotting) => spotting.user.id !== currentUser.id
	);
	const handleCheckBox = () => {
		setFilterUsersSpottings(!filterUsersSpottings);
	};
	// if (filterUsersSpottings === true) {
	// } else {
	// }

	return (
		<>
			{followedLoaded && notfollowedLoaded ? (
				<>
					<Row>
						<Col span={8}></Col>

						<Col span={8}>
							<Row>
								<Title level={4}>
									Check out what users are spotting!
								</Title>
							</Row>
							<Row>
								<RangePicker
									value={range}
									disabledDate={(current) =>
										current > moment.now()
									}
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
							<Row>
								<div style={{}}>
									<Checkbox onChange={handleCheckBox}>
										Include your spottings
									</Checkbox>
								</div>
							</Row>
						</Col>
						<Col span={8}></Col>
					</Row>
					<Divider></Divider>
					<Row>
						<Col span={17}>
							<FeedMap
								spottings={
									filterUsersSpottings
										? filteredSpottings
										: spottingsMinusUserSpottings
								}
								handleInfoWindow={handleInfoWindow}
								selectedSpotting={selectedSpotting}
							/>
						</Col>
						<Col span={7}>
							<RecentSpottingsContainer
								openDrawer={openDrawer}
								spottings={
									filterUsersSpottings
										? filteredSpottings
										: spottingsMinusUserSpottings
								}
								handleSelectedSpotting={handleSelectedSpotting}
							/>
						</Col>
					</Row>
					<Drawer
						title={
							drawerUser && (
								<Link to={`/aviary/${drawerUser.id}`}>
									View Aviary
								</Link>
							)
						}
						placement="right"
						onClose={closeDrawer}
						visible={drawerVisible}
						destroyOnClose={true}
					>
						{drawerUser && (
							<>
								<Row>
									<Title
										level={2}
										style={{ marginTop: '5px' }}
									>
										{drawerUser.username
											.charAt(0)
											.toUpperCase() +
											drawerUser.username.slice(1)}
									</Title>
								</Row>
								<Text>
									Total number of birds seen:{' '}
									{drawerUser.spottings.length}
								</Text>
								<Title level={4}>Recent spottings:</Title>
								{drawerUser.spottings
									.reverse()
									.splice(0, 3)
									.map((spotting) => {
										return (
											<div
												style={{
													padding: '20px',
												}}
											>
												<Card
													hoverable
													style={{
														width: 240,
													}}
													cover={
														<img
															alt="example"
															src={
																spotting.bird
																	.image
															}
														/>
													}
												>
													<Meta
														title={
															spotting.bird
																.common_name
														}
														// description="www.instagram.com"
													/>
												</Card>
											</div>
										);
									})}
							</>
						)}
					</Drawer>
				</>
			) : (
				<Spin size="large" />
			)}
		</>
	);
};

export default FeedContainer;
