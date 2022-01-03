import {
	Button,
	Checkbox,
	Col,
	Form,
	Input,
	Row,
	Space,
	Typography,
} from 'antd';
import Layout, { Header } from 'antd/lib/layout/layout';
import Title from 'antd/lib/typography/Title';

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const SignUp = () => {
	const { Link } = Typography;

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
				if (data !== undefined) {
					navigate('/home');
				}
			})
			.catch((error) => console.log(error));
	};

	return (
		<>
			<Space
				direction="horizontal"
				style={{ width: '100%', justifyContent: 'center' }}
			>
				<Layout>
					<Form
						name="basic"
						labelCol={{ span: 9 }}
						wrapperCol={{ span: 16 }}
						initialValues={{ remember: true }}
						// onFinish={onFinish}

						autoComplete="off"
					>
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
								``,
							]}
						>
							{' '}
							<Input.Password
								name="password_confirmation"
								onChange={handleChange}
							/>
						</Form.Item>
						<Form.Item
							name="remember"
							valuePropName="checked"
							wrapperCol={{ offset: 8, span: 16 }}
						>
							<Checkbox>Remember me</Checkbox>
						</Form.Item>
						<Form.Item wrapperCol={{ offset: 8, span: 16 }}>
							<Button
								onClick={handleSubmit}
								type="primary"
								htmlType="submit"
							>
								Submit
							</Button>
						</Form.Item>
						<Form.Item style={{ textAlign: 'center' }}>
							Have an account?{' '}
							<Link
								style={{ textAlign: 'center' }}
								onClick={() => {
									navigate('/login');
								}}
								target="_blank"
							>
								Log In
							</Link>
						</Form.Item>
					</Form>

					{/* OLD FORM */}
				</Layout>
			</Space>
		</>
	);
};

export default SignUp;
