import express, { Request, Response } from 'express'
import * as http from 'http'
import { join } from 'path'
import { Server } from 'socket.io'

const app = express()
const server = http.createServer(app)
const io = new Server(server)

app.get('/', (_: Request, res: Response) => {
  res.sendFile(join(__dirname, '..', 'public', 'index.html'))
})

io.on('connection', (socket) => {
  console.log('A new user has connected')
  socket.on('disconnect', () => {
    console.log('user disconnected')
  })
  socket.on('message', (msg: string) => {
    io.emit('message', msg)
  })
})

server.listen(3000, () => {
  console.log('listening on *:3000')
})