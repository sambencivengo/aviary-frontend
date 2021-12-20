import { Button, Card } from 'antd';
import { useEffect } from 'react';
const { Meta } = Card;

const SpottingCard = ({ bird, currentUser }) => {
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
				<Button>Edit</Button>
			</Card>
			,
		</>
	);
};

export default SpottingCard;
