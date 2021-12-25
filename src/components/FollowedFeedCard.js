import { Card, Avatar, Typography, Button } from 'antd';
import { UserOutlined, CheckOutlined } from '@ant-design/icons';
import { useState } from 'react';

const { Meta } = Card;

const FollowedFeedCard = ({ follow, avatar, handleUnFollow }) => {
	console.log(follow.followed_user.username);
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
						key={Math.floor(Math.random() * 100000) + 1}
						onClick={() => {
							handleUnFollow(follow);
						}}
						type="primary"
						// shape="round"
						icon={[<UserOutlined />, <CheckOutlined />]}
						size="small"
					>
						{' '}
					</Button>,
					<Typography style={{ opacity: 0.6 }}>
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
