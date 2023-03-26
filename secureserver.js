const ws = require('ws');
const fs = require('fs');
const portSocket = 8445;

const wss = new ws.Server({
    host: 'xx.xxx.xxx.xx',
    port: portSocket,
    cert: fs.readFileSync('./school.online.pem'),
    key: fs.readFileSync('./school.online.key.pem')
});

wss.on('connection', function connection(ws) {

    ws.on('message', (message) => {
        parseMessage(message, ws);
    })

    ws.on('close', () => {
        console.log('closed')
    })

    console.log('connected');

});

console.log('Server started at ' + portSocket);

function parseMessage(msg, ws) {

    let data = JSON.parse(msg);

    if (ws.id == undefined) {
        ws.id = data.room;
    }

    wss.clients.forEach(function each(client) {

        if (client.id == data.room) {
            if (data.info) {
                client.send(data.info.toString());
            }
        }
    })

}

// end