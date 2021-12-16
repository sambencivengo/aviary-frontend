import React from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
const MapContainer = () => {
	const mapStyles = {
		height: '100vh',
		width: '100%',
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
	];

	return (
		<LoadScript googleMapsApiKey="AIzaSyBM5s2moy27Vd4L9eYDLVwCyUlxgq8OK14">
			<GoogleMap
				mapContainerStyle={mapStyles}
				zoom={13}
				center={defaultCenter}
			>
				{locations.map((item) => {
					return <Marker key={item.name} position={item.location} />;
				})}
			</GoogleMap>
		</LoadScript>
	);
};

export default MapContainer;
