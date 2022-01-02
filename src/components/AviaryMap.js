import React from 'react';
import { GoogleMap, LoadScript } from '@react-google-maps/api';
import AviaryMarker from './AviaryMarker';

const AviaryMap = ({ spottings, showInfo, cardInfo }) => {
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
		//
		return (
			<AviaryMarker
				cardInfo={cardInfo}
				key={spotting.id}
				spotting={spotting}
			/>
		);
	});

	return (
		<div className="map">
			<div className="map">
				<LoadScript googleMapsApiKey={process.env.REACT_APP_API_KEY}>
					<GoogleMap
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
