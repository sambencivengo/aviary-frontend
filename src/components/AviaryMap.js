import React, { useContext, useEffect, useState } from 'react';
import { GoogleMap, LoadScript } from '@react-google-maps/api';
import AviaryMarker from './AviaryMarker';
import { Button } from 'antd';
import { UserContext } from './UserProvider';
import { useLocalStorage } from 'react-use';

const AviaryMap = ({
	spottings,
	selectedSpotting,
	onMarkerClicked,
	onMarkerCloseClicked,
	resetInfoWindow,
}) => {
	const { currentUser } = useContext(UserContext);

	const [savedLocation, setSavedLocation] = useLocalStorage(
		'saved-location',
		null
	);
	console.log(savedLocation);

	// const [initialCenter, setInitialCenter] = useState(defaultCenter);
	const mapStyles = {
		height: '70vh',
		width: '70vh',
	};

	const [zoom, setZoom] = useState(10);

	const [center, setCenter] = useState({ lat: 40.7128, lng: -74.006 });

	// function setLocation() {
	// 	setCenter({ lat: currentLat, lng: currentLng });
	// 	if (center.lng || center.lat === null) {
	// 	}
	// }
	// setLocation();
	console.log(selectedSpotting);
	const markers = spottings.map((spotting) => {
		return (
			<AviaryMarker
				isSelected={
					selectedSpotting && selectedSpotting.id === spotting.id
				}
				key={spotting.id}
				spotting={spotting}
				onClick={onMarkerClicked}
				onCloseClick={onMarkerCloseClicked}
			/>
		);
	});

	// async function patchUserLoc(url = '', data = {}) {
	// 	const response = await fetch(url, {
	// 		method: 'PATCH',
	// 		headers: {
	// 			'Content-Type': 'application/json',
	// 		},
	// 		body: JSON.stringify(data),
	// 	});
	// 	return response.json();
	// }

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

	console.log(center);
	return (
		<div className="map">
			<div className="map">
				<LoadScript googleMapsApiKey={process.env.REACT_APP_API_KEY}>
					<GoogleMap
						mapContainerStyle={mapStyles}
						zoom={zoom}
						center={center}
						onClick={(e) => {
							resetInfoWindow();
							console.log(e);
						}}
					>
						<Button
							style={{ marginTop: '10px' }}
							onClick={() => getCurrentLocation()}
							size="small"
						>
							Current Location
						</Button>
						{markers}
					</GoogleMap>
				</LoadScript>
			</div>
		</div>
	);
};

export default AviaryMap;
