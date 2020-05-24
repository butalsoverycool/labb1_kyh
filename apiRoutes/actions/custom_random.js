// GET RAND NUM BETW 0 - INPUT
const custom_random = (req, res) => {
	return res.status(200).json({
		success: true,
		data: Math.floor(Math.random() * (parseInt(req.params.input) + 1)),
	});
};

module.exports = custom_random;
