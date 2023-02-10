const express = require('express')
const router = express.Router()
const {db, genid} = require('../db/DbUtils')

// 添加接口
// 列表接口  不写分页 因为分类数据量不大
// 修改接口
// 删除接口

// 列表接口
router.get('/list', async (req, res) => {
  const search_sql = 'select * from category'
  let {err, rows} = await db.async.query(search_sql, [])

  if(err == null){
    res.send({
      code: 200,
      msg : '查询成功',
      rows
    })
  } else {
    res.send({
      code : 500,
      msg : '查询失败'
    })
  }
})

// 添加接口
router.post('/_token/add', async (req, res) => {
  let {name} = req.body
  const insert_sql = 'insert into category (id, name) values (?, ?)'
  let {err, rows} = await db.async.query(insert_sql, [genid.NextId(), name])

  if(err == null){
    res.send({
      code: 200,
      msg : '添加成功'
    })
  } else {
    res.send({
      code : 500,
      msg : '添加失败'
    })
  }
})

// 修改接口
router.put('/_token/update', async (req, res) => {
  let {id, name} = req.body
  const update_sql = 'update category set name =? where id=?'
  let {err, rows} = await db.async.query(update_sql, [name, id])

  if(err == null){
    res.send({
      code: 200,
      msg : '修改成功'
    })
  } else {
    res.send({
      code : 500,
      msg : '修改失败'
    })
  }
})

// 删除接口
router.delete('/_token/delete', async (req, res) => {
  let id = req.query.id  // query路径  获取路径的参数  /category/delete?id=xx
  const delete_sql = 'delete from category where id =?'
  let {err, rows} = await db.async.query(delete_sql, [id])

  if(err == null){
    res.send({
      code: 200,
      msg : '删除成功'
    })
  } else {
    res.send({
      code : 500,
      msg : '删除失败'
    })
  }
})

module.exports = router