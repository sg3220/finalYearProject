const { JSONResponder } = require('./Responder.JS');

const fileNameExtractor = (clientURL) => {
  console.log(clientURL);
  return clientURL.split('/V1/Auth/Account/')[1];
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

module.exports = { fileNameExtractor, bodyExtractor };
