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
				user.spottings.length > 0 ? (
					user.spottings.map((spotting) => {
						console.log(spotting);
						return (
							<>
								<Space key={spotting.id} size={[8, 16]} wrap>
									<SpottingCard
										// handleCardClick={handleCardClick}
										// handleDelete={handleDelete}
										key={spotting.id}
										spotting={spotting}
										// currentUser={currentUser}
										// editMode={editMode}
										// displayEditForm={displayEditForm}
									/>
								</Space>
							</>
						);
					})
				) : (
					<h1>This user hasn't seen any birds!</h1>
				)
			) : (
				<Spin size="large" />
			)}
		</>
	);
};

export default UserAviary;
