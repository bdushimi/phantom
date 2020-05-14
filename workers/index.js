import workerFarm from 'worker-farm';

const workers = {};
workers.moveBus = workerFarm(require.resolve('./moveBus'));
export default workers;
