import {
	Button,
	Col,
	DatePicker,
	Form,
	Input,
	message,
	Row,
	Select,
	Space,
	Typography,
} from 'antd';
import moment from 'moment';
import Layout, { Content } from 'antd/lib/layout/layout';
import { useContext, useEffect, useState } from 'react';

import MapContainer from './MapContainer';
import { UserContext } from './UserProvider';

const { Title } = Typography;

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
		const success = () => {
			message.success({
				content: 'Good eye! This bird has been added to your aviary.',
				className: 'custom-class',
				style: {
					marginTop: '20vh',
				},
			});
		};
		const errorMessage = () => {
			message.error({
				content:
					'Please make sure you have filled out the required fields and marked the bird on your map!',
				className: 'custom-class',
				style: {
					marginTop: '20vh',
				},
			});
		};
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
				console.log(data);
				if (data.bird) {
					success();
				} else {
					errorMessage();
				}
			})
			.catch((err) => {
				errorMessage();
				console.log(err);
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
	const errorMessage = () => {
		message.error({
			content:
				'Please make sure you have filled out the required fields and marked the bird on your map!',
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

	function disabledDate(current) {
		// Can not select days before today and today
		return current && current > moment().endOf('day');
	}

	const [birdImage, setBirdImage] = useState('/bird3.png');
	const handleBirdPic = () => {
		setBirdImage('/spottingBird3.png');
	};
	const resetBirdPic = () => {
		setBirdImage('/bird3.png');
	};

	return (
		<>
			<Layout>
				<Row>
					<Col span={12}>
						<Title>What did you see?</Title>
						<Form onFinish={handleSubmit} name="spotting-form">
							<img
								src={birdImage}
								style={{ maxWidth: '65vh' }}
								// onMouseOver={(e) =>
								// 	(e.currentTarget.src = '/spottingBird3.png')
								// }
								// onMouseOut={(e) =>
								// 	(e.currentTarget.src = '/bird3.png')
								// }
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
						<Space align="center">
							<Title
								style={{
									textAlign: 'center',
									marginRight: '40px',
								}}
							>
								Where did you see it?
							</Title>
						</Space>
						<div
							id="map"
							style={{ paddingLeft: '20px' }}
							onMouseOver={handleBirdPic}
							onMouseOut={resetBirdPic}
						>
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
