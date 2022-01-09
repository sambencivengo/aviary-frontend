import {
	Card,
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
import Sider, { SiderContext } from 'antd/lib/layout/Sider';
import Title from 'antd/lib/typography/Title';
import moment from 'moment';
import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
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

	const filteredSpottings = spottings.filter((spotting) => {
		let spottingDate = new Date(spotting.date);
		if (range) {
			return spottingDate >= startDate && spottingDate <= endDate;
		}
		return spotting;
	});

	const handleSelectedSpotting = (spotting) => {
		setSelectedSpotting(spotting);
	};

	useEffect(() => {});
	const [drawerSpotting, setDrawerSpotting] = useState(null);

	function openDrawer(spotting) {
		setDrawerVisible(true);
		setDrawerSpotting(spotting);
	}
	function closeDrawer() {
		setDrawerSpotting(null);
		setDrawerVisible(false);
	}
	return (
		<>
			{followedLoaded && notfollowedLoaded ? (
				<>
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
							<RecentSpottingsContainer
								openDrawer={openDrawer}
								filteredSpottings={filteredSpottings}
								handleSelectedSpotting={handleSelectedSpotting}
							/>
						</Col>
					</Row>
					<Drawer
						placement="right"
						onClose={closeDrawer}
						visible={drawerVisible}
						destroyOnClose={true}
					>
						{drawerSpotting && (
							<>
								<Title level={3}>
									{drawerSpotting.user.username
										.charAt(0)
										.toUpperCase() +
										drawerSpotting.user.username.slice(1)}
								</Title>
								<p>Some contents...</p>
								<p>Some contents...</p>
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
