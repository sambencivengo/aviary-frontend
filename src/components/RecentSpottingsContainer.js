import { Space } from 'antd';
import { useState } from 'react';
import RecentSpottingCard from './RecentSpottingCard';

const RecentSpottingsContainer = ({
	spottings,
	handleSelectedSpotting,
	openDrawer,
}) => {
	const [containerSpottings, setContainerSpottings] = useState(spottings);

	const renderListOfSpottings = spottings.slice(0, 10).map((spotting) => {
		return (
			<>
				<RecentSpottingCard
					openDrawer={openDrawer}
					spotting={spotting}
					handleSelectedSpotting={handleSelectedSpotting}
				/>
			</>
		);
	});

	return (
		<>
			{' '}
			<div
				style={{
					padding: '20px',
					overflowY: 'scroll',
					backgroundColor: '#E7E7E7',
					color: 'white',
					height: '70vh',
					borderRadius: '2px 2px 2px 2px',
				}}
			>
				<Space direction="vertical">{renderListOfSpottings}</Space>
			</div>
		</>
	);
};

export default RecentSpottingsContainer;
