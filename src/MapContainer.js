// import React from 'react';
// import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
// import { Wrapper } from '@googlemaps/react-wrapper';

// const MapContainer = () => {
// 	const mapStyles = {
// 		height: '50vh',
// 		width: '50vh',
// 	};

// 	const defaultCenter = {
// 		lat: 40.6602,
// 		lng: -73.969749,
// 	};

// 	const locations = [
// 		{
// 			name: 'Location 1',
// 			location: {
// 				lat: 40.6601,
// 				lng: -73.969748,
// 			},
// 		},
// 		{
// 			name: 'Location 2',
// 			location: {
// 				lat: 40.6603,
// 				lng: -73.969748,
// 			},
// 		},
// 		{
// 			name: 'Location 3',
// 			location: {
// 				lat: 40.6602,
// 				lng: -73.969749,
// 			},
// 		},
// 	];

// 	return (
// 		<Wrapper googleMapsApiKey={process.env.REACT_APP_API_KEY}>
// 			<GoogleMap
// 				mapContainerStyle={mapStyles}
// 				zoom={13}
// 				center={defaultCenter}
// 			>
// 				{locations.map((item) => {
// 					return <Marker key={item.name} position={item.location} />;
// 				})}
// 			</GoogleMap>
// 		</Wrapper>
// 	);
// };

// export default MapContainer;
