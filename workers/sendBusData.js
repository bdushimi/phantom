import { getBusDetails } from '../services/redisService';

process.on('message', (data) => {
  data.map(async (dataPoint, id) => {
    console.log(`${id}. Track Request : ${dataPoint}`);
    const busDetails = await getBusDetails(dataPoint);
    process.send({ dataPoint, busDetails });
  });
});
