import React, { useContext, useEffect, useState } from 'react';
import { GoogleMap, LoadScript } from '@react-google-maps/api';
import AviaryMarker from './AviaryMarker';
import { Button } from 'antd';
import { UserContext } from './UserProvider';
import { useLocalStorage } from 'react-use';

const AviaryMap = ({ spottings, showInfo, cardInfo }) => {
	const { currentUser } = useContext(UserContext);

	const [currentLat, setCurrentLat] = useLocalStorage('lat', null);
	const [currentLng, setCurrentLng] = useLocalStorage('lng', null);
	console.log(currentLat, currentLng);


	const [zoom, setZoom] = useState(8);

	// const [initialCenter, setInitialCenter] = useState(defaultCenter);
	const mapStyles = {
		height: '70vh',
		width: '70vh',
	};

	const [center, setCenter] = useState({
		lat: currentLat,
		lng: currentLng,
	});

	// function setLocation() {
	// 	setCenter({ lat: currentLat, lng: currentLng });
	// 	if (center.lng || center.lat === null) {
	// 	}
	// }
	// setLocation();
	const markers = spottings.map((spotting) => {
		return (
			<AviaryMarker
				cardInfo={cardInfo}
				key={spotting.id}
				spotting={spotting}
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
				const locObj = {
					lat: position.coords.latitude,
					lng: position.coords.longitude,
				};
				setCurrentLat(locObj.lat);
				setCurrentLng(locObj.lng);
			});
		}
	};

	useEffect(() => {
		if (currentLng || currentLat === null) {
			setCenter({ lat: 42.6602, lng: -73.969749 });
		}

		setCenter({ lat: currentLat, lng: currentLng });
		setZoom(13);
	}, []);

	return (
		<div className="map">
			<div className="map">
				<LoadScript googleMapsApiKey={process.env.REACT_APP_API_KEY}>
					<GoogleMap
						mapContainerStyle={mapStyles}
						zoom={zoom}
						center={center}
					>
						<Button
							style={{ marginTop: '10px' }}
							onClick={() => getCurrentLocation()}
							size="small"
						>
							Current Location
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
