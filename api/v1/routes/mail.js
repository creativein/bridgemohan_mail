const express = require('express');

const MailController = require('../controllers/mail');
// const isAuthenticated = require('../../../middlewares/is-authenticated');

const router = express.Router();
router.get("/", (req, res) => res.send("Mail BOX WORKS!"));
router.post('/send-mail', MailController.sendMail);

module.exports = router;