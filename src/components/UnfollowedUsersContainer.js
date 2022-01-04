import { Card, Avatar, Space } from 'antd';
import UnfollowedFeedCard from './UnfollowedFeedCard';
const randomAvatar =
	'https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png';

const { Meta } = Card;

const UnfollowedUsersContainer = ({ users, handleFollow }) => {
	const renderUserCards = users.map((user) => {
		return (
			<UnfollowedFeedCard
				key={user.id}
				user={user}
				avatar={randomAvatar}
				handleFollow={handleFollow}
			/>
		);
	});
	return (
		<>
			<h1>Unfollowed Users</h1>

			<Card
				style={{
					maxHeight: '75vh',
					overflowY: 'scroll',
					backgroundColor: '#D3D3D3',
					paddingTop: '20px',
					paddingBottom: '20px',
				}}
			>
				<Space size="large" direction="vertical">
					{renderUserCards}
				</Space>
			</Card>
		</>
	);
};

export default UnfollowedUsersContainer;
