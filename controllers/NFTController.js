require("dotenv").config();
const apiResponse = require("../helpers/apiResponse");
const nft = require("../helpers/nftTemplate");

exports.generate = [
    // Process request after validation and sanitization.
    async (req, res) => {
        try {
            const diceResult = req.body.diceResult
            const html = nft.template({diceResult: diceResult})
            res.set('Content-Type', 'text/html');
            res.send(Buffer.from(html));
        }
        catch (err) {
			return apiResponse.ErrorResponse(res, err);
		}
    }
]



