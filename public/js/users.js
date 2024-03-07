//Add Friend Request
const listBtnAddFriend = document.querySelectorAll("[btn-add-friend]");
if(listBtnAddFriend.length > 0) {
    listBtnAddFriend.forEach(button => {
        button.addEventListener("click", () => {
            button.closest(".box-user").classList.add("add");

            const userId = button.getAttribute("btn-add-friend");

            socket.emit("CLIENT_ADD_FRIEND", userId);
        });
    });
}
//End Add Friend Request

// CLIENT_CANCEL_FRIEND
const listBtnCancelFriend = document.querySelectorAll("[btn-cancel-friend]");
if(listBtnCancelFriend.length > 0){
    listBtnCancelFriend.forEach(button => {
        button.addEventListener('click', () => {
            button.closest('.box-user').classList.remove('add');

            const userId = button.getAttribute('btn-cancel-friend');

            socket.emit('CLIENT_CANCEL_FRIEND', userId);
        });
    });
}
// CLIENT_CANCEL_FRIEND

//CLIENT_REFUSE_FRIEND
const listBtnRefuseFriend = document.querySelectorAll('[btn-refuse-friend]');
if(listBtnRefuseFriend.length > 0){
    listBtnRefuseFriend.forEach(button => {
        button.addEventListener('click', () => {
            button.closest(".box-user").classList.add("refuse");

            const userId = button.getAttribute('btn-refuse-friend');

            socket.emit('CLIENT_REFUSE_FRIEND', userId);
        });
    });
}
//End CLIENT_REFUSE_FRIEND

//CLIENT_ACCEPT_FRIEND
const listBtnAcceptFriend = document.querySelectorAll("[btn-accept-friend]");
if(listBtnAcceptFriend.length > 0){
    listBtnAcceptFriend.forEach(button => {
        button.addEventListener('click', () => {
            button.closest(".box-user").classList.add("accepted");

            const userId = button.getAttribute('btn-accept-friend');

            socket.emit('CLIENT_ACCEPT_FRIEND', userId);
        });
    });
}
//End CLIENT_ACCEPT_FRIEND

//SERVER_RETURN_LENGTH_ACCEPT_FRIEND
socket.on('SERVER_RETURN_LENGTH_ACCEPT_FRIEND', (data) => {
    const badgeUsersAccept = document.querySelector(`[badge-users-accept="${data.userId}"]`);
    if(badgeUsersAccept){
        badgeUsersAccept.innerHTML =  data.lengthAcceptFriends;
    }
});
//End SERVER_RETURN_LENGTH_ACCEPT_FRIEND

//SERVER_RETURN_INFO_ACCEPT_FRIEND
socket.on('SERVER_RETURN_INFO_ACCEPT_FRIEND', (data) => {
    const dataUserAccept = document.querySelector(`[data-users-accept="${data.userIdB}"]`);
    if(dataUserAccept){
        const newBoxUser = document.createElement("div");
        newBoxUser.classList.add("col-6");
        newBoxUser.setAttribute("user-id", data.infoUserA._id);
    
        newBoxUser.innerHTML = `
          <div class="box-user">
            <div class="inner-avatar">
              <img src="https://robohash.org/hicveldicta.png" alt="${data.infoUserA.fullName}" />
            </div>
            <div class="inner-info">
                <div class="inner-name">
                  ${data.infoUserA.fullName}
                </div>
                <div class="inner-buttons">
                  <button
                    class="btn btn-sm btn-primary mr-1"
                    btn-accept-friend="${data.infoUserA._id}"
                  >
                    Chấp nhận
                  </button>
                  <button
                    class="btn btn-sm btn-secondary mr-1"
                    btn-refuse-friend="${data.infoUserA._id}"
                  >
                    Xóa
                  </button>
                  <button
                    class="btn btn-sm btn-secondary mr-1"
                    btn-deleted-friend=""
                    disabled=""
                  >
                    Đã xóa
                  </button>
                  <button
                    class="btn btn-sm btn-primary mr-1"
                    btn-accepted-friend=""
                    disabled=""
                  >
                    Đã chấp nhận
                  </button>
                </div>
            </div>
          </div>
        `;

        dataUserAccept.appendChild(newBoxUser);

        // Xóa lời mời kết bạn
        const buttonRefuse = newBoxUser.querySelector("[btn-refuse-friend]");
        buttonRefuse.addEventListener("click", () => {
            buttonRefuse.closest(".box-user").classList.add("refuse");

            const userId = buttonRefuse.getAttribute("btn-refuse-friend");

            socket.emit("CLIENT_REFUSE_FRIEND", userId);
        });
        // Hết Xóa lời mời kết bạn

        // Chấp nhận lời mời kết bạn
        const buttonAccept = newBoxUser.querySelector("[btn-accept-friend]");
        buttonAccept.addEventListener("click", () => {
            buttonAccept.closest(".box-user").classList.add("accept");

            const userId = buttonAccept.getAttribute("btn-accept-friend");

            socket.emit("CLIENT_ACCEPT_FRIEND", userId);
        });
        // Hết Chấp nhận lời mời kết bạn
    }

    // Khi A gửi kết bạn cho B, danh sách người dùng của B xóa đi A
    const dataUsersNotFriend = document.querySelector(`[data-users-not-friend="${data.userIdB}"]`);
    if(dataUsersNotFriend) {
        const boxUserDelete = dataUsersNotFriend.querySelector(`[user-id="${data.infoUserA._id}"]`);
        dataUsersNotFriend.removeChild(boxUserDelete);
    }
});
//End SERVER_RETURN_INFO_ACCEPT_FRIEND

//SERVER_RETURN_ID_CANCEL_FRIEND
socket.on('SERVER_RETURN_ID_CANCEL_FRIEND', (data) => {
    const dataUserAccept = document.querySelector(`[data-users-accept="${data.userIdB}"]`);
    if(dataUserAccept){
        const boxUserA = dataUserAccept.querySelector(`[]user-id="${data.userIA}"`);
        if(boxUserA){
            dataUserAccept.removeChild(boxUserA);
        }
    }
});
//End SERVER_RETURN_ID_CANCEL_FRIEND

//SERVER_RETURN_USER_STATUS
socket.on('SERVER_RETURN_USER_STATUS', (data) => {
    const dataUsersFriend = document.querySelector('[data-users-friend]');
    if(dataUsersFriend){
        const boxUser = dataUsersFriend.querySelector(`[user-id="${data.userId}"]`);
        if(boxUser){
            const boxStatus = boxUser.querySelector('[status]');
            boxStatus.setAttribute('status', data.status);
        }
    }
});
//End SERVER_RETURN_USER_STATUS