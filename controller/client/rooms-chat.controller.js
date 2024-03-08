const User = require('../../models/user.model');
const RoomChat = require('../../models/rooms-chat.model');

// [GET] /rooms-chat/
module.exports.index = async (req, res) => {
    const userId = res.locals.user.id;

    const listRoomChat = await RoomChat.find({
        "users.user_id": userId,
        typeRoom: "group",
        deleted: false
    });

    res.render("client/pages/rooms-chat/index", {
        listRoomChat: listRoomChat,
        pageTitle: "Danh sách phòng",
    });
};

// [GET] /rooms-chat/create
module.exports.create = async (req, res) => {
    const friendsList = res.locals.user.friendsList;
  
    for (const friend of friendsList) {
        const infoFriend = await User.findOne({
            _id: friend.user_id
        }).select("fullName avatar");
    
        friend.infoFriend = infoFriend;
    }
  
    res.render("client/pages/rooms-chat/create", {
      pageTitle: "Tạo phòng",
      friendsList: friendsList
    });
};

// [POST] /rooms-chat/createPost
module.exports.createPost = async (req, res) => {
    const title = req.body.title;
    const usersId = req.body.usersId;

    const dataRoom = {
        title: title,
        typeRoom: "group",
        users: []
    };

    dataRoom.users.push({
        user_id: res.locals.user.id,
        role: "superAdmin"
    });

    usersId.forEach(userId => {
        dataRoom.users.push({
            user_id: userId,
            role: "user"
        })
    });

    const roomChat = new RoomChat(dataRoom);
    await roomChat.save();

    res.redirect(`/chat/${roomChat.id}`);
};

//[GET] /rooms-chat/edit/:roomChatId
module.exports.edit = async (req, res) => {
    const roomChat = await RoomChat.findOne({
        _id: req.params.roomChatId,
        deleted: false
    });

    const friendsList = res.locals.user.friendsList;
  
    for (const friend of friendsList) {
        const infoFriend = await User.findOne({
            _id: friend.user_id
        }).select("fullName avatar");
    
        friend.infoFriend = infoFriend;

        const inRoomChat = roomChat.users.find(item => item.user_id == friend.user_id);
        if(inRoomChat){
            friend.inRoomChat = true;
        }
    }

    res.render("client/pages/rooms-chat/edit", {
      pageTitle: "Chỉnh sửa phòng",
      friendsList: friendsList,
      roomChat: roomChat
    });
}