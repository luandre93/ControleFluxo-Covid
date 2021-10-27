import { createServer } from "http";
import { Server } from "socket.io";
import { join, dirname } from 'path'
import { fileURLToPath } from 'url'
import { Low, JSONFile } from 'lowdb'
import lodash from 'lodash'
const httpServer = createServer();
const io = new Server(httpServer);
import h from "./libs/utils.js";
const __dirname = dirname(fileURLToPath(import.meta.url));
const file = join(__dirname + "/db", 'db.json')
const adapter = new JSONFile(file)
const db = new Low(adapter)
await db.read()
db.chain = lodash.chain(db.data)

var cliente = ""
var clients = {};

io.on("connection", function (socket) {

    socket.on("join", function (name) {
        clients[socket.id] = name;
        socket.join(name)
        cliente = db.chain.get('Lojas').find({ Loja: clients[socket.id] }).value()
        io.in(clients[socket.id]).emit('chat', JSON.stringify(cliente))
        console.log(cliente);
    })

    socket.on("send", function (msg) {
        cliente = { "Loja": parseInt(clients[socket.id]), "Message": JSON.parse(msg).Message, "Limite": JSON.parse(msg).Limite }
        console.log(cliente)
        db.chain.get('Lojas')
            .find({ Loja: clients[socket.id] })
            .assign({ "Message": JSON.parse(msg).Message, "Limite": JSON.parse(msg).Limite })
            .commit();
        db.write()
        io.in(clients[socket.id]).emit('chat', JSON.stringify(cliente))
        // io.emit("chat", JSON.stringify(cliente));
    });

    socket.on("disconnect", function () {
        console.log("Disconnect");
        io.emit("update", clients[socket.id] + " has left the server.");
        delete clients[socket.id];
    });
});

await httpServer.listen(8081, () => console.log(h.cabecalho() + ' => Servidor Iniciado na Porta 8081'))



