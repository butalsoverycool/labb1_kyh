const random = (req, res) => {
	return res
		.status(200)
		.json({ success: true, data: Math.floor(Math.random() * 1024) });
};

module.exports = random;
