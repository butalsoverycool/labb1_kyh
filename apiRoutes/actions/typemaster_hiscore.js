// GET RANKING TABLE
const typemaster_hiscore = (req, res) => {
	const hiscore = require('../../data/typemaster_hiscore.json');
	return res.status(200).json(hiscore);
};

module.exports = typemaster_hiscore;
