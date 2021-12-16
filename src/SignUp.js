import { useState } from 'react';

const SignUp = ({ handleLogIn }) => {
	const [formData, setFormdata] = useState({
		email: '',
		username: '',
		password: '',
		password_confirmation: '',
	});

	const handleChange = (e) => {
		console.log(e.target.name, ':', e.target.value);
		setFormdata({ ...formData, [e.target.name]: e.target.value });
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		fetch('http://localhost:3000/signup', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(formData),
		})
			.then((r) => r.json())
			.then((data) => {
				console.log(data);
				handleLogIn();
			});
	};

	return (
		<>
			<form>
				<input
					onChange={handleChange}
					name="email"
					placeholder="email"
				></input>{' '}
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
				<input
					onChange={handleChange}
					name="password_confirmation"
					placeholder="password confirmation"
				></input>
				<button onClick={handleSubmit}>Submit</button>
			</form>
		</>
	);
};

export default SignUp;
