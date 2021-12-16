import MapContainer from './MapContainer';

const Home = ({ handleLogout, currentUser }) => {
	const mapStyles = {
		width: '100%',
		height: '100%',
	};

	const logOut = () => {
		fetch('/logout', { method: 'DELETE' })
			.then((r) => r.json())
			.then(handleLogout())
			.catch((error) => console.log(error));
	};

	return (
		<>
			<h1>Hello, {currentUser.username}!</h1>
			<button onClick={logOut}>Log Out</button>
			<MapContainer />
		</>
	);
};

export default Home;
