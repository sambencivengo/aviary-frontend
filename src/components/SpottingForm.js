import { Button, Col, Form, Input, message, Row, Select } from 'antd';
import Layout, { Content } from 'antd/lib/layout/layout';
import { useEffect, useState } from 'react';

import MapContainer from './MapContainer';

const SpottingForm = ({ currentUser }) => {
	const [marker, setMarker] = useState({});

	const { Option } = Select;
	const [birds, setBirds] = useState([]);
	// const [formData, setFormdata] = useState({
	// 	notes: '',
	// 	user_id: currentUser.id,
	// 	bird_id: '',
	// 	image: '',
	// 	lat: '',
	// 	long: '',
	// });
	// REFACTOR WHEN YOU CAN! EXTREMELY NOT DRY
	const [bird_id, setBird_Id] = useState('');
	const user_id = currentUser.id;
	const [image, setImage] = useState('');
	const [lat, setLat] = useState('');
	const [long, setLong] = useState('');
	const [notes, setNotes] = useState('');
	//
	console.log(bird_id, notes);

	// fetch and render Option components for each bird?

	// const handleChange = (e) => {
	// 	console.log(e.target.name, ':', e.target.value);
	// 	setFormdata({ ...formData, [e.target.name]: e.target.value });
	// };
	const handleSubmit = () => {
		fetch('/spottings', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({ bird_id, user_id, notes, image, lat, long }),
		})
			.then((r) => r.json())
			.then((data) => {
				console.log(data);
				success();
			});
	};

	const handleMarkerState = (location) => {
		setLat(location.location.lat);
		setLong(location.location.lng);
	};
	console.log(lat, long);

	const success = () => {
		message.success({
			content: 'Good eye! This bird has been added to your aviary.',
			className: 'custom-class',
			style: {
				marginTop: '20vh',
			},
		});
	};

	// filter the bird array live, when selecting the bird,
	// the id is also grabbed? Then it is simply posted to the backend
	// OR
	// We have to submit, run a fetch which the bird is chosem,
	// create a route that searches for the bird via params,
	// then sets that bird id.

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

	//

	return (
		<>
			<Layout>
				<Row>
					<Col span={12}>
						<h3>What did you see?</h3>
						<Form onFinish={handleSubmit} name="spotting-form">
							<Form.Item>
								<Select
									onChange={(value) => {
										setBird_Id(value);
									}}
									showSearch
									style={{ width: 300 }}
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
											.localeCompare(
												optionB.children.toLowerCase()
											)
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
									style={{ width: 300 }}
									name="notes"
									// prefix={
									// 	<SmallDashOutlined className="site-form-item-icon" />
									// }
									placeholder="Field notes"
									onChange={(e) => {
										setNotes(e.target.value);
									}}
								/>
							</Form.Item>
							{/* <Form.Item
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
										setImage(e.target.value);
									}}
								/>
							</Form.Item> */}

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
					</Col>

					<Col span={12}>
						{' '}
						<h3>Where did you see it?</h3>
						<div id="map">
							<MapContainer
								handleMarkerState={handleMarkerState}
							/>
						</div>{' '}
					</Col>
				</Row>
				<Content style={{ margin: '0 16px' }}>
					{/* <Wrapper googleMapsApiKey={process.env.REACT_APP_API_KEY}>
				<Map />
			</Wrapper> */}
				</Content>
			</Layout>
		</>
	);
};

export default SpottingForm;
