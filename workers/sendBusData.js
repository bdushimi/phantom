import { getBusDetailsByID } from '../utils/database';

process.on('message', async (data) => {
  data.map(async (busID) => {
    const busDetails = await getBusDetailsByID(busID);
    process.send({ busID, busDetails });
  });
});
