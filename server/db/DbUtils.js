// 连接数据库，方便之后操作数据库
const mysql = require('mysql2')
const GenId = require("../utils/SnowFlake")
const genid = new GenId({ WorkerId: 1 });

// 创建连接配置
let config = {
  host: 'localhost',  // ip地址
  port: '3306',   // 端口 默认3306
  user: 'root',   // 数据库账号密码
  password: '123456',
  database: 'myblog'  // 数据库名字
}
let db = mysql.createConnection(config)

// function handleDisconnect() {
//   db = mysql.createConnection(config)
//   db.connect( err => {
//     if( err ) {
//       console.log('error when connecting to db:', err);
//       setTimeout(handleDisconnect, 1000)
//       // We introduce a delay before attempting to reconnect,to avoid a hot loop, 
//       // and to allow our node script to process asynchronous requests in the meantime.
//     }                                     
//   })
//   db.on('error', err => {
//     console.log('db error', err);
//     if(err.code == 'PROTOCOL_CONNECTION_LOST') {
//       handleDisconnect()
//     } else {
//       throw err
//     }
//   })
// }

// handleDisconnect()



// 添加属性 
db.async = {}

// promise封装
db.async.query = (sql, params) => {
  return new Promise((resolve, reject) => {
    db.query(sql, params, (err, rows) => {
      resolve({ err, rows })
    })
  })
}

module.exports = { db, genid }


// var mysql = require('mysql'); 
// var mysql_config = { 
//   host: '127.0.0.1', 
//   user: 'root', 
//   password: '123456', 
//   database: 'workstation' 
// }; 
// function handleDisconnection() { 
//   var connection = mysql.createConnection(mysql_config); 
//   connection.connect(function (err) { 
//     if (err) { 
//       setTimeout('handleDisconnection()', 2000); 
//     } 
//   }); 
//   connection.on('error', function (err) { 
//     logger.error('db error', err); 
//     if (err.code === 'PROTOCOL_CONNECTION_LOST') { 
//       logger.error('db error执行重连:' + err.message); 
//       handleDisconnection(); 
//     } else { 
//       throw err; 
//     } 
//   }); 
//   exports.connection = connection; 
// } 
// exports.handleDisconnection = handleDisconnection;