const express = require("express");
const router = express.Router();

const controller = require('../../controller/client/rooms-chat.controller');

router.get('/', controller.index);

router.get('/create', controller.create);

router.post('/create', controller.createPost);

router.get('/edit/:roomChatId', controller.edit);

module.exports = router;