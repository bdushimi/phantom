import socketIO from 'socket.io';
import http from 'http';
import { config } from 'dotenv';
import eventEmitter from './EventEmitter';

const trackRequests = []; // This is the room of requests
// enable dotenv configurations
config();

const SocketIO = (app) => {
  http.createServer(app);
  const port = process.env.SOCKET_PORT;
  const io = socketIO.listen(app.listen(port, () => {
    // eslint-disable-next-line no-console
    console.log(`Socket.IO running → PORT ${port}`);
  }));
  io.use((socket, next) => {
    next(null, next);
  });

  io.on('connection', (socket) => {
    console.log(`New Client Connected ${socket.connected}`);
    console.log(`New Client nsp ${socket.nsp.name}`);

    eventEmitter.on('bus_updates', (busID, busDetails) => {
      console.log(`Sending bus_updates ${busID} with ${busDetails}`);
      io.sockets.in(busID).emit('bus_updates', busDetails);
    });
    socket.on('TRACK', (data) => {
      console.log(`New Track Request for ${data}`);
      if (!trackRequests.includes(data.busID)) {
        trackRequests.push(data.busID);
        socket.join(data.busID);
      } else {
        socket.join(data.busID);
      }
    });
  });
};

export { SocketIO, trackRequests };
