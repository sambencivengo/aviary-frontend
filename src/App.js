import './App.css';
import { createContext, useContext, useEffect, useState } from 'react';
import { Switch, Typography } from 'antd';
import { Layout, Menu } from 'antd';
import Text from 'antd/lib/typography/Text';
import { LoadingOutlined } from '@ant-design/icons';
import {
	DashOutlined,
	PlusCircleOutlined,
	TeamOutlined,
	DatabaseOutlined,
} from '@ant-design/icons';
import {
	Link,
	Outlet,
	useLocation,
	useNavigate,
	useParams,
} from 'react-router-dom';
import { UserContext } from './components/UserProvider';
import Home from './components/Home';

const { Header, Footer, Sider, Content } = Layout;

const { SubMenu } = Menu;

function App() {
	const location = useLocation();

	const navigate = useNavigate();

	const { logout, currentUser } = useContext(UserContext);

	useEffect(() => {
		fetch('/me').then((r) =>
			r
				.json()
				.then((user) => {
					// if (location.pathname === '/') {
					// 	console.log('empty pathname');
					// 	navigate('/home');
					// }
					if (user.username && location.pathname === '/') {
						navigate('/home');
					} else if (user.username) {
						navigate(location);
					} else {
						navigate('/login');
					}
				})
				.catch((error) => {
					navigate('/login');
					console.log(error);
				})
		);
	}, []);

	const { Title } = Typography;

	return (
		<>
			<Layout style={{ minHeight: '100vh' }}>
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
							<Menu.Item onClick={logout} key="5">
								Log Out
							</Menu.Item>
						</SubMenu>
					</Menu>
				</Sider>

				<Layout
					className="site-layout"
					style={{ marginLeft: 200, minHeight: '100%' }}
				>
					<Content
						style={{ margin: '24px 16px 0', overflow: 'initial' }}
					>
						<div
							className="site-layout-background"
							style={{ padding: 24, textAlign: 'center' }}
						>
							<Outlet />
							{/* <Home /> */}
						</div>
					</Content>
					{/* <Footer style={{ textAlign: 'center' }} className="footer">
						<Text italic>
							Regular birdwatching is necessary to lead a healthy
							and fulfilling life.{' '}
						</Text>
					</Footer> */}
				</Layout>
			</Layout>
		</>
	);
}

export default App;
