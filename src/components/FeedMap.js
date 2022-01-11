import {
	GoogleMap,
	LoadScript,
	Marker,
	InfoWindow,
} from '@react-google-maps/api';
import { Button, DatePicker, Divider } from 'antd';
import moment from 'moment';
import { useState } from 'react';
import { useLocalStorage } from 'react-use';

const FeedMap = ({ spottings, handleInfoWindow, selectedSpotting }) => {
	const [savedLocation, setSavedLocation] = useLocalStorage(
		'saved-location',
		null
	);
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
	const mapStyles = {
		height: '70vh',
		maxWidth: '95%',
	};
	const [zoom, setZoom] = useState(10);

	const [center, setCenter] = useState({ lat: 40.7128, lng: -74.006 });

	const renderSpottings = spottings.map((spotting) => {
		const location = {
			lat: spotting.lat,
			lng: spotting.long,
		};
		const date = spotting.date;
		const legibleDate = new Date(date).toLocaleDateString('en-US', {
			weekday: 'long',
			year: 'numeric',
			month: 'long',
			day: 'numeric',
		});
		return (
			<Marker
				key={spotting.id}
				onClick={() => {
					handleInfoWindow(spotting);
				}}
				position={location}
			>
				{selectedSpotting.id === spotting.id ? (
					<InfoWindow
						style={{ maxHeight: '70vh' }}
						onCloseClick={() => {
							// onCloseClick();
						}}
					>
						<div>
							<h3>{spotting.bird.common_name}</h3>
							<h4>Spotted by: {spotting.user.username}</h4>
							<p
								style={{
									fontSize: '10px',
									fontStyle: 'italic',
								}}
							>
								{legibleDate}
							</p>
							<img
								style={{ maxHeight: '30vh' }}
								src={spotting.bird.image}
							/>
							{/* <p>{spotting}</p> */}
						</div>
					</InfoWindow>
				) : null}
			</Marker>
		);
	});
	return (
		<>
			{' '}
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
					{renderSpottings}
				</GoogleMap>
			</LoadScript>
		</>
	);
};

export default FeedMap;
