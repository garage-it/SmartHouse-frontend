'use strict';

function initSensorEvents(socket) {
    // TODO need to discuss rule eslint about 'use-before-define'
    function setUpdateInterval() {
        return setInterval(() => {
            socket.emit('event', {
                value: ~~(Math.random() * 100),
                description: 'Its fake description'
            });
        }, 1000);
    }

    let updateInterval;
    socket.on('subscribe', () => {
        if (!updateInterval) {
            updateInterval = setUpdateInterval();
        }
    });

    socket.on('unsubscribe', () => {
        clearInterval(updateInterval);
    });
}

module.exports = {
    initSensorEvents
};
