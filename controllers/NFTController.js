require("dotenv").config();
const apiResponse = require("../helpers/apiResponse");
const nft = require("../helpers/nftTemplate");

exports.generate = [
    // Process request after validation and sanitization.
    async (req, res) => {
        try {
            const diceResults = req.body.diceResults
            const html = nft.template({diceResults: diceResults})
            const nodeHtmlToImage = require('node-html-to-image')
            nodeHtmlToImage({
            output: './image.png',
            html: '<html><body>Hello world!</body></html>'
            })
            .then(() => console.log('The image was created successfully!'))
            
            res.set('Content-Type', 'text/html');
            res.send(Buffer.from(html));
        }
        catch (err) {
			return apiResponse.ErrorResponse(res, err);
		}
    }
]



