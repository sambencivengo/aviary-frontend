import { Col, message, Row, Space, Spin } from 'antd';
import Sider from 'antd/lib/layout/Sider';
import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

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
	console.log(currentUser);
	useEffect(() => {
		fetch('/feed')
			.then((r) => r.json())
			.then((users) => {
				// console.log(users);
				setUsers(users);
			})
			.finally(() => setNotFollowedLoaded(true));
		fetch('/followings')
			.then((r) => r.json())
			.then((followedUsers) => {
				// console.log(followedUsers);
				setFollowings(followedUsers);
			})
			.finally(() => setFollowedLoaded(true));
	}, []);

	const stateReset = () => {
		fetch('/feed')
			.then((r) => r.json())
			.then((users) => {
				// console.log(users);
				setUsers(users);
			})
			.catch((error) => console.log(error));
		fetch('/followings')
			.then((r) => r.json())
			.then((followedUsers) => {
				console.log('STATE RESET');
				setFollowings(followedUsers);
			})
			.catch((error) => console.log(error));
	};

	function handleFollow(user) {
		const dataobj = {
			follower_id: currentUser.id,
			followed_user_id: user.id,
		};
		console.log(dataobj);
		fetch('/follows', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(dataobj),
		})
			.then((r) => r.json())
			.then((users) => {
				console.log();
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
				console.log(follows);
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
	// setTimeout(() => {console.log("this is the first message")}, 5000)

	//
	// RENDER 2 ROWS... FOLLOWED USERS AND OTHERS?
	return (
		<>
			{followedLoaded && notfollowedLoaded ? (
				<Row>
					<Col span={18}>
						<FollowedUsersContainer
							followings={followings}
							handleUnFollow={handleUnFollow}
						/>
					</Col>
					{/* <Col span={6}></Col> */}

					<Col span={6}>
						<UnfollowedUsersContainer
							users={users}
							handleFollow={handleFollow}
						/>
					</Col>
				</Row>
			) : (
				<Spin size="large" />
			)}
		</>
	);
};

export default FeedContainer;
