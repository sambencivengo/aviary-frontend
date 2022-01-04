import React, { useContext, useState } from 'react';
import { GoogleMap, LoadScript } from '@react-google-maps/api';
import AviaryMarker from './AviaryMarker';
import { Button } from 'antd';
import { UserContext } from './UserProvider';

const AviaryMap = ({ spottings, showInfo, cardInfo }) => {
	const { currentUser } = useContext(UserContext);
	console.log(currentUser);

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
		//
		return (
			<AviaryMarker
				cardInfo={cardInfo}
				key={spotting.id}
				spotting={spotting}
			/>
		);
	});

	async function patchUserLoc(url = '', data = {}) {
		const response = await fetch(url, {
			method: 'PATCH',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(data),
		});
		return response.json();
	}

	const getCurrentLocation = () => {
		if (navigator.geolocation) {
			navigator.geolocation.getCurrentPosition((position) => {
				const locObj = {
					lat: position.coords.latitude,
					lng: position.coords.longitude,
				};
				patchUserLoc(`/users/${currentUser.id}`, locObj).then((data) =>
					console.log(data.lat, data.lng)
				);
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
