import { Affix, Button } from 'antd';
import { useState } from 'react';
import { Link, Outlet } from 'react-router-dom';
import { EnvironmentOutlined } from '@ant-design/icons';

const UserAviaryContainer = () => {
	const [top, setTop] = useState(10);
	const [bottom, setBottom] = useState(10);
	const [showMap, setShowMap] = useState(false);

	return (
		<>
			<Affix offsetTop={top}>
				<Button style={{ float: 'left' }}>
					<Link to={'/feed'}>Back to Feed</Link>
				</Button>
				<Button
					style={{ float: 'right' }}
					type="primary"
					onClick={() => {
						// setShowMap(!showMap);
					}}
				>
					Map <EnvironmentOutlined />
				</Button>
			</Affix>

			<Outlet />
		</>
	);
};

export default UserAviaryContainer;
