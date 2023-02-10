const express = require('express')
const router = express.Router()
const {db, genid} = require('../db/DbUtils')

// 测试
// 要在app.js里注册路由  app.use('/test', require('./routers/TestRouter'))
router.get('/test', async (req, res) => {
  // 1. 普通写法   会造成回调地狱
  // db.query('select * from admin',[],(err, res)=> {
  //   console.log(res);
  // })

  // 2. promise写法
  // db.async.query('select * from admin', [], (err, res) => {
    // console.log(res);
  // })

  // 3. 同步写法
  // 3.1 把回调函数变成可异步执行 添加async
  let out = await db.async.query('select * from admin', [])

  res.send({
    id : genid.NextId(),
    out
  })
})

module.exports = router