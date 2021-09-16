const sqlite3 = require('sqlite3').verbose();
const dbFile = 'D:/GlobalPolaris/DB/stock.db';

let db = new sqlite3.Database(dbFile, sqlite3.OPEN_READWRITE, (err) => {
  if (err) throw err;
  console.log('Connected to SQLite Database');
});

module.exports = db;
