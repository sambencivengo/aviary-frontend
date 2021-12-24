import { Col, Row } from 'antd';
import { useEffect, useState } from 'react';

import FollowedUsersContainer from './FollowedUsersContainer';
import UnfollowedUsersContainer from './UnfollowedUsersContainer';

const FeedContainer = ({ currentUser }) => {
	const [users, setUsers] = useState([]);
	const [followedUsers, setFollowedUsers] = useState([]);
	useEffect(() => {
		fetch('/feed')
			.then((r) => r.json())
			.then((users) => {
				// console.log(users);
				setUsers(users);
			});
		fetch('/followed')
			.then((r) => r.json())
			.then((followedUsers) => {
				console.log(followedUsers);
				setFollowedUsers(followedUsers);
			});
	}, []);

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
			})
			.catch((error) => console.log(error));
	}

	const handleUnFollow = (user) => {
		fetch('/follows', {
			method: 'DELETE',
		})
			.then((r) => r.json())
			.then((data) => console.log(data));
	};

	// RENDER 2 ROWS... FOLLOWED USERS AND OTHERS?
	return (
		<>
			<Row>
				<Col span={12}>
					<FollowedUsersContainer
						followedUsers={followedUsers}
						handleUnFollow={handleUnFollow}
					/>
				</Col>
				<Col span={12}>
					<UnfollowedUsersContainer
						users={users}
						handleFollow={handleFollow}
					/>
				</Col>
			</Row>
		</>
	);
};

export default FeedContainer;
