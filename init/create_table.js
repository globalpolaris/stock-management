const db = require('../config/db');

db.serialize(function () {
  let sql = `CREATE TABLE IF NOT EXISTS products(
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name VARCHAR(64),
        price INTEGER,
        description VARCHAR(255),
        img_link VARCHAR(255)
    )`;
  db.run(sql, (err) => {
    if (err) throw err;
    console.log('Table created');
  });
});

db.close();
