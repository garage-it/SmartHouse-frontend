import io from 'socket.io-client';

export default () => {
    const socket = io();

    socket.on('connect', () => {
        const data = {
            name: 'example',
            description: 'rest',
            source: 'client'
        };
        socket.emit('example/rest', data, resData => {
            console.log(resData);
        });
    });
};
