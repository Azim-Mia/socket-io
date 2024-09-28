const express =require('express');
const app = express();
const http =require('http');
const expressServer= http.createServer(app);
const {Server} = require('socket.io');
 // web socket is connect start 
const io =new Server(expressServer);
io.on('connection', (socket)=>{
  console.log("user is connected")
  socket.on('disconnect', ()=>{
  console.log("user is Disconnect");
  })
})
 //socket is connect End
//server to client data transfer start
io.on('connection',(socket)=>{
  socket.send("Server send data HI, client");
})

//server to client data transfer End

//realtime data send server start
io.on('connection',(socket)=>{
  setInterval(()=>{
  const d = new Date();
    const t = d.getTime();
    socket.send(t)
  },2000)
})
//realtime data send server End
// custom key
io.on('connection', (socket)=>{
   const t = "custom key used"
  socket.emit('custom',t)
})
//client data recived
io.on('connection', (socket)=>{
  socket.on('message', (msg)=>console.log(msg));
})
//client custom Emit recived
io.on('connection', (socket)=>{
  socket.on('clientemit', (msg)=>console.log(msg));
})
//broadcast data
io.on('connection', (socket)=>{
  io.sockets.emit("broadcast","this is broadcast data send to server");
})
//spacipic data send
const sellSpn = io.of('/sell')
sellSpn.on('connection', (socket)=>{
  sellSpn.emit('spEvent', 'dada send')
})

app.get('/',(req,res)=>{
  res.sendFile(__dirname+"/index.html")
})
expressServer.listen(3000, ()=>{
  console.log(`http://localhost:3000`);
})