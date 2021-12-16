import './App.css';
import { useEffect, useState } from 'react';
import Home from './Home';
import Login from './Login';
import { Navigate, useNavigate } from 'react-router-dom';

function App() {
	const [loggedIn, setLoggedIn] = useState(false);
	const [currentUser, setCurrentUser] = useState({});

	console.log();
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
				setCurrentUser(data);
				setLoggedIn(true);
			});
	};

	const handleLogout = () => {
		setLoggedIn(false);
	};

	console.log('Are you logged in?', loggedIn);

	return (
		<div className="App">
			{loggedIn ? (
				<Home handleLogout={handleLogout} currentUser={currentUser} />
			) : (
				<Login handleLogIn={handleLogIn} />
			)}
		</div>
	);
}

export default App;
