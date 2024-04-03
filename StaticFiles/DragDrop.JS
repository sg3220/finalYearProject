const item = document.getElementById('faithful-dog');
const dropZone1 = document.getElementById('showcasePreviouslyTrainedBots');
const dropZone2 = document.getElementById(
  'showcasePreviouslyUploadedDocuments'
);
const dropZone3 = document.getElementById('showcaseSelectedBotDocument');

item.addEventListener('dragstart', (event) => {
  console.log(event);
});

dropZone1.addEventListener('dragover', (event) => {
  event.preventDefault();
});

dropZone1.addEventListener('drop', (event) => {
  dropZone1.prepend(item);
});

dropZone2.addEventListener('dragover', (event) => {
  event.preventDefault();
});

dropZone2.addEventListener('drop', (event) => {
  dropZone2.prepend(item);
});

dropZone3.addEventListener('dragover', (event) => {
  event.preventDefault();
});

dropZone3.addEventListener('drop', (event) => {
  dropZone3.prepend(item);
});
