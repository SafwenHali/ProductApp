const mariadb = require('mariadb');

const pool = mariadb.createPool({
  host: '70.38.21.234', // or '127.0.0.1'
  user: 'fleurdo1_pres127',
  password: '-p(]Q32SOw@BmB4@',
  database: 'fleurdo1_pres127',
  connectionLimit: 5
});

module.exports = pool;

//UPDATE `psdr_stock_available` SET `quantity` = '30' WHERE `psdr_stock_available`.`id_stock_available` = 75;