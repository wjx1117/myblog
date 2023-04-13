<template>
  <div>
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="文章列表" name="list" :key="key">
        <div  v-for="blog in blogList.value">
          <el-card class="card" shadow="hover">                          
            <div slot="header" class="header clearfix">               
              <span>{{blog.title}}</span>             
            </div>             
            <div class="text item">{{blog.content}}</div>    
            <div class="footer" align="center">
              <div class="createtime">发布时间：{{ blog.create_time }}</div>
              <el-button @click="toUpdate(blog)" class="btn1" icon="el-icon-edit" size="small" ></el-button>
              <el-button @click="toDelete(blog)" class="btn1" icon="el-icon-delete" size="small" ></el-button>
            </div>
          </el-card>
        </div>
        <div class="fly" @click="toPage(pageNum)" v-for="pageNum in pageInfo.page_count" >
            <div :style="`color : `+ ( pageNum == pageInfo.page ? 'red' : '')">{{ pageNum }}</div>
        </div>
      </el-tab-pane>

      <el-tab-pane label="添加文章" name="add">
        <el-form ref="form"  >
          <el-form-item label="文章标题">
            <el-input v-model="addArticle.title"></el-input>
          </el-form-item>

          <el-form-item label="分类">
            <el-select v-model:value="addArticle.category_id" placeholder="请选择">
              <el-option 
                v-for="item in categoryOptions.value"
                :key="item.value"
                :label="item.lable"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="内容">
            <rich-text-editor 
              v-model="addArticle.content" 
              :modelValue="addArticle.content" 
              @updateValue="valueChange">
            </rich-text-editor>
          </el-form-item>

          <el-form-item label="">
            <el-button type="primary" @click="add">提 交</el-button>
          </el-form-item>
        </el-form>
      </el-tab-pane>

      <el-tab-pane label="修改文章" name="update">
        <el-form ref="form"  >
          <el-form-item label="文章标题">
            <el-input v-model="updateArticle.title"></el-input>
          </el-form-item>

          <el-form-item label="分类">
            <el-select v-model:value="updateArticle.category_id" placeholder="请选择">
              <el-option 
                v-for="item in categoryOptions.value"
                :key="item.value"
                :label="item.lable"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="内容">
            <rich-text-editor 
              ref="editt"
              v-model="updateArticle.content" 
              :modelValue="updateArticle.content"
              @updateV="valueUpdate" >
            </rich-text-editor>
          </el-form-item>
          <el-form-item label="">
            <el-button type="primary" @click="update">提 交</el-button>
          </el-form-item>
        </el-form>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>
<script>
import RichTextEditor from '../../components/RichTextEditor.vue'
export default {
  name: "Article",
  components : {
    RichTextEditor
  },
  data() {
    return {
      key : 1,
      activeName: "list",
      addArticle : {
        category_id : '',
        title : '',
        content : '我是初始数据'
      },
      categoryOptions : [],
      blogList : [],
      pageInfo : {
        page : 1,
        page_size : 3,
        page_count : 0,  // 多少页
        count : 0        // 文章总数
      },
      updateArticle : {
        id : '',
        category_id : '',
        title : '',
        content : ''
      },
    };
  },
  methods: {
    handleClick(tab, event) {
      // console.log(tab, event);
    },
    valueChange (value){
      // console.log(value);
      this.addArticle.content = value
    },
    valueUpdate(value) {
      // console.log(value);
      this.updateArticle.content = value
    },
    loadCategorys () {
      this.$api.category.listCategory().then((res) => {
        this.categoryOptions.value = res.data.rows.map( item => {
          return {
            lable : item.name,
            value : item.id
          }
        })
        // console.log(this.categoryOptions.value);
        // for(let i=0;i<this.categoryOptions.value.length;i++){
        //   console.log(this.categoryOptions.value[i].value,this.categoryOptions.value[i].lable);
        // }
      });
    },
    add() {
      this.$api.blog.addBlog(this.addArticle).then(res => {
        // console.log(res.data);
        if(res.data.code == 200) {
          this.$message({
            message: '添加成功',
            type: 'success',
            center: true
          });
          this.addArticle.title = ''
          this.addArticle.content = ''
          this.addArticle.category_id = ''
        } else {
          this.$message({
            message: '请先登录',
            type: 'error',
            center : true
          });
        }
      }).catch(err => { })
    },
    loadBlogs() {
      let params = `?page=${this.pageInfo.page}&page_size=${this.pageInfo.page_size}`
      // console.log(params);
      this.$api.blog.searchBlog(params).then((res) => {
        // console.log(res.data);
        let temp = res.data.data.rows;
        for(let row of temp) {
          row.content += '...'
          let d = new Date(row.create_time)
          row.create_time = `${d.getFullYear()}年${d.getMonth() +1}月${d.getDate()}日`
        }
        this.blogList.value = temp;
        this.pageInfo.count = res.data.count
        this.pageInfo.page_count = 
          parseInt(this.pageInfo.count / this.pageInfo.page_size) 
          + (this.pageInfo.count % this.pageInfo.page_size >0 ? 1 : 0)
        // console.log(this.blogList.value);
        // this.$router.go(0)
      })
    },
    toPage(num) {
      this.pageInfo.page = num
      this.loadBlogs()
    },
    toUpdate(blog) {
      this.activeName = 'update'
      let params = `?id=${blog.id}`
      this.$api.blog.detail(params).then(res => {
        // console.log(res.data.rows[0]);
        this.updateArticle.id = blog.id
        this.updateArticle.title = res.data.rows[0].title
        this.updateArticle.content = res.data.rows[0].content
        this.updateArticle.category_id = res.data.rows[0].category_id
        // editor.txt.html(this.updateArticle.content)
        this.$refs.editt.editor.setHtml(this.updateArticle.content)
        // console.log(this.updateArticle.content);
      }).catch(err => {console.log(err);})
    },
    update () {
      console.log(this.updateArticle);
      this.$api.blog.updateBlog(this.updateArticle).then(res => {
      //   this.loadBlogs()
      // }).then(res => {
        console.log(res.data);
        if(res.data.code == 200) {
          this.$message({
            message: '修改成功',
            type: 'success',
            center: true
          });
          
          // this.loadBlogs()
          // this.key + 1
          // this.$forceUpdate();
          // this.updateArticle.title = ''
          // this.updateArticle.content = ''
          // this.updateArticle.category_id = ''
          // this.activeName = 'list'
        } else {
          this.$message({
            message: '请先登录',
            type: 'error',
            center : true
          });
        }
        
        this.activeName = 'list'
        // this.loadBlogs()
      }).catch(err => { })
      this.loadBlogs()
      this.key + 1
      this.activeName = 'list'
    },
    toDelete(blog) {
      this.$confirm('确认删除？')
          .then(_ => {
            this.$api.blog.deleteBlog(blog.id).then(res => {
              console.log(res);
              if(res.data.code == 200) {
                this.$message({
                  message : '删除成功',
                  type : 'success',
                  center : true
                })
                // this.loadBlogs()
              } else {
                this.$message({
                  message: '请先登录',
                  type: 'error',
                  center : true
                });
              }
            }).catch(err => { console.log(err); })
          }).catch(_ => {});
          this.loadBlogs()
    }
  },
  mounted () {
    // console.log(this.blogList.value);
    this.loadBlogs()
    this.loadCategorys()
  },
  created() {
    // this.loadBlogs()
  }
};
</script>
<style>
  .text {
    font-size: 14px;
  }

  .item {
    margin-bottom: 18px;
  }

  .clearfix:before,
  .clearfix:after {
    display: table;
    content: "";
  }
  .clearfix:after {
    clear: both
  }

  .card {
    /* width: 480px; */
    margin-bottom: 10px;
    border-color: rgb(58, 63, 67);
  }
  .el-card__header {
    padding: 10px 15px;
  }
  .header {
    font-size: 30px;
    font-weight: 900;
  }
  .createtime {
    float: left;
    font-size: 12px;
  }
  .btn1 {
    float: left;
    right : 20px;
    border-bottom: 15px;
  }
  .fly {
    float : left;
    padding: 2px;
    border: 0.5px solid;
  }
</style>