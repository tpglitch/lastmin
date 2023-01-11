const express = require("express");
const http = require( "http" );

let CONF = require('./conf');

const SocketHandler = require("./class/SocketHandler");

const app = express();

const server = http.createServer(app);

const { Server } = require("socket.io");

const io = new Server(server);

app.set('view engine', 'ejs');

app.get("/api/language", function (req, res) {
    let lang = req.query.locale || "en_us";
    
    let langfile = require(`./lang/${lang}.js`);
    
    let ld = langfile;
    
    res.send(ld);
});

app.get("/api/v2/get/publ/APPDESC", function (req, res) {
    return CONF.APPDESC;
});

app.get("/", (req, res) => {
    res.render('index');
});


io.on('connection', (socket) => {
  socket.on('chat message', (d) => {
    io.emit('chat message', d);
  });
});

server.listen(process.env.PORT || 3000, () => {
    console.log("Listening");
});