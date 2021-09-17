const db = require('../config/db');

const insert = (product) => {
  let sql = `INSERT INTO products (name, price, description, img_link) VALUES ('${product.name}', '${product.price}', '${product.description}', '${product.imglink}')`;
  db.run(sql, (err) => {
    if (err) throw err;
    console.log('1 Record inserted');
  });
};

const getProducts = (id) => {
  return new Promise((resolve, reject) => {
    let sql = `SELECT * FROM products ${id ? `Where id=${id}` : ''}`;
    db.all(sql, (err, row) => {
      if (err) {
        reject(err);
      } else {
        console.log(row);
        resolve(row);
      }
    });
  });
};

const updateProduct = (product) => {
  return new Promise((resolve, reject) => {
    db.serialize(() => {
      let sql = 'SELECT * FROM products where id=?';
      let productId = parseInt(product.id);
      let reqStatus;
      db.get(sql, [productId], (err, row) => {
        if (err) reject(err);
        if (row) {
          sql = `UPDATE products SET name='${product.name}', price=${product.price}, description='${product.description}', img_link='${product.img_link}' WHERE id=?`;
          db.run(sql, [productId], (err) => {
            console.log(err);
            if (!err) {
              reqStatus = 200;
              resolve(reqStatus);
            } else {
              reqStatus = 500;
              reject(reqStatus);
            }
          });
        } else {
          reject(404);
        }
      });
    });
  });
};

const deleteProduct = (id) => {
  console.log(id);
  return new Promise((resolve, reject) => {
    db.serialize(() => {
      let prodIds = id.join(',');
      let sql = `DELETE FROM products WHERE id in(${prodIds})`;
      console.log(sql);
      db.run(sql, [], (err) => {
        if (!err) {
          console.log(`Deleted products with id: ${prodIds}`);
          resolve(200);
        } else {
          console.error(err);
          reject(500);
        }
      });
    });
  });
};

// db.serialize(() => {
//   let sql = `SELECT id, name, price from products`;
//   // let id = 1;
//   db.each(sql, [], (err, row) => {
//     if (err) return console.error(err);
//     return row
//       ? console.log(row.id, row.name, row.price)
//       : console.log(`No data with id ${id}`);
//   });
// });

module.exports = { insert, getProducts, updateProduct, deleteProduct };
