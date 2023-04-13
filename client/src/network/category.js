import instance from "./index";
import qs from 'qs'; // 根据需求是否导入qs模块
import store from "@/store";

// 登录只用传params : {account, password}
const category = {
  // 添加分类  {name} = req.body
  addCategory (params) {
    return instance.post(
      'http://localhost:8080/category/_token/add',
      params,
      {
        headers:{
          'Content-Type':'application/json',
          // token : store.state.token
        }
      } 
    )
  },
  // 修改分类  {id, name} = req.body
  updateCategory (params) {
    console.log(params);
    return instance.put('http://localhost:8080/category/_token/update', params)
  },
  // 删除分类   id = req.query.id
  deleteCategory (params) {
    return instance.delete(`http://localhost:8080/category/_token/delete?id=${params}`)
  },
  // 分类列表   
  listCategory () {
    return instance.get('http://localhost:8080/category/list')
  }
} 

export default category