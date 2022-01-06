import { GoogleMap, LoadScript } from '@react-google-maps/api';
import { Button } from 'antd';
import { useState } from 'react';
import { useLocalStorage } from 'react-use';

const FeedMap = ({ markers }) => {
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
		height: '50vh',
		maxWidth: '100%',
	};
	const [zoom, setZoom] = useState(10);

	const [center, setCenter] = useState({ lat: 40.7128, lng: -74.006 });

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
					{markers}
				</GoogleMap>
			</LoadScript>
		</>
	);
};

export default FeedMap;
