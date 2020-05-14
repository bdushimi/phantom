// eslint-disable-next-line import/no-named-as-default
import data from '../utils/data';
import { getBusDetails, setBusDetails } from '../services/redisService';


class AppController {
  static getIndexPage(req, res) {
    res.json({ status: 200, message: 'Welcome Message' });
  }

  static async loadData(req, res) {
    const response = await setBusDetails(data);
    res.json({ response });
  }

  static async getBusData(req, res) {
    const { id } = req.params;
    let response;
    switch (id) {
      case '1':
        response = await getBusDetails('RAC628A');
        res.json(response);
        break;
      case '2':
        response = await getBusDetails('RAD739B');
        res.json(response);
        break;
      default:
        response = 'Invalid ID';
        res.json({ response });
        break;
    }
  }

  static async getBusesData(req, res) {
    const response = await getBusDetails('RA?????');
    res.json({ response });
  }
}

export default AppController;
