import FollowedFeedCard from './FollowedFeedCard';
import { Card, Avatar } from 'antd';
const randomAvatar =
	'https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png';

const FollowedUsersContainer = ({ followings, handleUnFollow }) => {
	const renderUserCards = followings.map((follow) => {
		return (
			<FollowedFeedCard
				key={follow.id}
				follow={follow}
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
