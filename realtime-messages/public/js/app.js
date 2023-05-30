const socket = io();

socket.on('messageList', (messages) => {
    displayMessages(messages);
});

socket.on('newMessage', (message) => {
    addMessage(message);
});

function displayMessages(messages) {
    const messagesList = document.getElementById('messages');
    messagesList.innerHTML = '';
    
    for (const message of messages) {
        addMessage(message);
    }
}

function addMessage(message) {
    const messagesList = document.getElementById('messages');
    const li = document.createElement('li');
    li.textContent = message;
    messagesList.append(li);
}

function sendMessage() {
    const input = document.getElementById('messageInput');
    const message = input.value.trim();
    
    if (message !== '') {
        socket.emit('sendMessage', message);
        input.value = '';
    }
}

window.addEventListener('keypress', (event) => {
    if(event.code === "Enter") {
        sendMessage()
    }
})

document.addEventListener('DOMContentLoaded', () => {
    const input = document.getElementById('messageInput');
    input.focus()
})