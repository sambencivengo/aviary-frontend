import { Marker, InfoWindow } from '@react-google-maps/api';
import { StrictMode, useState } from 'react';

const AviaryMarker = ({ spotting, cardInfo }) => {
	const [showInfoWindow, setShowInfoWindow] = useState(false);
	console.log(cardInfo);
	console.log(spotting.id);
	console.log(cardInfo === spotting.id);

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
				{spotting.id === cardInfo ? (
					<InfoWindow onClick={() => setShowInfoWindow(false)}>
						<div>
							<h3>{spotting.bird.common_name}</h3>
							<img src={spotting.bird.image} />
							<p>{spotting.notes}</p>
						</div>
					</InfoWindow>
				) : null}
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
