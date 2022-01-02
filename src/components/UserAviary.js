import { Space, Spin } from 'antd';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import SpottingCard from './SpottingCard';

const UserAviary = () => {
	let params = useParams();
	const [loading, setLoading] = useState(false);
	const [user, setUser] = useState({});

	useEffect(() => {
		fetch(`/users/${params.userId}`)
			.then((r) => r.json())
			.then((data) => {
				console.log(data);
				setUser(data);
			})
			.finally(() => setLoading(true));
	}, []);

	return (
		<>
			<h2>{user.username}'s Aviary </h2>
			{loading ? (
				user.spottings.map((spotting) => {
					console.log(spotting);
					return (
						<>
							<Space key={spotting.id} size={[8, 16]} wrap>
								{new Array(1).fill(null).map((_, index) => (
									// eslint-disable-next-line react/no-array-index-key
									<SpottingCard
										// handleCardClick={handleCardClick}
										// handleDelete={handleDelete}
										key={spotting.id}
										spotting={spotting}
										// currentUser={currentUser}
										// editMode={editMode}
										// displayEditForm={displayEditForm}
									/>
								))}
							</Space>
						</>
					);
				})
			) : (
				<Spin size="large" />
			)}
		</>
	);
};

export default UserAviary;
