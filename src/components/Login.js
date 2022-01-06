import { useContext, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
	Form,
	Input,
	Button,
	Checkbox,
	Typography,
	Space,
	Row,
	Col,
} from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { UserContext } from './UserProvider';
import Title from 'antd/lib/typography/Title';

const Login = () => {
	const { Link } = Typography;
	const navigate = useNavigate();
	const { loggedIn } = useContext(UserContext);
	const { login } = useContext(UserContext);

	const [formData, setFormData] = useState({
		username: '',
		password: '',
	});
	const { currentUser } = useContext(UserContext);

	fetch('/me').then((r) =>
		r.json().then((user) => {
			// if (location.pathname === '/') {
			// 	console.log('empty pathname');
			// 	navigate('/home');
			// }
			if (user.username !== undefined) {
				navigate('/home');
			}
		})
	);
	const handleChange = (e) => {
		console.log(e.target.name, ':', e.target.value);
		setFormData({ ...formData, [e.target.name]: e.target.value });
	};

	return (
		<>
			<Row
				type="flex"
				justify="center"
				align="middle"
				style={{ minHeight: '90vh' }}
			>
				{/* <Space
					direction="horizontal"
					style={{ width: '100%', justifyContent: 'center' }}
				> */}
				<Form
					name="normal_login"
					className="login-form"
					// initialValues={{ remember: true }}
					// onFinish={onFinish}
					// onSubmit={logIn}
				>
					<Form.Item>
						<img
							// className="birdIcon"
							src="/logoBird4.png"
							style={{ maxHeight: '30vh' }}
						/>
					</Form.Item>
					<Form.Item>
						<Title level={3} style={{ textAlign: 'center' }}>
							Welcome to Aviary!
						</Title>
					</Form.Item>
					<Form.Item
						rules={[
							{
								required: true,
								message: 'Please input your Username!',
							},
						]}
					>
						<Input
							name="username"
							prefix={
								<UserOutlined className="site-form-item-icon" />
							}
							placeholder="Username"
							onChange={handleChange}
						/>
					</Form.Item>
					<Form.Item
						rules={[
							{
								required: true,
								message: 'Please input your Password!',
							},
						]}
					>
						<Input
							prefix={
								<LockOutlined className="site-form-item-icon" />
							}
							type="password"
							placeholder="Password"
							onChange={handleChange}
							name="password"
						/>
					</Form.Item>

					{/* <Row type="flex" justify="center" align="middle"> */}
					<Form.Item style={{ textAlign: 'center' }}>
						<Button
							type="primary"
							htmlType="submit"
							className="login-form-button"
							onClick={() => login(formData)}
						>
							Log in
						</Button>{' '}
						Or{' '}
						<Link
							onClick={() => {
								navigate('/signup');
							}}
							target="_blank"
						>
							Sign Up
						</Link>
					</Form.Item>
					{/* </Row> */}
				</Form>
				{/* </Space> */}
			</Row>
		</>
	);
};

export default Login;

// #components-form-demo-normal-login .login-form {
//   max-width: 300px;
// }
// #components-form-demo-normal-login .login-form-forgot {
//   float: right;
// }
// #components-form-demo-normal-login .ant-col-rtl .login-form-forgot {
//   float: left;
// }
// #components-form-demo-normal-login .login-form-button {
//   width: 100%;
// }
