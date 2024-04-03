const loadBotDiv = (i) => {
  const newDiv = document.createElement('div');
  newDiv.classList.add('bot', 'droppable');
  botID = `bot2024040323010${i}`;
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
const loadDocDiv = (i) => {
  const newDiv = document.createElement('div');
  newDiv.classList.add('document', 'droppable');
  docID = `doc2024040323010${i}`;
  newDiv.id = docID;
  newDiv.setAttribute('draggable', 'true');
  newDiv.innerHTML = `                        <a href="http://127.0.0.1:4000/V1/Dashboard?${docID}" target="_blank">
  <span class="material-symbols-rounded">
      article
  </span>
  <span class="docName">${docID}</span>
</a>`;
  return newDiv;
};
const loadBot = () => {
  const dropZone1ID = document.getElementById('showcasePreviouslyTrainedBots');
  const dropZone2ID = document.getElementById(
    'showcasePreviouslyUploadedDocuments'
  );
  for (let i = 0; i < 5; i++) {
    dropZone1ID.appendChild(loadBotDiv(i));
    dropZone2ID.appendChild(loadDocDiv(i));
  }
  document.getElementById('brain02').classList.add('disabledCursor');
  document.getElementById('brain02').disabled = true;
  alert('Previously Created Bots Loaded');
};
