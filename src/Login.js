import { useState } from 'react';
import { Link } from 'react-router-dom';

const Login = ({ handleLogIn }) => {
	const [formData, setFormData] = useState({
		username: '',
		password: '',
	});

	const handleChange = (e) => {
		console.log(e.target.name, ':', e.target.value);
		setFormData({ ...formData, [e.target.name]: e.target.value });
	};

	const logIn = (e) => {
		e.preventDefault();
		handleLogIn(formData);
	};

	return (
		<>
			<form onSubmit={logIn}>
				<input
					onChange={handleChange}
					name="username"
					placeholder="username"
				></input>{' '}
				<input
					onChange={handleChange}
					name="password"
					placeholder="password"
				></input>{' '}
				<button>Submit</button>
			</form>
			<Link to="/signup">Don't have an account? Sign up!</Link>
		</>
	);
};

export default Login;
