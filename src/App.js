import './App.css';
import { useEffect, useState } from 'react';
import Home from './components/Home';
import Login from './components/Login';
import { Col, Row, Typography } from 'antd';
import { Button, Layout, Menu, Breadcrumb } from 'antd';
import Text from 'antd/lib/typography/Text';
import {
	DashOutlined,
	PlusCircleOutlined,
	TeamOutlined,
	DatabaseOutlined,
	HomeOutlined,
} from '@ant-design/icons';
import SignUp from './components/SignUp';

const { Header, Footer, Sider, Content } = Layout;

const { SubMenu } = Menu;

function App() {
	const [spottingMode, setSpottingMode] = useState(false);
	const [showAviary, setShowAviary] = useState(true);
	const [loggedIn, setLoggedIn] = useState(false);
	const [currentUser, setCurrentUser] = useState({});
	const [collapsed, setCollapsed] = useState(false);
	const [renderSignUp, setRenderSignUp] = useState(false);

	function onCollapse() {
		setCollapsed(!collapsed);
	}

	const handleSignUpRender = () => {
		setRenderSignUp(!renderSignUp);
	};

	const { Title } = Typography;

	useEffect(() => {
		fetch('/me')
			.then((r) => r.json())
			.then((data) => {
				if (data) {
					setCurrentUser(data);
					setLoggedIn(true);
				}
			})
			.catch((error) => {
				console.log(error);
				setLoggedIn(false);
			});
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
			})
			.catch((error) => console.log(error));
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
			<Header
				className="site-layout-background"
				style={{ padding: 0, textAlign: 'center' }}
			>
				<Title style={{ color: 'white', fontSize: '50px' }}>
					Aviary{' '}
				</Title>{' '}
			</Header>
			<Layout>
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
							{/* <Menu.Item key="1" icon={<HomeOutlined />}>
								Home
							</Menu.Item> */}
							<Menu.Item
								key="2"
								icon={<DatabaseOutlined />}
								onClick={() => {
									setShowAviary(true);
									setSpottingMode(false);
								}}
							>
								My Aviary
							</Menu.Item>
							<Menu.Item
								key="3"
								icon={<PlusCircleOutlined />}
								onClick={() => {
									setSpottingMode(true);
									setShowAviary(false);
								}}
							>
								Spot a bird
							</Menu.Item>
							<Menu.Item key="4" icon={<TeamOutlined />}>
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
									key="5"
								>
									Log Out
								</Menu.Item>
							</SubMenu>
						</Menu>
					</Sider>
				) : null}

				<Content style={{ margin: '0 16px' }}>
					{loggedIn ? (
						<Home
							currentUser={currentUser}
							spottingMode={spottingMode}
							showAviary={showAviary}
						/>
					) : (
						<Row
							type="flex"
							justify="center"
							align="middle"
							style={{ minHeight: '80vh' }}
						>
							{' '}
							<Col>
								{/* <div
									style={{
										display: 'inline-flex',
										justifyContent: 'center',
										alignItems: 'center',
									}}
								> */}
								<Login
									handleLogIn={handleLogIn}
									handleSignUpRender={handleSignUpRender}
								/>
								{/* </div> */}
							</Col>
						</Row>
					)}
				</Content>
			</Layout>
			<Footer style={{ textAlign: 'center' }} className="footer">
				<Text italic>
					Regular birdwatching is necessary to lead a healthy and
					fulfilling life.{' '}
				</Text>
			</Footer>
		</Layout>
	);
}

export default App;
