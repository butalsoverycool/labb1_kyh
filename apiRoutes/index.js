const express = require('express');
const router = express.Router();

const apiActions = require('./actions');

// target action func
const doAction = (req, res) => {
	const action = apiActions[req.params.action];

	console.log('params', req.params);

	if (typeof action !== 'function') {
		return res.status(400).json({
			success: false,
			error: `Action-param not valid`,
		});
	}

	const client =
		req.connection._peername || req.connection.remoteAddress || 'unknown';
	console.log(`Client (${client}) requesting action: ${req.params.action}`);

	action(req, res);
};

// specify both doAction-action and opt id in req-param
router.get('/:action/:input?', doAction);
router.post('/:action', doAction);

module.exports = router;
