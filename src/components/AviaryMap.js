import React, { useState } from 'react';
import {
	GoogleMap,
	LoadScript,
	Marker,
	InfoWindow,
} from '@react-google-maps/api';

const AviaryMap = ({ spottings }) => {
	// const [markers, setMarkers] = useState([]);
	const [showInfoWindow, setShowInfoWindow] = useState(false);

	const mapStyles = {
		height: '70vh',
		width: '70vh',
	};

	const defaultCenter = {
		lat: 40.6602,
		lng: -73.969749,
	};

	const markers = spottings.map((spotting) => {
		console.log(spotting);
		const location = {
			lat: spotting.lat,
			lng: spotting.long,
		};

		return (
			<Marker
				key={spotting.id}
				onClick={() => {
					setShowInfoWindow(true);
				}}
				position={location}
			>
				{showInfoWindow === true && (
					<InfoWindow
						// position={location}
						onClick={() => setShowInfoWindow(false)}
					>
						<divb>
							<h3>{spotting.bird.common_name}</h3>
							<p>{spotting.notes}</p>
						</divb>
					</InfoWindow>
				)}
			</Marker>
		);
	});
	return (
		<div className="map">
			<div className="map">
				<LoadScript googleMapsApiKey={process.env.REACT_APP_API_KEY}>
					<GoogleMap
						// onClick={handleMarkerCreate}
						mapContainerStyle={mapStyles}
						zoom={13}
						center={defaultCenter}
					>
						{markers}

						{/* {locations.map((marker) => {
					return <Marker key={marker.name} position={marker.location} />;
				})} */}
						{/* {renderMarkers} */}

						{/* <Marker key={markers.name} position={markers.location} /> */}
					</GoogleMap>
				</LoadScript>
			</div>
		</div>
	);
};

export default AviaryMap;
