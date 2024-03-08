const express = require("express");
const router = express.Router();

const controller = require('../../controller/client/rooms-chat.controller');

router.get('/', controller.index);

router.get('/create', controller.create);

router.post('/create', controller.createPost);

router.get('/edit/:roomChatId', controller.edit);

router.patch('/edit/:roomChatId', controller.editPatch);

module.exports = router;