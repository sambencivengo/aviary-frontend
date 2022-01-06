import {
	Button,
	Checkbox,
	Col,
	Form,
	Input,
	message,
	Row,
	Space,
	Typography,
} from 'antd';
import Layout, { Header } from 'antd/lib/layout/layout';
import Title from 'antd/lib/typography/Title';
import { useContext } from 'react';

import { useState } from 'react';
import { UserContext } from './UserProvider';
import { useNavigate } from 'react-router-dom';

const SignUp = () => {
	const { Link } = Typography;
	// const { currentUser } = useContext(UserContext);
	const navigate = useNavigate();
	const [formData, setFormdata] = useState({
		email: '',
		username: '',
		password: '',
		password_confirmation: '',
	});

	const handleChange = (e) => {
		setFormdata({ ...formData, [e.target.name]: e.target.value });
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		fetch('/signup', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(formData),
		})
			.then((r) => r.json())
			.then((data) => {
				console.log(data);
				if (data.errors) {
					// navigate('/signup');
					errorMessage(data);
				} else {
					success();
				}
			})
			.catch((error) => console.log(error));
	};

	const success = () => {
		message.success({
			content:
				'Account created! Please head back to the login page and start spotting some birds!',
			className: 'custom-class',
			style: {
				marginTop: '20vh',
			},
		});
	};
	const errorMessage = (data) => {
		message.error({
			content: `${data.errors[0]}`,
			className: 'custom-class',
			style: {
				marginTop: '20vh',
			},
		});
	};

	return (
		<>
			{/* <Space
				direction="horizontal"
				style={{ width: '100%', justifyContent: 'center' }}
			>
				<Layout> */}
			<Row
				type="flex"
				justify="center"
				align="middle"
				style={{ minHeight: '90vh' }}
			>
				<Form
					name="basic"
					labelCol={{ span: 9 }}
					wrapperCol={{ span: 16 }}
					initialValues={{ remember: true }}
					// onFinish={onFinish}

					autoComplete="off"
				>
					<Row type="flex" justify="center" align="middle">
						<Form.Item>
							<img
								style={{ maxHeight: '20vh' }}
								src="/spottingBirdHalf2.png"
							/>
						</Form.Item>
						<Row type="flex" justify="center" align="middle">
							<Form.Item>
								<Title
									level={3}
									style={{ textAlign: 'center' }}
								>
									Signup for Aviary:
								</Title>
							</Form.Item>
						</Row>
					</Row>
					<Form.Item
						label="Username"
						rules={[
							{
								required: true,
								message: 'Please input your username!',
							},
						]}
					>
						<Input onChange={handleChange} name="username" />
					</Form.Item>
					<Form.Item
						label="Email"
						rules={[
							{
								required: true,
								message: 'Please input your email!',
							},
						]}
					>
						<Input onChange={handleChange} name="email" />
					</Form.Item>
					<Form.Item
						label="Password"
						rules={[
							{
								required: true,
								message: 'Please input your password!',
							},
						]}
					>
						<Input.Password
							onChange={handleChange}
							name="password"
						/>
					</Form.Item>
					<Form.Item
						label="Confirm Password"
						rules={[
							{
								required: true,
								message: 'Please Confirm your password!',
							},
						]}
					>
						{' '}
						<Input.Password
							name="password_confirmation"
							onChange={handleChange}
						/>
					</Form.Item>
					{/* <Form.Item
						name="remember"
						valuePropName="checked"
						wrapperCol={{ offset: 8, span: 16 }}
					>
						<Checkbox>Remember me</Checkbox>
					</Form.Item> */}
					<Row type="flex" justify="center" align="middle">
						<Form.Item wrapperCol={{ offset: 8, span: 16 }}>
							<Button
								style={{ marginLeft: '60px' }}
								onClick={handleSubmit}
								type="primary"
								htmlType="submit"
							>
								Submit
							</Button>
						</Form.Item>

						<Form.Item
							style={{ paddingLeft: '60px', textAlign: 'center' }}
						>
							Have an account?{' '}
							<Link
								onClick={() => {
									navigate('/login');
								}}
								target="_blank"
							>
								Log In
							</Link>
						</Form.Item>
					</Row>
				</Form>

				{/* OLD FORM */}
				{/* </Layout>
			</Space> */}
			</Row>
		</>
	);
};

export default SignUp;
