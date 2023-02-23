require("dotenv").config();
const nodeHtmlToImage = require('node-html-to-image')
const moment = require("moment")
const path = require('path');

const apiResponse = require("../helpers/apiResponse");

exports.generate = [
    // Process request after validation and sanitization.
    async (req, res) => {
        // try {
            let fileName = `${moment().utc().format('DD_MM_Y_HH_mm_ss')}.png`
            let fileLocation = `../nfts/${fileName}`
            nodeHtmlToImage({
            output: fileLocation,
            html: '<html><body>Hello world!</body></html>'
            })
            .then(() => console.log('The image was created successfully!'))
            const absolutePath = path.resolve(fileLocation);
            apiResponse.successSendImage(res, absolutePath)
        
        // }
        // catch (err) {
		// 	return apiResponse.ErrorResponse(res, err);
		// }
    }
]

