import FeedCard from './FollowedFeedCard';
import { Card, Avatar } from 'antd';
const randomAvatar =
	'https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png';

const FollowedUsersContainer = ({ followedUsers, handleUnFollow }) => {
	const renderUserCards = followedUsers.map((user) => {
		return (
			<FeedCard
				key={user.id}
				user={user}
				avatar={randomAvatar}
				handleUnFollow={handleUnFollow}
			/>
		);
	});
	return (
		<>
			<h1>Your Followed Users</h1>
			{renderUserCards}
		</>
	);
};

export default FollowedUsersContainer;
