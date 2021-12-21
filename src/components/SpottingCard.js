import { Button, Card } from 'antd';
import { EditOutlined, DeleteTwoTone } from '@ant-design/icons';
import { useEffect } from 'react';
const { Meta } = Card;

const SpottingCard = ({
	spotting,
	currentUser,
	editMode,
	displayEditForm,
	handleDelete,
}) => {
	console.log(spotting);
	return (
		<>
			<Meta />
			<Card
				title={spotting.bird.common_name}
				description={spotting.bird.sci_name}
				actions={
					editMode
						? [
								<EditOutlined
									onClick={() => {
										console.log(spotting);
										displayEditForm(spotting);
									}}
									key={spotting.id + 1000}
								/>,
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
				<p>{spotting.notes}</p>
			</Card>
		</>
	);
};

export default SpottingCard;
