import express from 'express'
import http from 'http'
import socket, {Server} from 'socket.io'

//Infra
const app = express()
const server = http.createServer(app)
const io = new Server(server, {cors: {origin: 'http://localhost:5173'}});

//set port
const PORT = 3000

//log
server.listen(PORT, () =>  console.log("server is running"))

//listen to event from frontend
io.on('connection', (socket) => {
    console.log('a user connected ' + socket.id)

    //listen to disconnect
    socket.on('disconnect', reason => {
        console.log('user disconnected ' + socket.id);
      });

    //listen to nickname
    socket.on('set_nickname', nickname => {
        socket.data.nickname = nickname
        console.log('user nickname', socket.data.nickname)
      })

      //listen to messages
    socket.on('message', message => {
    console.log(socket.data.message)
    
        //reflect to front
        io.emit('reveived', {
        message,
        nickname: socket.data.nickname,
        createdAt: new Date()
        })
    })
})



