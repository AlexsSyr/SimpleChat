const ws = new WebSocket('ws://85.231.155.115:1000');

let userId;

ws.onmessage = (message) => {
    eventHandler(JSON.parse(message.data));
};

let sendButton = document.getElementById("sendNameButton");
sendButton.addEventListener("click", sendUserName);

let sendMessageButton = document.getElementById("sendMessage");
sendMessageButton.addEventListener("click", sendMessage)

let messageField = document.getElementById("messageField");
let messageBox = document.getElementById("messageBox");

function sendUserName() {
    let nameData = {
        action: "setName",
        userId,
        value: document.getElementById("userName").value
    };

    ws.send(JSON.stringify(nameData));
}

function sendMessage()
{
    let messageData = {
        action: "sendMessage",
        userId,
        value: document.getElementById("messageText").value
    };

    ws.send(JSON.stringify(messageData));
}

function eventHandler(evt) {
    switch (evt.action) {
        case "idAllocation":
            userId = evt.value;
            messageBox.value = evt.history;
            break;
        case "message":
            messageBox.value += evt.value + "\n";
            messageField.scrollTop = messageField.scrollHeight;
            break;
    }

}