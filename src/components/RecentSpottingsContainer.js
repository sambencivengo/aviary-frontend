import { Space } from 'antd';
import RecentSpottingCard from './RecentSpottingCard';

const RecentSpottingsContainer = ({
	filteredSpottings,
	handleSelectedSpotting,
}) => {
	const renderListOfSpottings = filteredSpottings
		.slice(0, 20)
		.map((spotting) => {
			return (
				<>
					<RecentSpottingCard
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
