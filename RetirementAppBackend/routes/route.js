const express = require('express');
const Controller = require("../controllers/controller");

const router = express.Router();

router.post('/registerAudit', Controller.register);

module.exports = router;