const express = require('express') // 引入
const multer = require('multer')
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
  res.header("Access-C ontrol-Allow-Methods", "DELETE,PUT,POST,GET,OPTIONS");
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
// GitHub 官方表示，从2020年 10 月 1 日起，在该平台上创建的所有新的源代码仓库将默认被命名为 "main"，而不是原先的"master"。