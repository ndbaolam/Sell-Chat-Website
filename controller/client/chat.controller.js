const Chat = require('../../models/chat.model');
const User = require('../../models/user.model');

// [GET] /chat/
module.exports.index = async (req, res) => {
    const userId = res.locals.user.id;
    const fullName = res.locals.user.fullName;

    //SocketIO
    _io.once('connection', (socket) => {
        socket.on('CLIENT_SNED_MESSAGE', async (content) => {
            const chat = new Chat({
                user_id: userId,
                content: content
            });

            await chat.save();

            _io.emit("SERVER_SEND_MESSAGE", {
                userId: userId,
                fullName: fullName,
                content: content
            });
        });

        //Typing
        socket.on("CLIENT_SEND_TYPING", (type) => {
            socket.broadcast.emit("SERVER_RETURN_TYPING", {
                fullName: fullName,
                userId: userId,
                type: type
            });
        });
        //End Typing
    });
    //End SocketIO

    //Collect data from database
    const chats = await Chat.find({
        deleted: false,
    });

    for (const chat of chats) {
        const infoUser = await User.findOne({
            _id: chat.user_id
        }).select('fullName');

        chat.infoUser = infoUser;
    }

    //End collect data from database

    res.render("client/pages/chat/index", {
      pageTitle: "Chat",
      chats: chats
    });
};