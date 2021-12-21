import React, { useState } from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';

const MapContainer = ({ handleMarkerState }) => {
	const [marker, setMarker] = useState({});

	const mapStyles = {
		height: '80vh',
		width: '80vh',
	};

	const defaultCenter = {
		lat: 40.6602,
		lng: -73.969749,
	};

	const handleMarkerCreate = (e) => {
		const locationObj = {
			location: { lat: e.latLng.lat(), lng: e.latLng.lng() },
		};

		setMarker(locationObj);
		handleMarkerState(locationObj);
	};

	// const renderMarkers = markerArray.map((marker) => {
	// return <Marker key={marker.name} position={marker.location} />;
	// });

	// RESET CENTER STATE ON CLICK
	return (
		<div className="map">
			<LoadScript googleMapsApiKey={process.env.REACT_APP_API_KEY}>
				<GoogleMap
					onClick={handleMarkerCreate}
					mapContainerStyle={mapStyles}
					zoom={13}
					center={defaultCenter}
				>
					{/* {locations.map((marker) => {
					return <Marker key={marker.name} position={marker.location} />;
				})} */}
					{/* {renderMarkers} */}
					<Marker key={marker.name} position={marker.location} />
				</GoogleMap>
			</LoadScript>
		</div>
	);
};

export default MapContainer;
