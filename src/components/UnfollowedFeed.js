import FeedCard from './FeedCard';
import { Card, Avatar } from 'antd';
const randomAvatar =
	'https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png';

const { Meta } = Card;

const UnfollowedFeed = ({ users, handleFollow }) => {
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
	return (
		<>
			<h1>Unfollowed Users</h1>
			{renderUserCards}
		</>
	);
};

export default UnfollowedFeed;
