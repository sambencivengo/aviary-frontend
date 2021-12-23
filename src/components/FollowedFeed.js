import FeedCard from './FeedCard';
import { Card, Avatar } from 'antd';
const randomAvatar =
	'https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png';

const FollowedFeed = ({ followedUsers }) => {
  
	const renderUserCards = followedUsers.map((user) => {
		return (
			<FeedCard
				key={user.id}
				user={user}
				avatar={randomAvatar}
				// handleFollow={handleFollow}
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

export default FollowedFeed;
