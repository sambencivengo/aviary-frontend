import { Button, Col, Form, Input, message, Row, Select } from 'antd';
import { useEffect, useState } from 'react';

const { Option } = Select;

const EditCardForm = () => {
	const [birds, setBirds] = useState([]);
	const [formData, setFormdata] = useState({
		notes: '',
		bird_id: '',
		image: '',
	});

	useEffect(() => {
		fetch('/birds')
			.then((r) => r.json())
			.then((birds) => {
				setBirds(birds);
			});
	}, []);

	const renderOptions = birds.map((birdOption) => {
		return (
			<Option key={birdOption.id} value={birdOption.id}>
				{birdOption.common_name}
			</Option>
		);
	});

	const handleSubmit = () => {};

	return (
		<>
			<h1>Edit Form for specifc cards</h1>
			<Form onFinish={handleSubmit} name="spotting-form">
				<Form.Item>
					<Select
						onChange={(value) => {
							// setBird_Id(value);
						}}
						showSearch
						style={{ width: 600 }}
						placeholder="Search to Select"
						optionFilterProp="children"
						filterOption={(input, option) =>
							option.children
								.toLowerCase()
								.indexOf(input.toLowerCase()) >= 0
						}
						filterSort={(optionA, optionB) =>
							optionA.children
								.toLowerCase()
								.localeCompare(optionB.children.toLowerCase())
						}
					>
						{renderOptions}
					</Select>
				</Form.Item>
				<Form.Item
				// rules={[
				// 	{
				// 		required: true,
				// 		message: 'Please input your Username!',
				// 	},
				// ]}
				>
					<Input
						style={{ width: 600 }}
						name="notes"
						// prefix={
						// 	<SmallDashOutlined className="site-form-item-icon" />
						// }
						placeholder="Field notes"
						onChange={(e) => {
							// setNotes(e.target.value);
						}}
					/>
				</Form.Item>
				<Form.Item
				// rules={[
				// 	{
				// 		required: true,
				// 		message: 'Please input your Username!',
				// 	},
				// ]}
				>
					<Input
						style={{ width: 600 }}
						name="image"
						// prefix={
						// 	<SmallDashOutlined className="site-form-item-icon" />
						// }
						placeholder="Image"
						onChange={(e) => {
							// setImage(e.target.value);
						}}
					/>
				</Form.Item>

				<Form.Item>
					<Button
						type="primary"
						htmlType="submit"
						className="spotting-form-button"
					>
						Submit
					</Button>
				</Form.Item>
			</Form>
		</>
	);
};

export default EditCardForm;
