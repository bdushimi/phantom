import { getBusDetails } from '../services/redisService';

process.on('message', async (data) => {
  data.map(async (dataPoint) => {
    const busDetails = await getBusDetails(dataPoint);
    process.send({ dataPoint, busDetails });
  });
});
