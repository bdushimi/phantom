import socketio from 'socket.io';
import { config } from 'dotenv';
import eventEmitter from './EventEmitter';

const trackRequests = []; // This is the room of requests
// enable dotenv configurations
config();

const Socket = (server) => {
  const io = socketio(server);
  io.use((socket, next) => {
    next(null, next);
  });

  io.on('connection', (socket) => {
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

export { Socket, trackRequests };
