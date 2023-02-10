const express = require('express')
const router = express.Router()
const fs = require('fs')
const {db, genid} = require('../db/DbUtils')

router.post('/rich_editor_upload', async (req, res) => {
  if(!req.files){
    res.send({
      "errno": 1, // 只要不等于 0 就行
      "message": "失败信息"
    })
    return
  }

  // 获取上传文件
  let files = req.files 
  let ret_files = []

  // 解析
  for(let file of files) {
    // 获取文件后缀   aaa.jpg  找到最后一个.  进行裁剪jpg
    let file_ext = file.originalname.substring(file.originalname.lastIndexOf(".") +1)
    // 随机文件名
    let file_name = genid.NextId() + "." + file_ext
    // 修改文件名加移动文件
    // fs.renameSync()方法用于将给定旧路径下的文件同步重命名为给定新路径。
    // 如果目标文件已经存在，它将覆盖目标文件。
    // process.cwd()：程序运行的目录的路径
    fs.renameSync( 
      process.cwd() + "/public/upload/temp/" + file.filename, 
      process.cwd() + "/public/upload/" + file_name
    )

    // 保存名字
    ret_files.push("/upload/" + file_name)
  }

  res.send({
    "errno": 0, // 注意：值是数字，不能是字符串
    "data": {
        "url": ret_files[0], // 图片 src ，必须
    }
  })
})

module.exports = router