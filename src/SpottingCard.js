import { Card } from 'antd';
const { Meta } = Card;

const SpottingCard = ({ bird }) => {
	return (
		<>
			<Card
				hoverable
				style={{ width: 240 }}
				cover={<img alt="example" src={bird.bird.image} />}
			>
				<Meta
					title={bird.bird.common_name}
					description={bird.bird.sci_name}
				/>
			</Card>
			,
		</>
	);
};

export default SpottingCard;
