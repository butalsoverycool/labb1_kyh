/* app.handle(
	'/abc',
	{
		headers: {},
		params: {},
		type: 'GET',
	},
	function (err, resp) {}
); */

const process = (input) => {
	return input;
};

const type_result = (req, res) => {
	let { input, time } = req.body;

	const success = input === 'Hello World';

	return res.status(200).json({
		success,
		typed: input,
		speed: `${parseFloat(time).toFixed(2)} sec`,
	});
};

module.exports = type_result;
