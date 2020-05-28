
import { getBusesDetails, updateBusDetails } from '../utils/database';


const moveBus = (async () => {
  const busesDetails = await getBusesDetails();
  // eslint-disable-next-line array-callback-return
  const updatedBusesDetails = busesDetails.map((bus) => {
    const busDetails = JSON.parse(bus.busDetails);
    console.log(busDetails.status);
    if (busDetails.status === 'still') {
      // Set the bus status to moving
      busDetails.status = 'moving';
      console.log(busDetails.status);
      // Update busStops miles & ordering
      if (busDetails.route.destination === busDetails.route.name.substring(0, busDetails.route.destination.length)) {
        // Reverse the order of endpoints
        busDetails.route.busStops.reverse();
        // Update the busstop miles
        busDetails.route.busStops.map((busStop) => {
          busStop.miles = busDetails.route.miles - busStop.miles;
          return busStop;
        });
      }
    } else if (busDetails.status === 'moving') {
      if (busDetails.coverage < busDetails.route.miles) {
        busDetails.coverage += (busDetails.speed / 20);
        if (busDetails.coverage > busDetails.route.miles) busDetails.coverage = busDetails.route.miles;
      } else if (busDetails.coverage >= busDetails.route.miles && busDetails.twoWay) {
        // set the coverage to 0;
        busDetails.coverage = 0;

        // set the status to still
        // busDetails.status = 'still';

        // Change the bus direction
        const { origin } = busDetails.route;
        const { destination } = busDetails.route;
        busDetails.route.origin = destination;
        busDetails.route.destination = origin;

        // Update busStops miles & ordering
        // Reverse the order of endpoints
        busDetails.route.busStops.reverse();
        // Update the busstop miles
        busDetails.route.busStops.map((busStop) => {
          busStop.miles = busDetails.route.miles - busStop.miles;
          return busStop;
        });
      }
    }

    return busDetails;
  });
  updateBusDetails(updatedBusesDetails);
})();


module.exports = moveBus;
