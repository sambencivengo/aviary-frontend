import { Marker, InfoWindow } from '@react-google-maps/api';
import { StrictMode, useState } from 'react';

const AviaryMarker = ({ spotting, isSelected, onClick, onCloseClick }) => {
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
		<Marker
			key={spotting.id}
			onClick={() => onClick(spotting)}
			position={location}
		>
			{spotting && isSelected ? (
				<InfoWindow onCloseClick={() => onCloseClick()}>
					<div>
						<h3>{spotting.bird.common_name}</h3>
						<img
							style={{ maxWidth: '40vh' }}
							src={spotting.bird.image}
						/>
						{/* <p>{spotting}</p> */}
					</div>
				</InfoWindow>
			) : null}
		</Marker>
	);
};

export default AviaryMarker;
