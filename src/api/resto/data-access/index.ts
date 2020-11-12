import mysql from 'mysql'
import makeRestoDb from './resto-db'

const mysqlConnection = mysql.createPool  ({
    connectionLimit : 10,
    host : 'localhost' ,
    user : 'root',
    password : '',
    database : 'dbrestaurant',
    multipleStatements : true
  });
  
  mysqlConnection.getConnection((err) => {
      if (!err)
          console.log('DB koneksi sukses');
      else
          console.log('DB koneksi error : ' + JSON.stringify(err,undefined, 2));
  });

  const restoDb = makeRestoDb({mysqlConnection})

  export default restoDb