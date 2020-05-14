import { getBusDetails, setBusDetails } from '../services/redisService';


const moveBus = (async () => {
  const busesDetails = await getBusDetails('RA?????');
  // eslint-disable-next-line array-callback-return
  const updatedBusesDetails = busesDetails.map((bus) => {
    const busDetails = JSON.parse(bus);
    if (busDetails.status === 'moving') {
      if (busDetails.coverage < busDetails.route.miles) busDetails.coverage += (busDetails.speed / 120);
      if (busDetails.coverage >= busDetails.route.miles) busDetails.coverage = 0;
      return busDetails;
    }
  });
  // console.log(updatedBusesDetails);
  setBusDetails(updatedBusesDetails);
})();


module.exports = moveBus;
