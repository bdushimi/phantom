// Require Redis Here
import { config } from 'dotenv';
import cron from 'node-cron';
import childProcess from 'child_process';
import { SocketIO, trackRequests } from './services/socket';
import eventEmitter from './services/EventEmitter';


// Start our app!
import server from './server';


SocketIO(server);

// enable dotenv configurations
config();


cron.schedule('*/5 * * * * *', () => {
  const forkedProcess = childProcess.fork('./workers/moveBus');
});


cron.schedule('*/5 * * * * *', () => {
  const forkedProcess = childProcess.fork('./workers/sendBusData');
  if (trackRequests.length > 0) forkedProcess.send(trackRequests);
  forkedProcess.on('message', (data) => {
    eventEmitter.emit('bus_updates', data.busID, data.busDetails);
  });
});

// Start Server
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`Express running → PORT ${PORT}`);
});
