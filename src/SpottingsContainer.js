import { GoogleMap, LoadScript } from '@react-google-maps/api';
import { useState } from 'react';
import { useEffect } from 'react';
import MapContainer from './MapContainer';

const SpottingsContainer = () => {
	const [spottings, setSpottings] = useState([]);

	useEffect(() => {
		fetch('/spottings')
			.then((r) => r.json())
			.then((data) => {
				setSpottings(data);
			});
	}, []);

	const mapStyles = {
		height: '50vh',
		width: '50vh',
	};
	const defaultCenter = {
		lat: 40.6602,
		lng: -73.969749,
	};

	// console.log(spottings[0].lat, spottings[0].long);
	// set spottings into an array
	// pass them to the google maps component
	// iterate through them (lat & long) to create Markers

	// MAP IDEAS
	// map conatiner might not be the way to render the
	// map if each marker is customized to the fetch

	return (
		<>
			<h4>Container for User Spottings</h4>
			<LoadScript googleMapsApiKey={process.env.REACT_APP_API_KEY}>
				<GoogleMap
					mapContainerStyle={mapStyles}
					zoom={13}
					center={defaultCenter}
				>
					{/* {locations.map((item) => {
						return (
							<Marker key={item.name} position={item.location} />
						);
					})} */}
				</GoogleMap>
			</LoadScript>
		</>
	);
};

export default SpottingsContainer;
