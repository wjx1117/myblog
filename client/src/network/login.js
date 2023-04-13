import instance from "./index";
import qs from 'qs'; // 根据需求是否导入qs模块

// post方法必须要使用对提交从参数对象进行序列化的操作，所以这里我们通过node的qs模块来序列化我们的参数。
// 这个很重要，如果没有序列化操作，后台是拿不到你提交的数据的。这就是文章开头我们import QS from 'qs';的原因。
// 如果不明白序列化是什么意思的，就百度一下吧，答案一大堆。

// 登录只用传params : { account, password} = req.body
const login = {
  login (params)  {
    console.log(params);
    // let data = qs.stringify(params)
    // let data = JSON.stringify(params)
    // console.log(data);
    return instance.post(
      'http://localhost:8080/admin/login', 
      // qs.stringify(params),
      params,
      {
        // headers:{'Content-Type': 'multipart/form-data'}
        headers:{'Content-Type':'application/json'}
      }            
      )
    // {headers:{'Content-Type':'application/json; charset=utf-8'}}
    // return instance({
    //   url : 'http://localhost:8080/admin/login',
    //   method : 'post',
    //   data : JSON.stringify(params)
    // })
    // return instance.post(
    //   'http://localhost:8080/admin/login',
    //   params
    // )
  }
}

export default login