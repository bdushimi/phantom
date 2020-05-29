// eslint-disable-next-line import/no-named-as-default
import data from '../utils/data';
import { loadBusesData, getBusDetailsByID, getBusesDetails } from '../utils/database';

class AppController {
  static getIndexPage(req, res) {
    res.json({ status: 200, message: 'Welcome Message' });
  }

  static async loadBusesData(req, res) {
    try {
      const response = await loadBusesData(data);
      res.json({ response });
    } catch (error) {
      res.json({ error: error.message });
    }
  }

  static async getBusDetailsByID(req, res) {
    const { id } = req.params;
    try {
      const response = await getBusDetailsByID(id);
      res.json(response);
    } catch (error) {
      res.json({ error: error.message });
    }
  }

  static async getBusesData(req, res) {
    try {
      const response = await getBusesDetails();
      res.json({ response });
    } catch (error) {
      res.json({ error: error.message });
    }
  }
}

export default AppController;
