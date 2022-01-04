import React, { useState } from 'react';
import { GoogleMap, LoadScript } from '@react-google-maps/api';
import AviaryMarker from './AviaryMarker';
import { Button } from 'antd';

const AviaryMap = ({ spottings, showInfo, cardInfo }) => {
	const defaultCenter = {
		lat: 44.6602,
		lng: -73.969749,
	};

	// save current location in backend!!!!

	const [initialCenter, setInitialCenter] = useState(defaultCenter);
	// {
	// 	lat: null,
	// 	lng: null,
	// }
	const [currentLocation, setCurrentLocation] = useState(defaultCenter);
	const mapStyles = {
		height: '70vh',
		width: '70vh',
	};

	console.log(currentLocation);

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

	const getCurrentLocation = () => {
		console.log('clicked');

		if (navigator.geolocation) {
			navigator.geolocation.getCurrentPosition((position) => {
				let lat = position.coords.latitude;
				let lng = position.coords.longitude;
				setCurrentLocation({ lat: lat, lng: lng });
			});
		}
	};

	return (
		<div className="map">
			<div className="map">
				<LoadScript googleMapsApiKey={process.env.REACT_APP_API_KEY}>
					<GoogleMap
						mapContainerStyle={mapStyles}
						zoom={13}
						center={currentLocation}
					>
						<Button
							style={{ marginTop: '10px' }}
							onClick={() => getCurrentLocation()}
						>
							Pan To Current Location
						</Button>
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
