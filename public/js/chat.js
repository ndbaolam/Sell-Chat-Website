//CLIENT SNED MESSAGE
const formSendData = document.querySelector(".chat .inner-form");
if(formSendData){
    const inputContent = formSendData.querySelector("input[name='content']");
    formSendData.addEventListener('submit', event => {
        event.preventDefault();
        const content = inputContent.value;
        if(content){
            socket.emit('CLIENT_SNED_MESSAGE', content);
            inputContent.value = "";
        }
    });
}

//END CLIENT SNED MESSAGE