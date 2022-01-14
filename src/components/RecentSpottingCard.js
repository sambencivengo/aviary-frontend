import { Button, Card, Col, Row, Space } from 'antd';
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
				minWidth: '40vh',
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
			<Space
				direction="horizontal"
				style={{ width: '100%', justifyContent: 'center' }}
			>
				<Col>
					<Row>
						<Text
							style={{
								textAlign: 'left',
								fontWeight: 500,
							}}
						>
							{spotting.bird.common_name}
						</Text>{' '}
					</Row>
					<Row>
						<Text>Seen by: {spotting.user.username}</Text>
					</Row>
					<Row>
						<p style={{ fontSize: '14px' }}>{spottingDate}</p>
					</Row>
				</Col>
			</Space>
		</Card>
	);
};

export default RecentSpottingCard;
