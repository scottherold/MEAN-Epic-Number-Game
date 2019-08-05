// This file handles routing to lighten sever load
module.exports = (app, server) => {
    // <--- Constructors --->
    var io = require('socket.io')(server); // constructs socket listener from server parameter

    // <--- Variable --->
    let counter = 0; // for counting

    // <--- Routing --->
    // ** GET routes **
    // root
    app.get('/', (req, res) => {
        res.render('index');
    })

    // <--- Sockets --->
    io.on('connection', socket => {
        // send data on connect
        socket.emit('updateCounter', {count: counter}); // emits updated counter to new connection only

        // count emitted from client
        socket.on('count', () => {
            console.log('count request received from client');
            counter++; // iterate counter
            io.emit('updateCounter', {count: counter}); // broadcasts updated count to all connected sockets
        });

        // reset emitted from client
        socket.on('reset', () => {
            console.log('reset request received from client');
            counter = 0; // set counter to zero
            io.emit('resetCount', {count: counter}); // broadcasts 0 count to all connected sockets
        })
    });
}