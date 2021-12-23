import { useEffect, useState } from 'react';
import { Card, Avatar } from 'antd';

import FeedCard from './FeedCard';

const { Meta } = Card;
const randomAvatar =
	'https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png';
const Feed = ({ currentUser }) => {
	const [users, setUsers] = useState([]);
	useEffect(() => {
		fetch('/feed')
			.then((r) => r.json())
			.then((users) => {
				// console.log(users);
				setUsers(users);
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
				console.log()
				setUsers(users);
			})
			.catch((error) => console.log(error));
	}

	const renderUserCards = users.map((user) => {
		return (
			<FeedCard
				key={user.id}
				user={user}
				avatar={randomAvatar}
				handleFollow={handleFollow}
			/>
		);
	});
	return <>{renderUserCards}</>;
};

export default Feed;
