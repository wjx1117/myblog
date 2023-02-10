const express = require('express')
const router = express.Router()
const {db, genid} = require('../db/DbUtils')

// 添加博客
router.post('/_token/add', async (req, res) => {
  let { title, category_id, content} = req.body
  let id = genid.NextId()
  let create_time = new Date().getTime()

  const insert_sql = "insert into blog (id, title, category_id, content, create_time) values (?,?,?,?,?)"
  let params = [id, title, category_id, content, create_time]
  let { err, rows} = await db.async.query(insert_sql, params)

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



// 修改博客
router.put('/_token/update', async (req, res) => {
  let { id, title, category_id, content} = req.body

  const update_sql = "update blog set title=?, category_id=?, content=? where id=?"
  let params = [title, category_id, content, id]
  let { err, rows} = await db.async.query(update_sql, params)

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

// 删除博客
router.delete('/_token/delete', async (req, res) => {
  let id = req.query.id  // query路径  获取路径的参数  /category/delete?id=xx
  const delete_sql = 'delete from blog where id =?'
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

// 查询博客
/**
 * keyword  关键字
 * category_id  分类编号
 * 
 * page  页码
 * page_size   分页大小
 */
router.get('/search', async (req, res) => {
  let {keyword, category_id, page, page_size} = req.query

  // 进行判断 前端不用必须传值
  page = page == null ? 1 : page
  page_size = page_size == null ? 10 : page_size
  keyword = keyword == null ? '' : keyword
  category_id = category_id == null ? 0 : category_id

  // 组装 where 条件
  let where_sqls = []
  let params = []

  if(category_id != 0) {
    where_sqls.push(" category_id = ? ")
    params.push(category_id)
  }
  if(keyword != '') {

    // 这里的语句要加括号，否则之后拼接时会造成错误
    // 语句前后最好加空格，隔开，以免之后拼接字符串出现问题
    where_sqls.push(" (title like ? or content like ?) ")
    params.push('%'+ keyword + '%')
    params.push('%'+ keyword + '%')
  }

  // 组装 where 语句
  let where_sql_str = ''
  if(where_sqls.length > 0){
    where_sql_str = ' where ' + where_sqls.join(" and ")
  }
  // where_sqls里：[" category_id = ? ", " (title like ? or content like ?) "]
  // 组装完: where category_id = ? and (title like ? or content like ?)

  // 查分页数据
  let search_sql = 'select * from blog' + where_sql_str + " order by create_time desc limit ?,?"
  let search_params = params.concat((page - 1) * page_size, page_size)
  // 使用 LIMIT 属性来设定返回的记录数  limit通常用来实现分页  从几开始，取几个  
  // 如果是 第 2 页  每页 10 条数据
  // 那么要查询 从数组的 (2 - 1) * 10 开始，取10个

  // 查数据总数
  // COUNT(expression) 	返回查询的记录总数，expression 参数是一个字段或者 * 号
  // 不用 as 取别名的话，数据名为 count(*)  也可以使用["count(*)"] 数组下标
  let search_count_sql = "select count (*) as count from blog " + where_sql_str
  let search_count_params = params

  let search = await db.async.query(search_sql, search_params)
  let count = await db.async.query(search_count_sql, search_count_params)

  // console.log(count);

  if(search.err == null && count.err == null){
    res.send({
      code : 200,
      msg : '查询成功',
      count : count.rows[0].count,
      data : {
        keyword,
        category_id,
        page,
        page_size,
        rows : search.rows
      }
    })
  } else {
    res.send({
      code: 500,
      msg : '查询失败'
    })
  }
})


module.exports = router