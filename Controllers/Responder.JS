const status = require('http-status');
const JSONResponder = (Res, statusCode, uniqueMessage, cookieToken) => {
  const statusMessage = status[statusCode];
  const serverMessage = new Object();
  serverMessage['success'] = true;
  serverMessage['messageFromServer'] =
    uniqueMessage === undefined ? statusMessage : uniqueMessage;
  Res.writeHead(statusCode, statusMessage, {
    'Content-type': 'application/json',
    cookieToken: `${cookieToken === undefined ? '' : cookieToken}`,
  });
  Res.write(JSON.stringify(serverMessage));
  Res.end();
};

const FileResponder = (Res, statusCode, actualFile, actualFileMIMEType) => {
  const statusMessage = status[statusCode];
  Res.writeHead(statusCode, statusMessage, {
    'Content-type': actualFileMIMEType,
  });
  Res.write(actualFile);
  Res.end();
};

module.exports = { JSONResponder, FileResponder };
