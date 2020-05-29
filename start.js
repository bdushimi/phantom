// Require Redis Here
import { config } from 'dotenv';
import cron from 'node-cron';
import childProcess from 'child_process';
import { Socket, trackRequests } from './services/socket';
import eventEmitter from './services/EventEmitter';


// Start our app!
import server from './server';

// enable dotenv configurations
config();

// Child_Process to simulate the bus movement
let movementInProgress = false;
const moveBusProcess = childProcess.fork('./workers/moveBus');

// cron job to send bus movement notifications
cron.schedule('*/2 * * * * *', () => {
  if (!movementInProgress) {
    movementInProgress = true;
    moveBusProcess.send({ movementInProgress: true });
  }
});

moveBusProcess.on('message', (data) => {
  console.log(`MovementInProgress : ${data.movementInProgress}`);
  movementInProgress = false;
});


// Child_Process to send bus movement updates
const sendBusUpdatesProcess = childProcess.fork('./workers/sendBusData');
cron.schedule('*/2 * * * * *', () => {
  if (trackRequests.length > 0) sendBusUpdatesProcess.send(trackRequests);
});

sendBusUpdatesProcess.on('message', (data) => {
  eventEmitter.emit('bus_updates', data.busID, data.busDetails);
});


// Start Server
const PORT = process.env.PORT || 5000;
const serverInstance = server.listen(PORT, () => {
  console.log(`Express running → PORT ${PORT}`);
});

Socket(serverInstance);
