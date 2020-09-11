const app = require('express')()
const http = require('http')
const server = http.createServer(app)
const socket = require('socket.io')
const io = socket(server)

io.on("connection", socket => {
    socket.emit("Your ID", socket.id)
    socket.on("Send message", body => {
        io.emit("Message", body);
    })
})

server.listen(5000);