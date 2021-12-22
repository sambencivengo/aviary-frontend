import { Button, Checkbox, Form, Input, Row } from 'antd';
import Layout, { Header } from 'antd/lib/layout/layout';
import Title from 'antd/lib/typography/Title';

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const SignUp = ({ handleLogIn }) => {
	const navigate = useNavigate();
	const [formData, setFormdata] = useState({
		email: '',
		username: '',
		password: '',
		password_confirmation: '',
	});

	const handleChange = (e) => {
		console.log(e.target.name, ':', e.target.value);
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
				handleLogIn();
			});
		navigate('/home');
	};

	return (
		<>
			<Layout>
				<Header
					className="site-layout-background"
					style={{ padding: 0, textAlign: 'center' }}
				>
					<Title style={{ color: 'white', fontSize: '50px' }}>
						Aviary
					</Title>{' '}
				</Header>
				{/* NEW FORM */}

				<Row
					type="flex"
					justify="center"
					align="center"
					style={{ minHeight: '80vh' }}
				>
					<Form
						name="basic"
						labelCol={{ span: 8 }}
						wrapperCol={{ span: 16 }}
						initialValues={{ remember: true }}
						// onFinish={onFinish}

						autoComplete="off"
					>
						<Form.Item
							onChange={handleChange}
							label="Username"
							name="username"
							rules={[
								{
									required: true,
									message: 'Please input your username!',
								},
							]}
						>
							<Input />
						</Form.Item>
						<Form.Item
							onChange={handleChange}
							label="Email"
							name="email"
							rules={[
								{
									required: true,
									message: 'Please input your email!',
								},
							]}
						>
							<Input />
						</Form.Item>

						<Form.Item
							onChange={handleChange}
							label="Password"
							name="password"
							rules={[
								{
									required: true,
									message: 'Please input your password!',
								},
							]}
						>
							<Input.Password />
						</Form.Item>
						<Form.Item
							label="Confirm Password"
							name="password_confirmation"
							rules={[
								{
									required: true,
									message: 'Please Confirm your password!',
								},
							]}
						>
							{' '}
							<Input.Password />
						</Form.Item>

						<Form.Item
							onChange={handleChange}
							name="remember"
							valuePropName="checked"
							wrapperCol={{ offset: 8, span: 16 }}
						>
							<Checkbox>Remember me</Checkbox>
						</Form.Item>

						<Form.Item wrapperCol={{ offset: 8, span: 16 }}>
							<Button type="primary" htmlType="submit">
								Submit
							</Button>
						</Form.Item>
						Have an account? 
					</Form>
				</Row>
				{/* OLD FORM */}
				<form>
					<input
						onChange={handleChange}
						name="email"
						placeholder="email"
					></input>{' '}
					<input
						onChange={handleChange}
						name="username"
						placeholder="username"
					></input>{' '}
					<input
						onChange={handleChange}
						name="password"
						placeholder="password"
					></input>{' '}
					<input
						onChange={handleChange}
						name="password_confirmation"
						placeholder="password confirmation"
					></input>
					<button onClick={handleSubmit}>Submit</button>
				</form>
			</Layout>
		</>
	);
};

export default SignUp;
