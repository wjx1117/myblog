const express = require('express') // 引入
const multer = require('multer')
const mysql = require('mysql2')
const { db } = require('./db/DbUtils')
const path = require("path")
// 实例化
const app = express();

const port = 8080;


// 跨域请求
app.use(function (req, res, next) {
  // 设置允许跨域的域名，*代表允许任意域名跨域
  res.header("Access-Control-Allow-Origin", "*");
  // 允许的header类型
  res.header("Access-Control-Allow-Headers", "*");
  // 跨域允许的请求方式
  res.header("Access-Control-Allow-Methods", "DELETE,PUT,POST,GET,OPTIONS");
  if(req.method == "OPTIONS") res.sendStatus(200);  // 让options尝试请求快速结束
  else next();
});


// 中间介
app.use(express.json())  // json支持
// 上传的临时目录
const update = multer({
  dest : './public/upload/temp'
})
// 允许所有接口有上传功能
app.use(update.any())
// 设置静态资源路径
app.use(express.static(path.join(__dirname, "public")))


// all:所有接口 类似中间件
// 验证约定：ADMIN_TOKEN_PATH
// 原先：category/add     添加token验证：category/_token/add
// 只要路径中含有_token 都会进行token验证
const ADMIN_TOKEN_PATH = "/_token"
app.all("*", async (req, res, next) => {
  if(req.path.indexOf(ADMIN_TOKEN_PATH) > -1) {
    let {token} = req.headers
    // let token = request.META.get("HTTP_AUTHORIZATION")

    let admin_token_sql = "select * from admin where token = ?"
    let admin_res = await db.async.query(admin_token_sql, [token])
    if(admin_res.err != null || admin_res.rows.length == 0) {
      res.send({
        code : 403,
        msg : '请先登录'
      })
      return
    } else next()
  } else {
    next()
  }
})

// 注册路由
app.use('/test', require('./routers/TestRouter'))
app.use('/admin', require('./routers/AdminRouter'))
app.use('/category', require('./routers/CategoryRouter'))
app.use('/blog', require('./routers/BlogRouter'))
app.use('/upload', require('./routers/UploadRouter'))

// 接口
app.get('/',(req,res) => {
  res.send("hello world!")
})

app.listen(port,() => {
  console.log(`启动成功 : http://localhost:${port}/`);  // 模板语法``使用反引号，传入端口
})

/*
multer:处理上传的中间介
sqlite3：数据库
uuid：很难重复的id生成，生成唯一的id
*/ 