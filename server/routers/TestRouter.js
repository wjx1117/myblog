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

router.get('/api/order/1', async (req, res) => {
  res.send({
    info : '这是从后台获取的第1个订单',
    updateTime : '2023-04-02 13:43:06'
  })
})
router.get('/api/order/2', async (req, res) => {
  res.send({
    info : '这是从后台获取的第2个订单',
    updateTime : '2023-04-02 14:47:10'
  })
})
router.get('/api/order/3', async (req, res) => {
  res.send({
    info : '这是从后台获取的第3个订单',
    updateTime : '2023-04-02 21:43:13'
  })
})
router.get('/api/order/4', async (req, res) => {
  console.log(req.query);
  res.send({
    info : '这是从后台获取的第4个订单',
    updateTime : '2023-04-02 13:49:23'
  })
})
router.get('/api/order/5', async (req, res) => {
  res.send({
    info : '这是从后台获取的第5个订单',
    updateTime : '2023-04-02 15:43:45'
  })
})
router.get('/api/order/6', async (req, res) => {
  res.send({
    info : '这是从后台获取的第6个订单',
    updateTime : '2023-04-02 19:45:11'
  })
})
router.get('/api/order/7', async (req, res) => {
  res.send({
    info : '这是从后台获取的第7个订单',
    updateTime : '2023-04-02 18:42:53'
  })
})
router.get('/api/order/8', async (req, res) => {
  res.send({
    info : '这是从后台获取的第8个订单',
    updateTime : '2023-04-02 17:43:06'
  })
})
router.get('/api/order/9', async (req, res) => {
  res.send({
    info : '这是从后台获取的第9个订单',
    updateTime : '2023-04-02 20:43:06'
  })
})
router.get('/api/order/10', async (req, res) => {
  res.send({
    info : '这是从后台获取的第10个订单',
    updateTime : '2023-04-02 16:43:06'
  })
})



module.exports = router