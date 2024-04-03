const FileSystem = require('fs');
const mimeTypes = require('mime-types');

const { JSONResponder, FileResponder } = require('./Controllers/Responder.JS');
const {
  fileNameExtractor,
  bodyExtractor,
  textToPDFGenerator,
  handleFiles,
} = require('./Controllers/Utilities.JS');

const Router = (Req, Res) => {
  const clientURL = Req.url;
  const clientMethod = Req.method;
  console.log('❕clientURL: ', clientURL);
  console.log('❕clientMethod: ', clientMethod);
  if (clientURL === '/' && clientMethod === 'GET') {
    JSONResponder(Res, 200, 'Ping Successful');
  } else if (clientURL === '/V1/LandingLogIn' && clientMethod === 'GET') {
    const HTMLFile = FileSystem.readFileSync('./StaticFiles/Entry.HTML');
    FileResponder(Res, 200, HTMLFile, 'text/html');
  } else if (clientURL === '/V1/LandingSignUp' && clientMethod === 'GET') {
    const HTMLFile = FileSystem.readFileSync('./StaticFiles/Entry.HTML');
    FileResponder(Res, 200, HTMLFile, 'text/html');
  } else if (clientURL === '/V1/SignUp' && clientMethod === 'POST') {
    const JSONData = bodyExtractor(Res, Req, 201, 'Sign Up Successfull');
    console.log(JSONData);
  } else if (clientURL === '/V1/LogIn' && clientMethod === 'POST') {
    const JSONData = bodyExtractor(Res, Req, 202, 'Log In Successfull');
    console.log(JSONData);
  } else if (clientURL.startsWith('/V1/LogOut') && clientMethod === 'GET') {
    JSONResponder(Res, 200, 'LogOut Successful', 'garbage');
  } else if (clientURL === '/V1/Dashboard' && clientMethod === 'GET') {
    const HTMLFile = FileSystem.readFileSync('./StaticFiles/Dashboard.HTML');
    FileResponder(Res, 200, HTMLFile, 'text/html');
  } else if (clientURL === '/V1/TextToPDF' && clientMethod === 'POST') {
    textToPDFGenerator(Req, Res);
  } else if (clientURL === '/V1/UploadFile' && clientMethod === 'POST') {
    handleFiles(Req, Res);
  } else if (clientURL.startsWith('/V1') && clientMethod === 'GET') {
    const MIMEType = mimeTypes.lookup(Req.url);
    const requestedFileName = fileNameExtractor(Req.url);
    let requestedFile;
    try {
      requestedFile = FileSystem.readFileSync(
        `./StaticFiles/${requestedFileName}`
      );
    } catch (error) {
      if (error.code === 'ENOENT') {
        console.log('❗File Not Found');
      }
    }
    FileResponder(Res, 200, requestedFile, MIMEType);
  } else {
    JSONResponder(Res, 404, 'Page/Method Does Not Exist');
  }
};

module.exports = { Router };
