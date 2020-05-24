const fs = require('fs');

// return
const print = (req, res, input) => {
	const hiscore = require('./type_result.json');

	return res.status(200).json(input);
};

const addScore = (req, res, input) => {
	const hiscore = require('./type_result.json');

	fs.readFile(__dirname + '/type_result.json', function (err, data) {
		var hiscore = JSON.parse(data);

		hiscore.unshift(input);

		hiscore = hiscore.sort(
			(a, b) => parseFloat(a.speed) - parseFloat(b.speed)
		);

		const formatted = JSON.stringify(hiscore, null, 2);

		fs.writeFileSync(__dirname + '/type_result.json', formatted, 'utf8');

		const toPrint = {
			YOU: { ...input, speed: input.speed + ' sec' },
			hiscore: hiscore,
		};

		print(req, res, toPrint);
	});
};

// take in type-result
const type_result = (req, res) => {
	let { input, speed, typer = 'unknown', id } = req.body;
	const hiscore = require('./type_result.json');

	console.log(req.body);

	const typeSuccess = req.body.input === 'Hello World';

	const speedSuccess =
		hiscore.some((score) => req.body.speed < score.speed) ||
		hiscore.length < 10;

	const idSuccess = hiscore.every((score) => score.id !== id);

	const success = typeSuccess && speedSuccess && idSuccess;

	const result = {
		typer,
		success,
		speed: `${parseFloat(speed).toFixed(2)} sec`,
		typed: input,
		hiscore_rank: success,
		id,
	};

	// if top-10, add to hiscore-list and print
	if (success) {
		const d = new Date();
		addScore(req, res, {
			typer,
			typed: input,
			speed: parseFloat(speed).toFixed(2),
			timestamp: {
				date: d.toLocaleDateString(),
				time: d.toLocaleTimeString(),
			},
			id,
		});
	}

	// if not on top-10, just print my res

	print(req, res, result);
};

module.exports = type_result;
