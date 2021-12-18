// import { GoogleMap } from '@react-google-maps/api';
// import { useEffect, useRef, useState } from 'react';
// goog

// function Map() {
// 	const ref = useRef(null);
// 	const [map, setMap] = useState(google.maps.Map());

// 	useEffect(() => {
// 		if (ref.current && !map) {
// 			setMap(new window.google.maps.Map(ref.current, {}));
// 		}
// 	}, [ref, map]);

// 	const defaultCenter = {
// 		lat: 40.6602,
// 		lng: -73.969749,
// 	};

// 	return (
// 		// <GoogleMap
// 		// 	mapContainerStyle={mapStyles}
// 		// 	zoom={13}
// 		// 	center={defaultCenter}
// 		// >
// 		// 	{/* {locations.map((item) => {
// 		// 		return <Marker key={item.name} position={item.location} />;
// 		// 	})} */}
// 		// </GoogleMap>
// 		<div ref={ref} />
// 	);
// }

// export default Map;
