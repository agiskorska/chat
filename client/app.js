const loginForm = document.getElementById('welcome-form');
const messagesSection = document.getElementById('messages-section');
const messagesList = document.getElementById('messages-list');
const addMessageForm = document.getElementById('add-messages-form');
const userNameInput = document.getElementById('username');
const messageContentInput = document.getElementById('message-content');
const socket = io();

socket.on('message', ({ author, content }) => addMessage(author, content))
let userName;

loginForm.addEventListener("submit", function(event){
  event.preventDefault();


  if (!userNameInput) {
    alert('Please provide your username');
  } else {
    userName = userNameInput.value;
    loginForm.classList.remove('show');
    messagesSection.classList.add('show');
    socket.emit('newUser', userName);
    const messageContent =  userName + " has joined the conversation!"
    addMessage('Chat Bot', messageContent);
    socket.emit('message', { author: 'Chat Bot', content: messageContent })
  }
});


addMessageForm.addEventListener("submit", function(event){
  sendMessage(event);

});

function sendMessage(e) {
  e.preventDefault();

  let messageContent = messageContentInput.value;

  if(!messageContent.length) {
    alert('You have to type something!');
  }
  else {
    addMessage(userName, messageContent);
    socket.emit('message', { author: userName, content: messageContent })
    messageContentInput.value = '';
  }

}

function addMessage(username, message) {
  const li = document.createElement('li');
  li.classList.add('message');
  if (username == userName) {
    li.classList.add('message--self');
    username = 'You'
  }
  if (username === 'Chat Bot') {
    li.classList.add('bot');
  }
  li.innerHTML = 
    `<h3 class="message__author">${username}</h3>
    <div class="message__content">
      ${message}
    </div>`;

  messagesList.appendChild(li)
}

function addAuthor(author) {
  return author;
}