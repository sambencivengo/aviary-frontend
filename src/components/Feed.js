import { useEffect, useState } from 'react';
import { Card, Avatar } from 'antd';
import {
	EditOutlined,
	EllipsisOutlined,
	SettingOutlined,
} from '@ant-design/icons';
import FeedCard from './FeedCard';

const { Meta } = Card;
const randomAvatar =
	'https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png';
const Feed = () => {
	const [users, setUsers] = useState([]);
	useEffect(() => {
		fetch('/users')
			.then((r) => r.json())
			.then((users) => setUsers(users));
	}, []);
	console.log(users);

	const renderUserCards = users.map((user) => {
		return <FeedCard key={user.id} user={user} avatar={randomAvatar} />;
	});
	return <>{renderUserCards}</>;
};

export default Feed;
