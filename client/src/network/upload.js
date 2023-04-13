import instance from "./index";
import qs from 'qs'; // 根据需求是否导入qs模块

const upload = {
  // 上传图片  files = req.files 
  addBlog (params) {
    // return instance.post('http://localhost:8080/upload/rich_editor_upload', qs.stringify(params))
  },

} 

export default upload