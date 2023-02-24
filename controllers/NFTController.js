require("dotenv").config();
const apiResponse = require("../helpers/apiResponse");
const nft = require("../helpers/nftTemplate");
const nodeHtmlToImage = require('node-html-to-image')
const puppeteer = require('puppeteer');

exports.generate = [
    // Process request after validation and sanitization.
    async (req, res) => {
        try {
            const diceResults = req.body.diceResults
            const html = nft.template({diceResults: diceResults})
            let image = await nodeHtmlToImage({
                encoding: 'base64',
                type: 'png',
                html: html
              })
                .then((img) => {
                    return img
                })
            res.set('Content-Type', 'image/png');
            res.send(Buffer.from(image, 'base64'));
        }
        catch (err) {
            console.log(err);
			return apiResponse.ErrorResponse(res, err);
		}
    }
]



