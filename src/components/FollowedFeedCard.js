import { Card, Avatar, Typography, Button } from 'antd';
import { UserOutlined, CheckOutlined } from '@ant-design/icons';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const { Meta } = Card;

const FollowedFeedCard = ({ follow, avatar, handleUnFollow }) => {
	console.log(follow);
	// const [user, setUser] = useState('');
	const user = follow.user_obj;
	console.log(user);

	// useEffect(() => {
	// 	fetch(`/users/${followedUser.id}`)
	// 		.then((r) => r.json())
	// 		.then((user) => {
	// 			console.log(user);
	// 			setUser(user);
	// 		});
	// }, []);
	return (
		<>
			<Card
				key={follow.id}
				style={{ width: 300 }}
				actions={[
					<Button
						key={follow.id}
						onClick={() => {
							handleUnFollow(follow.id);
						}}
						type="primary"
						// shape="round"
						icon={[
							<UserOutlined key={follow.id} />,
							<CheckOutlined key={follow.id * 100} />,
						]}
						size="small"
					>
						{' '}
					</Button>,
					<Typography key={follow.id} style={{ opacity: 0.6 }}>
						<Link
							to={`/aviary/${follow.user_obj.followed_user.id}`}
						>
							View Aviary
						</Link>
					</Typography>,
				]}
			>
				<Meta
					avatar={<Avatar src={avatar} />}
					title={user.followed_user.username}
					description={`Total Birds Spotted: ${user.spottings.length}`}
				/>
			</Card>
		</>
	);
};

export default FollowedFeedCard;
