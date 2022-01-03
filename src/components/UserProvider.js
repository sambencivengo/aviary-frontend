import { createContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export const UserContext = createContext({});

const UserProvider = ({ children }) => {
	const navigate = useNavigate();

	useEffect(() => {
		fetch('/me').then((r) =>
			r
				.json()
				.then((data) => {
					if (data.username !== undefined) {
						console.log(data.username);
						navigate('/home');
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

	return (
		<UserContext.Provider value={{ login }}>
			{children}
		</UserContext.Provider>
	);
};

export default UserProvider;
