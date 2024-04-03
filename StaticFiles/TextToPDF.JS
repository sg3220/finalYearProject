const TextToPDF = () => {
  const inputOfTextToPDF = document.getElementById('textareaField').value;
  if (inputOfTextToPDF === '') {
    alert('Please Input Something...Before Making PDF');
  } else {
    const clientResponse = new Object();
    clientResponse['inputOfTextToPDF'] = inputOfTextToPDF.trim();
    fetch('http://127.0.0.1:4000/V1/TextToPDF', {
      method: 'POST',
      headers: { 'Content-tyype': 'application/json' },
      body: JSON.stringify(clientResponse),
    })
      .then((Res) => Res.json())
      .then((JSONData) => {
        alert(JSONData['messageFromServer']);
        document.getElementById('textareaField').value = '';
      })
      .catch((error) => {
        alert(error);
      });
  }
  return false;
};
