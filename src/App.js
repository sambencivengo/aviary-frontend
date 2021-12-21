import './App.css';
import { useEffect, useState } from 'react';
import Home from './components/Home';
import Login from './components/Login';
import { Col, Row, Typography } from 'antd';
import { Button, Layout, Menu, Breadcrumb } from 'antd';
import Text from 'antd/lib/typography/Text';
import {
	DashOutlined,
	FileOutlined,
	TeamOutlined,
	HomeOutlined,
} from '@ant-design/icons';
const { Header, Footer, Sider, Content } = Layout;

const { SubMenu } = Menu;

function App() {
	const [loggedIn, setLoggedIn] = useState(false);
	const [currentUser, setCurrentUser] = useState({});
	const [collapsed, setCollapsed] = useState(false);

	function onCollapse() {
		setCollapsed(!collapsed);
	}

	const { Title } = Typography;

	useEffect(() => {
		fetch('/me')
			.then((r) => r.json())
			.then((data) => {
				setCurrentUser(data);
				if (data.id !== null) {
					setLoggedIn(true);
				} else {
					setLoggedIn(false);
				}
			})
			.catch((error) => console.log(error, 'error'));
	}, []);

	const handleLogIn = (formData) => {
		fetch('/login', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(formData),
		})
			.then((r) => r.json())
			.then((data) => {
				if (data.username === undefined) {
					setLoggedIn(false);
				} else {
					setCurrentUser(data);
					setLoggedIn(true);
				}
			});
	};

	const handleLogOut = () => {
		fetch('/logout', { method: 'DELETE' })
			.then((r) => r.json())
			.catch((error) => {
				setLoggedIn(false);
				console.log(error);
			});
	};

	// console.log('Are you logged in?', loggedIn);

	return (
		// <div className="App">
		// 	<Layout>
		// 		{loggedIn ? (
		// 			<Sider className="sider">
		// 				<Button
		// 					type="primary"
		// 					htmlType="submit"
		// 					className="login-form-button"
		// 					onClick={handleLogOut}
		// 				>
		// 					Log out
		// 				</Button>{' '}
		// 				<Button
		// 					type="primary"
		// 					htmlType="submit"
		// 					className="login-form-button"
		// 					onClick={handleLogOut}
		// 				>
		// 					Log out
		// 				</Button>{' '}
		// 				<Button
		// 					type="primary"
		// 					htmlType="submit"
		// 					className="login-form-button"
		// 					onClick={handleLogOut}
		// 				>
		// 					Log out
		// 				</Button>
		// 			</Sider>
		// 		) : null}
		// 		<Layout>
		// 			<Header className="header">
		// 				<Title style={{ color: 'white', fontSize: '50px' }}>
		// 					Aviary
		// 				</Title>{' '}
		// 			</Header>
		// 			<Content className="mainContent">
		// 				{loggedIn ? (
		// 					<Home currentUser={currentUser} />
		// 				) : (
		// 					<Login handleLogIn={handleLogIn} />
		// 				)}
		// 			</Content>
		//
		// 		</Layout>
		// 	</Layout>
		// </div>

		<Layout style={{ minHeight: '100vh' }}>
			{loggedIn ? (
				<Sider
					collapsible
					collapsed={collapsed}
					onCollapse={onCollapse}
				>
					<div className="logo" />
					<Menu
						theme="dark"
						defaultSelectedKeys={['1']}
						mode="inline"
					>
						<Menu.Item key="1" icon={<HomeOutlined />}>
							Home
						</Menu.Item>
						<Menu.Item key="2" icon={<TeamOutlined />}>
							Feed
						</Menu.Item>
						<SubMenu
							key="sub1"
							icon={<DashOutlined />}
							title="Account"
						>
							<Menu.Item
								onClick={() => {
									handleLogOut();
								}}
								key="3"
							>
								Log Out
							</Menu.Item>
						</SubMenu>
					</Menu>
				</Sider>
			) : null}
			<Layout className="site-layout">
				<Header
					className="site-layout-background"
					style={{ padding: 0, textAlign: 'center' }}
				>
					<Title style={{ color: 'white', fontSize: '50px' }}>
						Aviary{' '}
					</Title>{' '}
				</Header>
				<Content style={{ margin: '0 16px' }}>
					{loggedIn ? (
						<Home currentUser={currentUser} />
					) : (
						<Row
							type="flex"
							justify="center"
							align="middle"
							style={{ minHeight: '80vh' }}
						>
							{' '}
							<Col>
								<div
									style={{
										display: 'inline-flex',
										justifyContent: 'center',
										alignItems: 'center',
									}}
								>
									<Login handleLogIn={handleLogIn} />
								</div>
							</Col>
						</Row>
					)}
				</Content>
				<Footer style={{ textAlign: 'center' }} className="footer">
					<Text italic>
						Regular birdwatching is required to lead a healthy and
						fulfilling life.{' '}
					</Text>
				</Footer>
			</Layout>
		</Layout>
	);
}

export default App;
