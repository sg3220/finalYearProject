const HTTP = require('http');
const { Router } = require('./Routing.JS');
require('dotenv').config();

const Server = HTTP.createServer((Req, Res) => {
  Router(Req, Res);
});

Server.listen(process.env.PORT, () => {
  console.log('❕A.V.A. Bot I/O Server Running On Port', process.env.PORT);
});
