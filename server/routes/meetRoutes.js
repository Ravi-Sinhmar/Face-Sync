const express = require('express');
const router = express.Router(); //  Create an instance of Router

const meetControllers = require('../Controllers/meetControllers');
const checkCookies = require('../Middleware/checkCookies');

// Define routes
router.post("/saveMeet", meetControllers.save);
router.post("/seeMeet", checkCookies, meetControllers.see);

module.exports = router; //  Use CommonJS export (for Node.js)
