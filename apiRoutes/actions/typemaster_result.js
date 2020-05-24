const fs = require('fs');
const failMsg = 'SOMETHING WENT WRONG. PLEASE GO BACK TO PATH /type_master';

// POST TYPE-RESULT

// return
const print = (req, res, input) => {
	return res.status(200).json(input);
};

// add result to hiscore-list
const addScore = (req, res, input) => {
	// get curr hiscore
	fs.readFile('data/typemaster_hiscore.json', function (err, data) {
		if (data === undefined) return print(req, res, { message: failMsg });

		let parsed = JSON.parse(data);

		// add latest result
		parsed.HISCORE.unshift(input);

		// sort before save
		parsed.HISCORE = parsed.HISCORE.sort(
			(a, b) => parseFloat(a.speed) - parseFloat(b.speed)
		);

		const stringified = JSON.stringify(parsed, null, 2);

		// save
		fs.writeFileSync('data/typemaster_hiscore.json', stringified, 'utf8');

		// return
		const toPrint = {
			YOU: { ...input, speed: input.speed + ' sec' },
			hiscore: parsed,
		};

		print(req, res, toPrint);
	});
};

// take in type-result
const typemaster_result = (req, res) => {
	// post-data
	let { input, speed, typer = 'unknown', id } = req.body;

	// curr ranking table
	const { HISCORE } = require('../../data/typemaster_hiscore.json');

	// check requirements:
	// correct typing
	const typeSuccess = req.body.input === 'Hello World';
	// among the 10 fastest
	const speedSuccess =
		HISCORE.some((score) => req.body.speed < score.speed) ||
		HISCORE.length < 10;
	// came from /type_master with fresh id (ie did not reload the page)
	const idSuccess = id && HISCORE.every((score) => score.id !== id);
	// full success
	const success = typeSuccess && speedSuccess && idSuccess;

	// obj on to print
	const result = {
		typer,
		success,
		typed: input,
		speed: `${parseFloat(speed).toFixed(2)} sec`,
		hiscore_rank: success,
		id,
		message: !idSuccess ? failMsg : '',
	};

	// if top-10, add to hiscore-list
	if (success) {
		const d = new Date();
		return addScore(req, res, {
			typer,
			typed: input,
			speed: parseFloat(speed).toFixed(2),
			timestamp: {
				date: d.toLocaleDateString(),
				time: d.toLocaleTimeString(),
			},
			id,
			message: !idSuccess ? failMsg : '',
		});
	}

	// print result
	print(req, res, result);
};

module.exports = typemaster_result;
