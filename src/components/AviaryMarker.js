import { Marker } from '@react-google-maps/api';
import { useState } from 'react';

const AviaryMarker = ({ spotting }) => {
	const [showInfoWindow, setShowInfoWindow] = useState(false);

	console.log(spotting);
	// return (
	// 	<Marker
	// 		key={spotting.id}
	// 		onClick={() => {
	// 			setShowInfoWindow(!showInfoWindow);
	// 		}}
	// 		position={location}
	// 	>
	// 		{showInfoWindow ? (
	// 			<InfoWindow onClick={() => setShowInfoWindow(false)}>
	// 				<divb>
	// 					<h3>{spotting.bird.common_name}</h3>
	// 					<p>{spotting.notes}</p>
	// 				</divb>
	// 			</InfoWindow>
	// 		) : null}
	// 	</Marker>
	const location = {
		lat: spotting.lat,
		lng: spotting.long,
	};

	return (
		<>
			<Marker key={spotting.id} position={location}></Marker>
		</>
	);
};

export default AviaryMarker;
