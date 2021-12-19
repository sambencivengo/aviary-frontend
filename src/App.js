import './App.css';
import { useEffect, useState } from 'react';
import Home from './Home';
import Login from './Login';
import { Typography } from 'antd';
import { Button, Layout } from 'antd';
import Text from 'antd/lib/typography/Text';

const { Header, Footer, Sider, Content } = Layout;

function App() {
	const [loggedIn, setLoggedIn] = useState(false);
	const [currentUser, setCurrentUser] = useState({});

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
		<div className="App">
			<Layout>
				<Sider className="sider">
					{' '}
					{!loggedIn ? null : (
						<Button
							type="primary"
							htmlType="submit"
							className="login-form-button"
							onClick={handleLogOut}
						>
							Log out
						</Button>
					)}
				</Sider>
				<Layout>
					<Header className="header">
						<Title style={{ color: 'white', fontSize: '50px' }}>
							Aviary
						</Title>{' '}
					</Header>
					<Content className="mainContent">
						{loggedIn ? (
							<Home currentUser={currentUser} />
						) : (
							<Login handleLogIn={handleLogIn} />
						)}
					</Content>
					<Footer className="footer">
						<Text italic>
							Regular Birdwatching is required to lead a healthy
							and fulfilling life.
						</Text>
					</Footer>
				</Layout>
			</Layout>
		</div>
	);
}

export default App;
