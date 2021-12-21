import React, { useState } from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';

const MapContainer = () => {
	const [markerArray, setMarkerArray] = useState([]);

	const mapStyles = {
		height: '50vh',
		width: '50vh',
	};

	const defaultCenter = {
		lat: 40.6602,
		lng: -73.969749,
	};

	const locations = [
		{
			name: 'Location 1',
			location: {
				lat: 40.6601,
				lng: -73.969748,
			},
		},
		{
			name: 'Location 2',
			location: {
				lat: 40.6603,
				lng: -73.969748,
			},
		},
		{
			name: 'Location 3',
			location: {
				lat: 40.6602,
				lng: -73.969749,
			},
		},
		{
			name: 'Location 4',
			location: {
				lat: 40.9602,
				lng: -73.969749,
			},
		},
	];

	const handleMarkerCreate = (e) => {
		const locationObj = {
			name: 'test',
			location: { lat: e.latLng.lat(), lng: e.latLng.lng() },
		};
		setMarkerArray([...markerArray, locationObj]);
	};

	const renderMarkers = markerArray.map((marker) => {
		return <Marker key={marker.name} position={marker.location} />;
	});

	return (
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
				{renderMarkers}
			</GoogleMap>
		</LoadScript>
	);
};

export default MapContainer;
