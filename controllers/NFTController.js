require("dotenv").config();
const UserModel = require("../models/UserModel");
const { body, validationResult } = require("express-validator");
const { sanitizeBody } = require("express-validator");
const { ethers } = require("ethers");

const apiResponse = require("../helpers/apiResponse");

exports.register = [
    // Process request after validation and sanitization.
    async (req, res) => {
        try {
            // Extract the validation errors from a request.
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return apiResponse.validationErrorWithData(res, "Validation Error.", errors.array());
            } else {
                apiResponse.successResponse(res, "Works")
            }
        }
        catch (err) {
			return apiResponse.ErrorResponse(res, err);
		}
    }
]

