const FileSystem = require('fs');
const { jsPDF } = require('jspdf');
const formidable = require('formidable');
const { JSONResponder } = require('./Responder.JS');

const fileNameExtractor = (clientURL) => {
  console.log(clientURL);
  return clientURL.split('/V1/')[1];
};

const bodyExtractor = (Res, Req, statusCode, statusMessage) => {
  let Body = '';
  Req.on('data', (chunkData) => {
    Body = Body + chunkData;
  });
  Req.on('end', () => {
    JSONBody = JSON.parse(Body);
    console.log(JSONBody);
    // const serverMessage = new Object();
    // serverMessage['success'] = true;
    // serverMessage['messageFromServer'] = 'Log In Successfull';
    // Res.writeHead(302, 'Log In Successfull', {
    //   'Content-type': 'application/json',
    //   Location: '/V1/Auth/Account/Dashboard',
    //   cookieToken: `123456qwerty`,
    // });
    Res.writeHead(302, { Location: '/V1/Auth/Account/Dashboard' });
    Res.end();

    // Res.end();

    return JSONBody;
  });
};

const textToPDFGenerator = (Req, Res) => {
  let Body = '';
  Req.on('data', (chunkData) => {
    Body = Body + chunkData;
  });
  Req.on('end', () => {
    JSONBody = JSON.parse(Body);
    console.log(JSONBody);
    const doc = new jsPDF();
    const currentTime = new Date();
    const fileName =
      'AVA' +
      currentTime.getFullYear() +
      `0${currentTime.getMonth() + 1}0` +
      currentTime.getDate() +
      currentTime.getHours() +
      currentTime.getMinutes() +
      currentTime.getSeconds() +
      '.pdf';
    const path = __dirname + `/StaticFiles/${fileName}`;

    doc.text(JSONBody['inputOfTextToPDF'], 10, 10);
    doc.save('StaticFiles/' + fileName);
    const serverResponse = new Object();
    serverResponse['success'] = true;
    serverResponse['messageFromServer'] = 'PDF Creation Successfull';
    Res.writeHead(200, 'OK', { 'Content-type': 'application/json' });
    Res.write(JSON.stringify(serverResponse));
    Res.end();
  });
};

const handleFiles = (Req, Res) => {
  const form = new formidable.IncomingForm();
  form.parse(Req, (err, fields, files) => {
    if (err) {
      const serverResponse = new Object();
      serverResponse['success'] = false;
      serverResponse['messageFromServer'] = 'Could Not Save PDF...Try Again';
      Res.writeHead(500, 'Internal Server Error', {
        'Content-type': 'application/json',
      });
      Res.write(JSON.stringify(serverResponse));
      Res.end();
      return;
    }
    console.log(typeof files);
    console.log(files['files'][0]);

    const fileName =
      'AVA' +
      currentTime.getFullYear() +
      `0${currentTime.getMonth() + 1}0` +
      currentTime.getDate() +
      currentTime.getHours() +
      currentTime.getMinutes() +
      currentTime.getSeconds() +
      '.pdf';
    const newPath = __dirname + '/StaticFiles/' + file.name;

    fs.rename(oldPath, newPath, (err) => {
      if (err) {
        const serverResponse = new Object();
        serverResponse['success'] = false;
        serverResponse['messageFromServer'] = 'Could Not Save PDF...Try Again';
        Res.writeHead(500, 'Internal Server Error', {
          'Content-Type': 'application/json',
        });
        Res.write(JSON.stringify(serverResponse));
        Res.end();
        return;
      }
      const serverResponse = new Object();
      serverResponse['success'] = true;
      serverResponse['messageFromServer'] = 'Files Saved';
      Res.writeHead(200, 'OK', { 'Content-Type': 'application/json' });
      Res.write(JSON.stringify(serverResponse));
      Res.end('File uploaded successfully.');
    });
  });
};

module.exports = {
  fileNameExtractor,
  bodyExtractor,
  textToPDFGenerator,
  handleFiles,
};
