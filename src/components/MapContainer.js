import React, { useEffect, useState } from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
import { Button } from 'antd';
import { useLocalStorage } from 'react-use';

const MapContainer = ({ handleMarkerState }) => {
	const [marker, setMarker] = useState({});

	const mapStyles = {
		height: '70vh',
		width: '70vh',
	};
	const [savedLocation, setSavedLocation] = useLocalStorage(
		'saved-location',
		null
	);

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

	const [center, setCenter] = useState({ lat: 40.7128, lng: -74.006 });
	const [zoom, setZoom] = useState(10);

	//
	const getCurrentLocation = () => {
		if (navigator.geolocation) {
			navigator.geolocation.getCurrentPosition((position) => {
				setSavedLocation({
					lat: position.coords.latitude,
					lng: position.coords.longitude,
				});
				setCenter({
					lat: position.coords.latitude,
					lng: position.coords.longitude,
				});
				setZoom(15);
			});
		}
	};

	useEffect(() => {
		if (savedLocation) {
			setZoom(15);
			setCenter(savedLocation);
		}
	}, []);

	return (
		<div className="map">
			<LoadScript googleMapsApiKey={process.env.REACT_APP_API_KEY}>
				<GoogleMap
					onClick={handleMarkerCreate}
					mapContainerStyle={mapStyles}
					zoom={zoom}
					center={center}
				>
					<Button
						style={{ color: 'black', marginTop: '10px' }}
						onClick={() => getCurrentLocation()}
						size="small"
					>
						Current Location
					</Button>

					<Marker key={marker.name} position={marker.location} />
				</GoogleMap>
			</LoadScript>
		</div>
	);
};

export default MapContainer;
