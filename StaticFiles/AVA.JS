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
const API_KEY = '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';
const generateResponse = (userMessage) => {
  const API_URL = 'https://api.openai.com/v1/chat/completions';
  const requestOptions = {
    method: 'POST',
    headers: {
      'Content-type': 'application/json',
      Authorization: `Bearer ${API_KEY}`,
    },
    body: JSON.stringify({
      model: 'gpt-3.5-turbo',
      messages: [{ role: 'user', content: `${userMessage}` }],
    }),
  };
  fetch(API_URL, requestOptions)
    .then((Res) => Res.json())
    .then((JSONData) => {
      console.log(JSONData);
    })
    .catch((err) => {
      console.log(err);
    });
};
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
