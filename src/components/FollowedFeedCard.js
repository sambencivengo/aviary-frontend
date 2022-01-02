import { Card, Avatar, Typography, Button } from 'antd';
import { UserOutlined, CheckOutlined } from '@ant-design/icons';
import { useEffect, useState } from 'react';

const { Meta } = Card;

const FollowedFeedCard = ({ follow, avatar, handleUnFollow }) => {
	const [user, setUser] = useState('');
	const followedUser = follow.followed_user;
	useEffect(() => {
		fetch(`/users/${followedUser.id}`)
			.then((r) => r.json())
			.then((user) => {
				console.log(user);
				setUser(user);
			});
	}, []);
	return (
		<>
			<Card
				key={follow.id}
				style={{ width: 300 }}
				// cover={
				// 	<img
				// 		alt="example"
				// 		src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
				// 	/>
				// }
				actions={[
					<Button
						key={follow.id}
						onClick={() => {
							handleUnFollow(follow);
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
						View Aviary
					</Typography>,
				]}
			>
				<Meta
					avatar={<Avatar src={avatar} />}
					title={user.username}
					description={`Total Birds Spotted: ${user.spottings.length}`}
				/>
			</Card>
		</>
	);
};

export default FollowedFeedCard;
