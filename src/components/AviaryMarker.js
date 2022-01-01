import { Marker, InfoWindow } from '@react-google-maps/api';
import { StrictMode, useState } from 'react';

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
	const showInfo = () => {
		console.log('test');
	};
	return (
		<>
			{/* <Marker key={spotting.id} position={location}></Marker> */}
			<Marker
				key={spotting.id}
				onClick={() => {
					setShowInfoWindow(!showInfoWindow);
					showInfoWindow &&
						setTimeout(setShowInfoWindow(false), 5000);
				}}
				position={location}
			>
				{showInfoWindow ? (
					<InfoWindow onClick={() => setShowInfoWindow(false)}>
						<div>
							<h3>{spotting.bird.common_name}</h3>
							<img src={spotting.bird.image} />
							<p>{spotting.notes}</p>
						</div>
					</InfoWindow>
				) : null}
			</Marker>
		</>
	);
};

export default AviaryMarker;
