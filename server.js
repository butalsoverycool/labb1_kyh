// read .env
require('dotenv/config');
// parse req-bodies
const bodyParser = require('body-parser');
// server-tool
const express = require('express');
// for route-structure (pathnames)
const router = express.Router();

const server = express();
const cors = require('cors');
const apiRoutes = require('./apiRoutes');

// server config
const port = process.env.PORT || '5000';
server.use(bodyParser.json({ limit: '20mb' })); // to support JSON-encoded bodies
server.use(
	bodyParser.urlencoded({
		// to support URL-encoded bodies
		limit: '20mb',
		extended: true,
	})
);

//server.use(cors());

// server listen
server.listen(port, () =>
	console.log(
		`${process.env.APP_NAME} listening on ${process.env.URL}:${port}.`
	)
);

const publics = ['index', 'typemaster'];

// home visits (send index on all first level sub-paths)
server.get('/:route?', (req, res) => {
	const pathName = publics.includes(req.params.route)
		? req.params.route
		: 'index';

	res.sendFile(`public/${pathName}.html`, {
		root: __dirname,
	});
});

// rest-routes
server.use('/api', apiRoutes);

module.exports = server;
