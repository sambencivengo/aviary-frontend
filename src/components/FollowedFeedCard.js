import { Card, Avatar, Typography, Button } from 'antd';
import { UserOutlined, CheckOutlined } from '@ant-design/icons';
import { useState } from 'react';

const { Meta } = Card;

const FollowedFeedCard = ({ user, avatar, handleUnFollow }) => {
	return (
		<>
			<Card
				key={user.id}
				style={{ width: 300 }}
				// cover={
				// 	<img
				// 		alt="example"
				// 		src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
				// 	/>
				// }
				actions={[
					<Button
						onClick={() => {
							handleUnFollow(user);
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
					title={user.username}
					description={`Total Birds Spotted: ${user.spottings.length}`}
				/>
			</Card>
		</>
	);
};

export default FollowedFeedCard;
