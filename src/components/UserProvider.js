import { createContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export const UserContext = createContext({
	logout: () => {},
	login: () => {},
	currentUser: null,
});

const UserProvider = ({ children }) => {
	const [currentUser, setCurrentUser] = useState(null);
	const navigate = useNavigate();

	useEffect(() => {
		fetch('/me').then((r) =>
			r
				.json()
				.then((user) => {
					if (user.username !== undefined) {
						setCurrentUser(user);
					}
				})
				.catch((error) => {
					navigate('/login');
					console.log(error);
				})
		);
	}, []);

	const login = (formData) => {
		fetch('/login', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(formData),
		})
			.then((r) => r.json())
			.then((user) => {
				setCurrentUser(user);
				navigate('/home');
			})
			.catch((error) => console.log(error));
	};

	const logout = () => {
		fetch('/logout', { method: 'DELETE' })
			.then((r) => r.json())
			.catch((error) => {
				navigate('/login');
			});
	};

	return (
		<UserContext.Provider value={{ login, logout, currentUser }}>
			{children}
		</UserContext.Provider>
	);
};

export default UserProvider;
