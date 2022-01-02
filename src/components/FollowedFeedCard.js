import { Card, Avatar, Typography, Button } from 'antd';
import { UserOutlined, CheckOutlined } from '@ant-design/icons';
import { useEffect, useState } from 'react';

const { Meta } = Card;

const FollowedFeedCard = ({ follow, avatar, handleUnFollow }) => {
	const followedUser = follow.followed_user.id;
	console.log(followedUser);
	useEffect(() => {
		fetch(`/users/${followedUser}`)
			.then((r) => r.json())
			.then((data) => console.log(data));
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
					title={follow.followed_user.username}
					// description={`Total Birds Spotted: ${user.spottings.length}`}
				/>
			</Card>
		</>
	);
};

export default FollowedFeedCard;
