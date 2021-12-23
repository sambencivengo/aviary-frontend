import React, { useState } from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';

const MapContainer = ({ handleMarkerState }) => {
	const [marker, setMarker] = useState({});
	const [center, setCenter] = useState({
		lat: 40.6602,
		lng: -73.969749,
	});
	const mapStyles = {
		height: '70vh',
		width: '70vh',
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

	// CURRENT LOCATION CODE
	var options = {
		enableHighAccuracy: true,
		timeout: 5000,
		maximumAge: 0,
	};

	function success(pos) {
		var crd = pos.coords;

		console.log('Your current position is:');
		console.log(`Latitude : ${crd.latitude}`);
		console.log(`Longitude: ${crd.longitude}`);
		console.log(`More or less ${crd.accuracy} meters.`);
	}

	function error(err) {
		console.warn(`ERROR(${err.code}): ${err.message}`);
	}

	navigator.geolocation.getCurrentPosition(success, error, options);
	//

	return (
		<div className="map">
			<LoadScript googleMapsApiKey={process.env.REACT_APP_API_KEY}>
				<GoogleMap
					onClick={handleMarkerCreate}
					mapContainerStyle={mapStyles}
					zoom={13}
					center={center}
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
