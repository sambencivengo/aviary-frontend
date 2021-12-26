import './App.css';
import { useEffect, useState } from 'react';
import Home from './components/Home';
import Login from './components/Login';
import { Col, Row, Switch, Typography } from 'antd';
import { Button, Layout, Menu, Breadcrumb, Spin } from 'antd';
import Text from 'antd/lib/typography/Text';
import { LoadingOutlined } from '@ant-design/icons';
import {
	DashOutlined,
	PlusCircleOutlined,
	TeamOutlined,
	DatabaseOutlined,
	HomeOutlined,
} from '@ant-design/icons';
import SignUp from './components/SignUp';
import { Navigate, useNavigate } from 'react-router-dom';

const { Header, Footer, Sider, Content } = Layout;

const { SubMenu } = Menu;

function App() {
	const navigate = useNavigate();
	const antIcon = <LoadingOutlined style={{ fontSize: 40 }} spin />;
	const [theme, setTheme] = useState('light');
	const [spottingMode, setSpottingMode] = useState(false);
	const [showAviary, setShowAviary] = useState(true);
	const [loggedIn, setLoggedIn] = useState(false);
	const [currentUser, setCurrentUser] = useState({});
	const [collapsed, setCollapsed] = useState(false);
	const [renderSignUp, setRenderSignUp] = useState(false);
	const [renderFeed, setRenderFeed] = useState(false);

	function onCollapse() {
		setCollapsed(!collapsed);
	}

	const handleSignUpRender = () => {
		setRenderSignUp(!renderSignUp);
	};

	const changeTheme = (value) => {
		setTheme(value ? 'dark' : 'light');
	};

	const { Title } = Typography;

	useEffect(() => {
		fetch('/me')
			.then((r) => r.json())
			.then((data) => {
				if (data) {
					setCurrentUser(data);
					setLoggedIn(true);
				} else {
					navigate('/login');
				}
			})
			.catch((error) => {
				console.log(error);
				setLoggedIn(false);
				navigate('/login');
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
				navigate('/login');
			});
	};

	// console.log('Are you logged in?', loggedIn);

	return (
		<>
			<Layout>
				<Sider
					style={{
						overflow: 'auto',
						height: '100vh',
						position: 'fixed',
						left: 0,
					}}
				>
					<div className="logo" />
					<Header>
						<Title
							style={{
								color: 'white',
								fontSize: '30px',
								paddingTop: '10px',
							}}
						>
							Aviary{' '}
						</Title>{' '}
					</Header>
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
								setRenderFeed(false);
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
								setRenderFeed(false);
							}}
						>
							Spot a bird
						</Menu.Item>
						<Menu.Item
							key="4"
							icon={<TeamOutlined />}
							onClick={() => {
								setRenderFeed(true);
								setShowAviary(false);
								setSpottingMode(false);
							}}
						>
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
						<Switch onChange={changeTheme} /> Change Style
					</Menu>
				</Sider>

				<Layout className="site-layout" style={{ marginLeft: 200 }}>
					<Content
						style={{ margin: '24px 16px 0', overflow: 'initial' }}
					>
						<div
							className="site-layout-background"
							style={{ padding: 24, textAlign: 'center' }}
						>
							<Content style={{ margin: '0 16px' }}>
								<Home
									renderFeed={renderFeed}
									currentUser={currentUser}
									spottingMode={spottingMode}
									showAviary={showAviary}
								/>
							</Content>
						</div>
					</Content>
					<Footer style={{ textAlign: 'center' }} className="footer">
						<Text italic>
							Regular birdwatching is necessary to lead a healthy
							and fulfilling life.{' '}
						</Text>
					</Footer>
				</Layout>
			</Layout>
			,
		</>
	);
}

export default App;
