import { Card, Divider } from 'antd';
import { DeleteTwoTone } from '@ant-design/icons';
import { Typography } from 'antd';
const { Meta } = Card;

const SpottingCard = ({
	spotting,
	showInfo,
	editMode,
	onClick,
	handleDelete,
}) => {
	console.log(spotting.date);
	const date = spotting.date;
	const legibleDate = new Date(date).toDateString();
	console.log(legibleDate);
	const { Text } = Typography;
	return (
		<>
			<div style={{ paddingLeft: '10px', paddingRight: '10px' }}>
				<Meta />
				<Card
					onClick={() => onClick(spotting)}
					// title={spotting.bird.common_name}
					description={spotting.bird.sci_name}
					actions={
						editMode
							? [
									// <EditOutlined
									// 	onClick={() => {
									// 		displayEditForm(spotting);
									// 	}}
									// 	key={spotting.id + 1000}
									// />,
									<DeleteTwoTone
										key={spotting.id}
										twoToneColor="#EE4B2B"
										onClick={() => {
											handleDelete(spotting);
										}}
									/>,
							  ]
							: null
					}
					hoverable
					style={{ width: 240 }}
					cover={<img alt="example" src={spotting.bird.image} />}
				>
					<h3>{spotting.bird.common_name}</h3>
					<Divider></Divider>
					<p style={{ textAlign: 'left' }}>{spotting.notes}</p>
					<p style={{ fontStyle: 'italic', textAlign: 'left' }}>
						Date seen: {legibleDate}
					</p>
				</Card>
			</div>
		</>
	);
};

export default SpottingCard;
