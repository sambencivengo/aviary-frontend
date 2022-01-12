import { Affix, Button, Space, Spin } from 'antd';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import SpottingCard from './SpottingCard';
import { EnvironmentOutlined } from '@ant-design/icons';

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

	const [top, setTop] = useState(10);
	const [bottom, setBottom] = useState(10);
	const handleShowMap = () => {
		// setSelectedSpotting(null);
		// setShowMap(!showMap);
		// setEnableCardClick(!enableCardClick);
	};
	return (
		<>
			<h2>{user.username}'s Aviary </h2>
			<p>render other elemtns here</p>
			{loading ? (
				user.spottings.length > 0 ? (
					user.spottings.map((spotting) => {
						console.log(spotting);
						return (
							<>
								<Space key={spotting.id} size={[8, 16]} wrap>
									<> </>
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
