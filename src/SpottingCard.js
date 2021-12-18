const SpottingCard = ({ bird }) => {
	console.log(bird);
	console.log('rendering card');
	return (
		<>
			<h2>{bird.bird.common_name}</h2>
		</>
	);
};

export default SpottingCard;
