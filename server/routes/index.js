module.exports = socket => {
    socket.on('example/rest', (data, clientCb) => {
        console.log(data);
        data.source = 'server';
        clientCb(Object.assign({}, data));
    });
}
