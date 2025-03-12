// which will handle socketio connectons
const io=require('socket.io')(8000,{
    cors:{
        origin:"*",
    },
})


const users={};

io.on('connection',socket=>{ // an instance users can connect
    socket.on('new-user-joined',name=>{
        console.log("New user",name);
        users[socket.id]=name;
        socket.broadcast.emit('user-joined',name);
        console.log(` ${name} joined the chat`);
    });

    socket.on('send',message=>{  // 
        socket.broadcast.emit('receive',{message:message,name:users[socket.id]});
    });
    socket.on('disconnect',message=>{  //
        const username=users[socket.id]
        delete users[socket.id];
        if(username)
        socket.broadcast.emit('left',username);
    });
    
});