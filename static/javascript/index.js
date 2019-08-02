$( () => {
    // <--- Socket --->
    var socket = io(); // Constructs socket from index.ejs link and server 'connection'

    // <--- Variable --->
    let htmlData = null;

    // button click to update counter
    $('#count').click( () => {
        socket.emit('count')
    })

    // button click to reset count
    $('#reset').click( () => {
        socket.emit('reset')
    })

    // retrieves updated count from server
    socket.on('updateCounter', data => {
        console.log(`count received from server: ${data.count}`)
        if (data.count == 1) {
            htmlData = `The button has been pushed ${data.count} time`;
        } else {
            htmlData = `The button has been pushed ${data.count} times`
        }
        $('#updateNum').html(htmlData); // updates DOM
    })

    // retrieves reset from server
    socket.on('resetCount', data => {
        console.log('Reset request received from server!');
        htmlData = `The button has been pushed ${data.count} times`
        $('#updateNum').html(htmlData); // updates DOM
    })
});