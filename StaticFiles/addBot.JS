const addBotDiv = () => {
  const newDiv = document.createElement('div');
  const currentTime = new Date();
  const botID =
    'bot' +
    currentTime.getFullYear() +
    `0${currentTime.getMonth() + 1}0` +
    currentTime.getDate() +
    currentTime.getHours() +
    currentTime.getMinutes() +
    currentTime.getSeconds();
  newDiv.classList.add('bot', 'droppable');
  newDiv.id = botID;
  newDiv.setAttribute('draggable', 'true');
  newDiv.innerHTML = `<a
  href="http://127.0.0.1:4000/V1/Dashboard?botID=${botID}"
  target="_blank"
>
  <span class="material-symbols-rounded">smart_toy</span>
  <span class="botName">${botID}</span>
</a>`;
  return newDiv;
};
const addBot = () => {
  const dropZone3ID = document.getElementById('showcaseSelectedBotDocument');
  dropZone3ID.appendChild(addBotDiv());
  document.getElementById('brain01').classList.add('disabledCursor');
  document.getElementById('brain01').disabled = true;
  alert('Bot Added For Training');
};
