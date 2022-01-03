import { useContext, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Form, Input, Button, Checkbox, Typography, Space } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { UserContext } from './UserProvider';

const Login = ({ handleLogIn, handleSignUpRender }) => {
	const { Link } = Typography;
	const navigate = useNavigate();
	const onFinish = () => {
		handleLogIn(formData);
	};
	const { login } = useContext(UserContext);
	console.log(value);

	const [formData, setFormData] = useState({
		username: '',
		password: '',
	});

	const handleChange = (e) => {
		console.log(e.target.name, ':', e.target.value);
		setFormData({ ...formData, [e.target.name]: e.target.value });
	};

	return (
		<>
			<Space
				direction="horizontal"
				style={{ width: '100%', justifyContent: 'center' }}
			>
				<Form
					name="normal_login"
					className="login-form"
					// initialValues={{ remember: true }}
					// onFinish={onFinish}
					// onSubmit={logIn}
				>
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
					<Form.Item>
						<Form.Item
							name="remember"
							valuePropName="checked"
							noStyle
						>
							<Checkbox>Remember me</Checkbox>
						</Form.Item>

						{/* <a className="login-form-forgot" href="">
					Forgot password
				</a> */}
					</Form.Item>

					<Form.Item>
						<Button
							type="primary"
							htmlType="submit"
							className="login-form-button"
							onClick={() => logIn()}
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
				</Form>
			</Space>
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
