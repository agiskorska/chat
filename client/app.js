const loginForm = document.getElementById('welcome-form');
const messagesSection = document.getElementById('messages-section');
const messagesList = document.getElementById('messages-list');
const addMessageForm = document.getElementById('add-messages-form');
const userNameInput = document.getElementById('username');
const messageContentInput = document.getElementById('message-content');

export let userName;

loginForm.addEventListener("submit", function(event){
  event.preventDefault();

  if (!userNameInput) {
    alert('Please provide your username');
  } else {
    userName = userNameInput.value;
    loginForm.classList.remove('show');
    messagesSection.classList.add('show');
  }
});


addMessageForm.addEventListener("submit", function(event){
  sendMessage(event);

});

function sendMessage(e) {
  e.preventDefault();
  if (!messageContentInput.value) {
    alert('please enter your message');

  } else {
    addMessage(userNameInput.value, messageContentInput.value);
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
  li.innerHTML = 
    `<h3 class="message__author">${username}</h3>
    <div class="message__content">
      ${message}
    </div>`;

  messagesList.appendChild(li)
}