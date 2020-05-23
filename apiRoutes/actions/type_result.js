const fs = require('fs');

const addScore = (input, callback, req, res) => {
	const hiscore = require('./type_result.json');

	//var currentSearchResult = 'example';

	fs.readFile(__dirname + '/type_result.json', function (err, data) {
		var hiscore = JSON.parse(data);

		hiscore.unshift(input);

		hiscore = hiscore.sort(
			(a, b) => parseFloat(a.speed) - parseFloat(b.speed)
		);

		const writeabck = JSON.stringify(hiscore, null, 2);

		fs.writeFileSync(__dirname + '/type_result.json', writeabck, 'utf8');

		callback(req, res);
	});
};

const type_result = (req, res) => {
	let { input, time } = req.body;

	const success = req.body.input === 'Hello World';

	const callback = (req, res) => {
		const hiscore = require('./type_result.json');

		return res.status(200).json({
			success,
			typed: input,
			speed: `${parseFloat(req.body.time).toFixed(2)} sec`,
			hiscore,
		});
	};

	if (!success) {
		return callback(req, res);
	}

	const d = new Date();

	addScore(
		{
			typed: input,
			speed: parseFloat(time).toFixed(2),
			timestamp: {
				date: d.toLocaleDateString(),
				time: d.toLocaleTimeString(),
			},
		},
		callback,
		req,
		res
	);
};

module.exports = type_result;
