const express = require('express')
const router = express.Router()
const {v4 : uuidv4} = require('uuid')
const {db, genid} = require('../db/DbUtils')

router.post('/login',async (req, res) => {
  let { account, password} = req.body
  let { err, rows} = await db.async.query('select * from admin where account=? and password=?', [account, password])

  console.log(req.body);
  // console.log(rows);
  if(err == null && rows.length > 0){
    // 成功找到用户数据
    // 使用uuid设置token
    let login_token = uuidv4()
    // 写入数据库
    let update_token_sql = 'UPDATE admin SET token=? where id=?'
    await db.async.query(update_token_sql,[login_token, rows[0].id])

    let admin_info = rows[0]
    admin_info.token = login_token
    admin_info.password = ''
    // 返回给前端的数据不应包含password

    res.send({
      code : 200,
      msg : '登陆成功',
      data : admin_info
    })
  }else {
    res.send({
      code : 500,
      msg : '登陆失败',
      err,
      length : rows.length,
      data : rows
    })
  }
})

module.exports = router