const FileSystem = require('fs');
const mimeTypes = require('mime-types');

const { JSONResponder, FileResponder } = require('./Controllers/Responder.JS');
const {
  fileNameExtractor,
  bodyExtractor,
} = require('./Controllers/Utilities.JS');

const Router = (Req, Res) => {
  const clientURL = Req.url;
  const clientMethod = Req.method;
  console.log('❕clientURL: ', clientURL);
  console.log('❕clientMethod: ', clientMethod);
  if (clientURL === '/' && clientMethod === 'GET') {
    JSONResponder(Res, 200, 'Ping Successful');
  } else if (
    clientURL === '/V1/Auth/Account/LandingLogIn' &&
    clientMethod === 'GET'
  ) {
    const HTMLFile = FileSystem.readFileSync('./StaticFiles/Entry.HTML');
    FileResponder(Res, 200, HTMLFile, 'text/html');
  } else if (
    clientURL === '/V1/Auth/Account/LandingSignUp' &&
    clientMethod === 'GET'
  ) {
    const HTMLFile = FileSystem.readFileSync('./StaticFiles/Entry.HTML');
    FileResponder(Res, 200, HTMLFile, 'text/html');
  } else if (
    clientURL === '/V1/Auth/Account/SignUp' &&
    clientMethod === 'POST'
  ) {
    const JSONData = bodyExtractor(Res, Req, 201, 'Sign Up Successfull');
    console.log(JSONData);
  } else if (
    clientURL === '/V1/Auth/Account/LogIn' &&
    clientMethod === 'POST'
  ) {
    const JSONData = bodyExtractor(Res, Req, 202, 'Log In Successfull');
    console.log(JSONData);
  } else if (
    clientURL.startsWith('/V1/Auth/Account/LogOut') &&
    clientMethod === 'GET'
  ) {
    JSONResponder(Res, 200, 'LogOut Successful', 'garbage');
  } else if (
    clientURL === '/V1/Auth/Account/Dashboard' &&
    clientMethod === 'GET'
  ) {
    const HTMLFile = FileSystem.readFileSync('./StaticFiles/Dashboard.HTML');
    FileResponder(Res, 200, HTMLFile, 'text/html');
  } else if (
    clientURL.startsWith('/V1/Auth/Account') &&
    clientMethod === 'GET'
  ) {
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
