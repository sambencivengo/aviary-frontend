import { useEffect } from 'react';
import { useParams } from 'react-router-dom';

const UserAviary = () => {
	let params = useParams();
	console.log(params);

	// useEffect(() => {fetch}, []);
	return (
		<>
			<h2>Aviary: {params.userId}</h2>
		</>
	);
};

export default UserAviary;
