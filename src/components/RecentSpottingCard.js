import { Card, Col, Row } from 'antd';
import Text from 'antd/lib/typography/Text';
import { Typography } from 'antd';

const RecentSpottingCard = ({ spotting, handleSelectedSpotting }) => {
	const { Title } = Typography;
	const { Text } = Typography;

	let spottingDate = new Date(spotting.date).toDateString();

	return (
		// <Card
		// 	style={{
		// 		width: '100%',
		// 	}}
		// 	onClick={() => {
		// 		handleSelectedSpotting(spotting);
		// 	}}
		// 	hoverable={true}
		// >
		// 	<Row>
		// 		<Col span={12}>
		// 			<Text
		// 				style={{
		// 					textAlign: 'left',
		// 				}}
		// 			>
		// 				{spotting.bird.common_name}
		// 			</Text>
		// 			<Text>Seen by: {spotting.user.username}</Text>
		// 			{/* <Row> */}
		// 			{/* </Row> */}
		// 		</Col>
		// 		<Col span={12}>{spottingDate}</Col>
		// 	</Row>
		// </Card>
		<div
			style={{
				width: '40vh',
				backgroundColor: 'white',
				padding: '10px',
				textAlign: 'left',
			}}
		>
			<Col span={12}>
				<Row>
					<Text>{spotting.bird.common_name}</Text>
				</Row>
				<Text>Seen by: {spotting.user.username}</Text>
				<Row>
					<Text>{spottingDate}</Text>
				</Row>
			</Col>
			<Col></Col>
		</div>
	);
};

export default RecentSpottingCard;
