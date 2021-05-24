const socket           = io();
const messageContainer = document.getElementById('message-container');
const messageForm      = document.getElementById('send-container');
const messageInput     = document.getElementById('message-input');
const username         = prompt('What is your name?');
const profile          = document.getElementById('myImg');

appendMessage('You joined')
socket.emit('new-user', username);

socket.on('chat-message', data => {
    appendMessage(`${data.profile} ${data.name}: ${data.message}`);
});

socket.on('user-connected', username => {
    appendMessage(`${profile} ${username} connected.`);
});

socket.on('user-disconnected', username => {
    appendMessage(`${profile} ${username} disconnected.`);
});

messageForm.addEventListener('submit', e => {
    e.preventDefault();
    const message = messageInput.value;
    appendMessage(`${profile} You: ${message}`);
    socket.emit('send-chat-message', profile, message);
    messageInput.value = '';
});

function appendMessage(message, profile) {
    const messageElement = document.createElement('div');
    const profilePicture = document.createElement('img');

    profilePicture.innerHTML = profile;
    messageElement.innerText = message;
    messageContainer.insertBefore(profilePicture, messageElement, messageContainer.firstChild);
}

/*
// Fix this. It breaks everything.
window.addEventListener('load', function() {
    document.querySelector('input[type="file"]').addEventListener('change', function() {
        if (this.files && this.files[0]) {
            var img = document.querySelector('img');
            img.onload = () => {
                URL.revokeObjectURL(img.src);  // no longer needed, free memory
            }
  
            img.src = URL.createObjectURL(this.files[0]); // set src to blob url
        }
    });
});
*/