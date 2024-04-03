const UploadFile = () => {
  const fileInput = document.getElementById('file');
  const files = fileInput.files;
  const formData = new FormData();

  for (let i = 0; i < files.length; i++) {
    const file = files[i];
    formData.append('files', file);
  }

  fetch('http://127.0.0.1:4000/V1/UploadFile', {
    method: 'POST',
    body: formData,
  })
    .then((response) => {
      if (response.ok) {
        return response.json();
      }
      throw new Error('Network response was not ok.');
    })
    .then((JSONData) => {
      alert(JSONData['messageFromServer']);
    })
    .catch((error) => {
      alert('Error uploading files.');
    });
};
