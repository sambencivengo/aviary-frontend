import { Button, Form, Input, Select } from 'antd';
import { useEffect, useState } from 'react';

const { Option } = Select;

const EditCardForm = ({ spotting }) => {
	console.log(spotting);
	const [birds, setBirds] = useState([]);
	const [formData, setFormdata] = useState({
		notes: '',
		bird_id: '',
		image: '',
	});

	const handleChange = (e) => {
		console.log(e.target.name, ':', e.target.value);
		setFormdata({ ...formData, [e.target.name]: e.target.value });
	};

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
						defaultValue={
							<Option
								key={spotting.bird.id}
								value={spotting.bird.id}
							>
								{spotting.bird.common_name}{' '}
							</Option>
						}
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
						onChange={handleChange}
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
						onChange={handleChange}
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
