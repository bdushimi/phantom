
import redis from 'redis';
import { config } from 'dotenv';

config();

let error = false;

const RedisConnection = (() => {
  let instance;

  function createInstance() {
    const redisConnection = redis.createClient(process.env.REDIS_PORT, process.env.REDIS_HOST);
    redisConnection.on('connect', () => {
      console.log('#####            REDIS STORE CONNECTED               #####');
    });

    redisConnection.on('error', (err) => {
      console.log(`Redis error: ${err}`);
      error = err;
    });

    return redisConnection;
  }

  return {
    getInstance() {
      if (!instance) {
        instance = createInstance();
      }
      return instance;
    }
  };
})();

function redisConnectionError() {
  return error;
}

const getBusDetails = (keyPattern) => new Promise((resolve, reject) => {
  if (error) {
    reject(error);
  } else {
    RedisConnection.getInstance().keys(keyPattern, (err, busIds) => {
      if (err) {
        reject(err);
      } else {
        RedisConnection.getInstance().mget(busIds, (err, details) => {
          if (err) {
            reject(err);
          } else {
            resolve(details);
          }
        });
      }
    });
  }
});


const setBusDetails = (busesDetails) => new Promise((resolve, reject) => {
  if (error) {
    reject(error);
  } else {
    // eslint-disable-next-line array-callback-return
    const response = busesDetails.map((busDetails) => {
      const res = RedisConnection.getInstance().set(busDetails.id, JSON.stringify(busDetails));
      if (res) return busDetails;
    });
    resolve(response);
  }
});


const redisConnectionInstance = RedisConnection.getInstance();
export {
  redisConnectionInstance,
  redisConnectionError,
  getBusDetails,
  setBusDetails
};
