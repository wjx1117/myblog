// 连接数据库，方便之后操作数据库
const mysql = require('mysql2')
const GenId = require("../utils/SnowFlake")
const genid = new GenId({ WorkerId: 1 });

// 创建连接配置
let db = mysql.createConnection({
  host : 'localhost',  // ip地址
  port : '3306',   // 端口 默认3306
  user: 'root',   // 数据库账号密码
  password : '123456',
  database : 'myblog'  // 数据库名字
})

// 添加属性 
db.async = {}

// promise封装
db.async.query = (sql, params) => {
  return new Promise((resolve, reject) => {
    db.query(sql, params, (err, rows) => {
      resolve({err, rows})
    })
  })
}

module.exports = {db, genid}