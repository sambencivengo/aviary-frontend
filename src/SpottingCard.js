import { Button, Card } from 'antd';
import { EditOutlined } from '@ant-design/icons';
import { useEffect } from 'react';
const { Meta } = Card;

const SpottingCard = ({ bird, currentUser, editMode, displayEditForm }) => {
	return (
		<>
			<Card
				actions={
					editMode
						? [
								<EditOutlined
									onClick={() => displayEditForm()}
									key="edit"
								/>,
						  ]
						: null
				}
				hoverable
				style={{ width: 240 }}
				cover={<img alt="example" src={bird.bird.image} />}
			>
				<Meta
					title={bird.bird.common_name}
					description={bird.bird.sci_name}
				/>
			</Card>
		</>
	);
};

export default SpottingCard;
