import FollowedFeedCard from './FollowedFeedCard';
import { Card, Avatar } from 'antd';
const randomAvatar =
	'https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png';

const FollowedUsersContainer = ({ followings, handleUnFollow }) => {
	console.log(followings);
	const renderUserCards = followings.map((followedUser) => {
		return (
			<FollowedFeedCard
				key={followedUser.id}
				follow={followedUser}
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
