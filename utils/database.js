const sqlite3 = require('sqlite3').verbose();

const DBSOURCE = 'db.sqlite';


let sqliteConnectionError = {};

const SQLiteConnection = (() => {
  let instance;

  function createInstance() {
    const db = new sqlite3.Database(DBSOURCE, (err) => {
      if (err) {
        sqliteConnectionError = { error: true, message: err.message };
      } else {
        console.log('Connected to the SQlite database.');
      }
    });
    return db;
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


function dbConnectionError() {
  return sqliteConnectionError;
}
const db = SQLiteConnection.getInstance();


const loadBusesData = (busesDetails) => new Promise((resolve, reject) => {
  db.run(`CREATE TABLE bus (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            busID text UNIQUE, 
            busDetails text, 
            CONSTRAINT busID_unique UNIQUE (busID)
            )`, (err) => {
    if (err) {
      reject(new Error(err.message));
    } else {
      // Table just created, creating some rows
      const insert = 'INSERT INTO bus (busID, busDetails) VALUES (?,?)';
      busesDetails.map((busDetails) => {
        db.run(insert, [busDetails.id, JSON.stringify(busDetails)]);
      });

      resolve(busesDetails);
    }
  });
});


const getBusDetailsByID = (busID) => new Promise((resolve, reject) => {
  const sql = 'select * from bus where busID = ?';
  db.get(sql, busID, (err, row) => {
    if (err) {
      reject(new Error(err.message));
    } else {
      resolve(row);
    }
  });
});


const getBusesDetails = () => new Promise((resolve, reject) => {
  const sql = 'select * from bus';
  const params = [];
  db.all(sql, params, (err, rows) => {
    if (err) {
      reject(new Error(err.message));
    } else {
      resolve(rows);
    }
  });
});

const updateBusDetails = (data) => new Promise((resolve, reject) => {
  data.map((busDetails) => {
    db.run(
      `UPDATE bus set 
           busDetails = ? 
           WHERE busID = ?`,
      [JSON.stringify(busDetails), busDetails.id],
      (err, result) => {
        if (err) {
          reject(new Error(err.message));
        }
      }
    );
  });
  resolve(data);
});

export {
  db,
  dbConnectionError,
  loadBusesData,
  getBusDetailsByID,
  getBusesDetails,
  updateBusDetails
};
