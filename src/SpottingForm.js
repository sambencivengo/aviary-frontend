import { Wrapper } from '@googlemaps/react-wrapper';
import { Select } from 'antd';
import { useEffect, useState } from 'react';
import Map from './Map';

const SpottingForm = () => {
	// when a bird is seen,
	const { Option } = Select;
	const [birds, setBirds] = useState([]);
	const mapStyles = {
		height: '50vh',
		width: '50vh',
	};

	const defaultCenter = {
		lat: 40.6602,
		lng: -73.969749,
	};

	// fetch and render Option components for each bird?
	useEffect(() => {
		fetch('/birds')
			.then((r) => r.json())
			.then((birds) => {
				setBirds(birds);
				console.log(birds);
			});
	}, []);

	const renderOptions = birds.map((birdOption) => {
		console.log(birdOption);
		return <Option value={birdOption.id}>{birdOption.common_name}</Option>;
	});

	return (
		<>
			<h3>What did you see?</h3>
			<Select
				showSearch
				style={{ width: 200 }}
				placeholder="Search to Select"
				optionFilterProp="children"
				filterOption={(input, option) =>
					option.children
						.toLowerCase()
						.indexOf(input.toLowerCase()) >= 0
				}
				filterSort={(optionA, optionB) =>
					optionA.children
						.toLowerCase()
						.localeCompare(optionB.children.toLowerCase())
				}
			>
				{renderOptions}
			</Select>
			{/* <Wrapper googleMapsApiKey={process.env.REACT_APP_API_KEY}>
				<Map />
			</Wrapper> */}
		</>
	);
};

export default SpottingForm;
