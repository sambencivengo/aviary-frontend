import { Col, Row } from 'antd';
import { useEffect, useState } from 'react';

import FollowedFeed from './FollowedFeed';
import UnfollowedFeed from './UnfollowedFeed';

const Feed = ({ currentUser }) => {
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

	// RENDER 2 ROWS... FOLLOWED USERS AND OTHERS?
	return (
		<>
			<Row>
				<Col span={12}>
					<FollowedFeed followedUsers={followedUsers} />
				</Col>
				<Col span={12}>
					<UnfollowedFeed users={users} handleFollow={handleFollow} />
				</Col>
			</Row>
		</>
	);
};

export default Feed;
