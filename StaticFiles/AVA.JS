const toggleChatbot = () => {
  const currentState =
    document.getElementById('spanChatbotToggler').textContent;
  if (currentState === 'chat_bubble') {
    document.getElementById('spanChatbotToggler').textContent = 'close';
    document.getElementById('wrapperChatbot').classList.remove('displayNone');
  } else {
    document.getElementById('spanChatbotToggler').textContent = 'chat_bubble';
    document.getElementById('wrapperChatbot').classList.add('displayNone');
  }
};

const chatInput = document.querySelector('.chatInput textarea');
const chatInputButton = document.querySelector('.chatInput span');
const chatBox = document.getElementById('chatBox');

const generateResponse = (userMessage) => {};

const addingChatToChatbot = (Message, ClassName) => {
  const newDiv = document.createElement('div');
  newDiv.classList.add('chat', ClassName);
  let chatContent = '';
  if (ClassName === 'outgoingChat') {
    chatContent = `<span class="material-symbols-rounded outgoingIcon">person</span><p>${Message}</p>`;
    document.getElementById('dimag').value = '';
  } else if (ClassName === 'incomingChat') {
    chatContent = `<span class="material-symbols-rounded incomingIcon">smart_toy</span><p>${Message}</p>`;
  }
  newDiv.innerHTML = chatContent;
  return newDiv;
};

let userMessage;

const handleChat = () => {
  userMessage = chatInput.value.trim();
  console.log(userMessage);
  if (!userMessage) return;
  chatBox.appendChild(addingChatToChatbot(userMessage, 'outgoingChat'));

  setTimeout(() => {
    chatBox.appendChild(
      addingChatToChatbot('Hi 👋,<br>How Can I Help You?', 'incomingChat')
    );
    generateResponse(userMessage);
  }, 500);
};
chatInputButton.addEventListener('click', handleChat);
