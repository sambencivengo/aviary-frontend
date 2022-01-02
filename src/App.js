import './App.css';
import { createContext, useEffect, useState } from 'react';
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
import { Link, Outlet, useNavigate } from 'react-router-dom';

const { Header, Footer, Sider, Content } = Layout;

const { SubMenu } = Menu;

function App() {
	const navigate = useNavigate();

	const [currentUser, setCurrentUser] = useState({});

	const { Title } = Typography;

	useEffect(() => {
		fetch('/me')
			.then((r) => r.json())
			.then((data) => {
				if (data.username !== undefined) {
					console.log(data.username);
				} else {
					navigate('/login');
				}
			})
			.catch((error) => {
				console.log(error);

				navigate('/login');
			});
	}, []);

	const userContext = createContext(currentUser);

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
				} else {
					setCurrentUser(data);
				}
			})
			.catch((error) => console.log(error));
	};

	const handleLogOut = () => {
		fetch('/logout', { method: 'DELETE' })
			.then((r) => r.json())
			.catch((error) => {
				navigate('/login');
			});
	};

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
