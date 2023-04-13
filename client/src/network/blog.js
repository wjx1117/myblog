import instance from "./index";
import qs from 'qs'; // 根据需求是否导入qs模块

// 登录只用传params : {account, password}
const blog = {
  // 添加博客  { title, category_id, content} = req.body
  addBlog (params) {
    return instance.post('http://localhost:8080/blog/_token/add',      
    params,
    {
      headers:{
        'Content-Type':'application/json',
      }
    } )
  },
  // 修改博客  { id, title, category_id, content} = req.body
  updateBlog (params) {
    console.log(params);
    return instance.put('http://localhost:8080/blog/_token/update', 
    params,
    {
      headers:{
        'Content-Type':'application/json',
      }
    } )
  },
  // 删除博客   id = req.query.id 
  deleteBlog (params) {
    return instance.delete(`http://localhost:8080/blog/_token/delete?id=${params}`)
  },
  // 查询博客  { keyword, category_id, page, page_size} = req.query
  searchBlog (params) {
    console.log('http://localhost:8080/blog/search'+params)
    return instance.get('http://localhost:8080/blog/search'+params)
  },
  // 查询单篇博客   {id} = req.query
  detail (params) {
    // console.log('http://localhost:8080/blog/detail'+params);
    return instance.get('http://localhost:8080/blog/detail'+params)
  }
} 

export default blog