function randomValue(range, minimum = 0) {
	//TODO: incorporate luck into this?
	return Math.floor(Math.random() * range) + minimum;
}

export default randomValue;
