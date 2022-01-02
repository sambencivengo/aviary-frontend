import { Button } from 'antd';
import { Link, Outlet } from 'react-router-dom';

const UserAviaryContainer = () => {
	return (
		<>
			<Button>
				<Link to={'/feed'}>Back to Feed</Link>
			</Button>
			<h2>Aviary Containter</h2>
			<Outlet />
		</>
	);
};

export default UserAviaryContainer;
