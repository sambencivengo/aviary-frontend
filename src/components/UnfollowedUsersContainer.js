import { Card, Avatar } from 'antd';
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
			{renderUserCards}
		</>
	);
};

export default UnfollowedUsersContainer;
