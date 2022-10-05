class SocketHandler {
    constructor(socket) {
        this.socket = socket;
        
        console.log('user connected');
    }
    
    disconnect (reason) {
        socket.emit("ban", reason);
        return socket.disconnect();
    }
}


module.exports = SocketHandler;