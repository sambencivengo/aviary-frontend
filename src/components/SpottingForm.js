import {
	Button,
	Col,
	DatePicker,
	Form,
	Input,
	message,
	Row,
	Select,
} from 'antd';
import moment from 'moment';
import Layout, { Content } from 'antd/lib/layout/layout';
import { useContext, useEffect, useState } from 'react';

import MapContainer from './MapContainer';
import { UserContext } from './UserProvider';

const SpottingForm = () => {
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
	const [birdId, setBirdId] = useState(null);
	const [image, setImage] = useState('');
	const [lat, setLat] = useState('');
	const [long, setLong] = useState('');
	const [notes, setNotes] = useState('');
	const { currentUser } = useContext(UserContext);
	const [date, setDate] = useState('');

	const { RangePicker } = DatePicker;
	const handleSubmit = () => {
		fetch('/spottings', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				bird_id: birdId,
				user_id: currentUser.id,
				notes,
				image,
				lat,
				long,
				date,
			}),
		})
			.then((r) => r.json())
			.then((data) => {
				success();
			});
	};

	const handleMarkerState = (location) => {
		setLat(location.location.lat);
		setLong(location.location.lng);
	};

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

	function handleDateChange(date, dateString) {
		console.log(date, dateString);
		setDate(dateString);
	}

	console.log(date);

	function disabledDate(current) {
		// Can not select days before today and today
		return current && current > moment().endOf('day');
	}

	return (
		<>
			<Layout>
				<Row>
					<Col span={12}>
						<h3>What did you see?</h3>
						<Form onFinish={handleSubmit} name="spotting-form">
							<img
								src="/spottingBird3.png"
								style={{ maxWidth: '65vh' }}
							/>

							<Form.Item>
								<Select
									onChange={(value) => {
										setBirdId(value);
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
							<Form.Item onChange={handleDateChange}>
								<DatePicker
									disabledDate={disabledDate}
									onChange={handleDateChange}
									style={{ width: 300 }}
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
									style={{ width: 300 }}
									name="notes"
									// prefix={
									// 	<SmallDashOutlined className="site-form-item-icon" />
									// }
									required
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
