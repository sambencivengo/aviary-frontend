import { Button, Card, Col, Row } from 'antd';
import Text from 'antd/lib/typography/Text';
import { Typography } from 'antd';
import {
	EditOutlined,
	EllipsisOutlined,
	SettingOutlined,
} from '@ant-design/icons';

const RecentSpottingCard = ({
	spotting,
	handleSelectedSpotting,
	openDrawer,
}) => {
	const { Title } = Typography;
	const { Text } = Typography;
	const { Link } = Typography;

	let spottingDate = new Date(spotting.date).toLocaleDateString('en-US', {
		weekday: 'long',
		year: 'numeric',
		month: 'long',
		day: 'numeric',
	});

	return (
		<Card
			style={{
				width: '100%',
			}}
			hoverable={true}
			actions={[
				<Button
					style={{ alignItems: 'center' }}
					type="link"
					onClick={() => {
						handleSelectedSpotting(spotting);
					}}
				>
					Locate
				</Button>,

				<Button
					style={{ alignItems: 'center' }}
					type="link"
					onClick={() => openDrawer(spotting)}
				>
					View Profile
				</Button>,
			]}
		>
			<Row>
				<Col span={12}>
					<Text
						style={{
							textAlign: 'left',
						}}
					>
						{spotting.bird.common_name}
					</Text>{' '}
					{/* <Row> */}
					{/* </Row> */}
				</Col>
				<Text>Seen by: {spotting.user.username}</Text>
				<Col span={12}> </Col>
			</Row>
			<Row>
				<p style={{ fontSize: '10px' }}>{spottingDate}</p>
			</Row>
		</Card>
		// <div
		// 	style={{
		// 		width: '40vh',
		// 		backgroundColor: 'white',
		// 		padding: '10px',
		// 		textAlign: 'left',
		// 		height: '120px',
		// 	}}
		// >
		// 	<Row>
		// 		<Col span={12}>
		// 			<Row>
		// 				<Link
		// 					onClick={() => {
		// 						handleSelectedSpotting(spotting);
		// 					}}
		// 				>
		// 					{spotting.bird.common_name}
		// 				</Link>
		// 			</Row>
		// 			<Text>Seen by: {spotting.user.username}</Text>
		// 			<Row>
		// 				<Text>{spottingDate}</Text>
		// 			</Row>
		// 		</Col>
		// 		<Col span={12}>
		// 			<Button
		// 				style={{ alignItems: 'center' }}
		// 				type="link"
		// 				onClick={() => openDrawer(spotting)}
		// 			>
		// 				View Profile
		// 			</Button>
		// 		</Col>
		// 	</Row>
		// </div>
	);
};

export default RecentSpottingCard;
