let chat3d = null;

const chat3dData = {
    authenticated: false,
    clientsOnline: 0,
    activeUsers: {},
    uid: ""
};

function initWebSocket() {
    if (chat3d !== null) return;
    
    chat3d = new WebSocket("wss://vidyapad.com/chat/");
    chat3d.onopen = setupHeartbeat;
    chat3d.onmessage = handleWebSocketMessage;
}

function setupHeartbeat() {
    const heartbeatInterval = setInterval(() => {
        if (chat3d.readyState !== WebSocket.OPEN) {
            clearInterval(heartbeatInterval);
            return;
        }
        chat3d.send(JSON.stringify({ type: "ping" }));
    }, 30000); // 30s 
}

function handleWebSocketMessage(event) {
    const data = JSON.parse(event.data);
    updateChat3dData(data);
    processWebSocketData(data);
}

function updateChat3dData(data) {
    chat3dData.authenticated = data.authenticated;
    chat3dData.clientsOnline = data.clientsOnline;
    chat3dData.activeUsers = data.activeUsers;
    if (!chat3dData.uid) chat3dData.uid = data.uid;
}

function processWebSocketData(data) {
    switch (data.type) {
        case "join":
        case "leave":
        case "welcome":
            appendChatMessage(data, false);
            break;
        case "message":
            handleMessageData(data);
            break;
    }
    updateUI();
}

function handleMessageData(data) {
    appendChatMessage(data, data.tokenId > 0);
    if (chat3dData.uid !== data.uid) audio.message.play();
}

function appendChatMessage(data, hasToken) {
    const msg = hasToken ? createTokenMessage(data) : createNormalMessage(data);
    $("#chat3d-chat").append(msg);
}

function createTokenMessage(data) {
    return `<p style="color: ${data.color};" class="flex-box center-vertical">
                <img src="https://team3d.io/inventory/json/${data.tokenId}.png" 
                style="width: 16px; height: 16px; margin-right: 4px;"/>
                ${sanitize(data.username)}: ${sanitize(data.msg)}
            </p>`;
}

function createNormalMessage(data) {
    return `<p style="color: ${data.color};" class="flex-box center-vertical">
                ${sanitize(data.username)}: ${sanitize(data.msg)}
            </p>`;
}

function updateUI() {
    $("#chat3d-chat").scrollTop($("#chat3d-chat")[0].scrollHeight);
    if (chat3dData.authenticated) {
        updateActiveUsers();
    }
}

function updateActiveUsers() {
    $(".chat3d-userlist").empty();
    Object.values(chat3dData.activeUsers).forEach(user => {
        $(".chat3d-userlist").append(`<div style="color:${user.color}">${user.username}</div>`);
    });
}

$(document).ready(function () {
    $("#chat3d-toggle").on("click", initWebSocket);

    // Attach event handler to dynamically added elements
    $(document).on("click", ".chat3d-sign", chat3dSignIn);
    $(document).on("click", ".chat3d-send", handleMessage);

    $("#chat3d .close_button").on("click", () => {
        resetChat3d();
        chat3d.close();
        chat3d = null;
    });

    initTypingEvent();
});

async function chat3dSignIn() {
    // Ensure web3 and accounts are defined
    if (!web3 || !accounts) {
        console.error("web3 or accounts not defined");
        return;
    }

    const message = web3.utils.sha3(chat3dData.uid);
    try {
        const signature = await web3.eth.personal.sign(message, accounts[0]);
        const payload = web3.utils.toHex("TeamOSAuth") + accounts[0].substr(2) + signature.substr(2);
        chat3d.send(JSON.stringify({ adr: payload }));
    } catch (error) {
        console.error("Error signing in:", error);
    }
}


function resetChat3d() {
    Object.assign(chat3dData, {
        authenticated: false,
        clientsOnline: 0,
        activeUsers: {},
        uid: ""
    });

    $(".chat3d-chat, .chat3d-userlist").empty();
    $(".chat3d-userlist").append('<div class="chat3d-sign-wrapper flex-box full-height full-width flex-center"><button class="chat3d-sign inventory-button">Sign in</button></div>');
}

function sanitize(text) {
    return text.replace(/[&<>"'`=\/]/g, char => `&#${char.charCodeAt(0)};`);
}

function handleMessage() {
    const message = $(".chat3d-input").val();
    if (!message) return;

    chat3d.send(JSON.stringify({ data: message }));
    $(".chat3d-input").val("").focus();
}

function sendTypingEvent() {
    chat3d.send(JSON.stringify({ type: "typing" }));
}

function initTypingEvent() {
    $(".chat3d-input").on("input", sendTypingEvent);
}
