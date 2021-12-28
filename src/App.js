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
import {
	Link,
	Navigate,
	Outlet,
	Route,
	Routes,
	useNavigate,
} from 'react-router-dom';
import SpottingsContainer from './components/SpottingsContainer';

const { Header, Footer, Sider, Content } = Layout;

const { SubMenu } = Menu;

function App() {
	const navigate = useNavigate();
	const antIcon = <LoadingOutlined style={{ fontSize: 40 }} spin />;
	const [theme, setTheme] = useState('light');
	const [loggedIn, setLoggedIn] = useState(false);
	const [currentUser, setCurrentUser] = useState({});
	const [collapsed, setCollapsed] = useState(false);
	const [renderSignUp, setRenderSignUp] = useState(false);
	const [renderFeed, setRenderFeed] = useState(false);

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
	console.log('x');
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
						<Menu.Item key="2" icon={<DatabaseOutlined />}>
							<Link to="/myaviary">My Aviary</Link>
						</Menu.Item>
						<Menu.Item key="3" icon={<PlusCircleOutlined />}>
							<Link to="/spotabird">Spotting</Link>
						</Menu.Item>
						<Menu.Item key="4" icon={<TeamOutlined />}>
							<Link to="/feed">Feed</Link>
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
							<Outlet />
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
