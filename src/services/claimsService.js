const express = require("express");
const jwtService = require("@services/jwtService");

class ClaimsService {
    /**
     * @param {express.Request} request 
     */
    constructor(request) {
        this.request = request
    }

    reclaimToken() {
        const token = this.request.header('Authorization')?.split(' ')[1];
        const decoded = jwtService.verifyToken(token);
        if (decoded == null)
            throw new jwt.JsonWebTokenError("Invalid or expired token");

        return decoded;
    }

    getID() {
        var reclaim = this.reclaimToken();
        return reclaim.iId;
    }
    getNAME() {
        var reclaim = this.reclaimToken();
        return reclaim.sName;
    }
}

module.exports = ClaimsService;