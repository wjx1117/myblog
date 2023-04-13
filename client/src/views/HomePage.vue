<template>
  <div class="container">
    <div class="nav">
      <div @click="toHomepage">首页</div>
      <div>
        <!-- <el-select v-model:value="selectOption" placeholder="请选择">
          <el-option
            v-for="item in options.value"
            :key="item.value"
            :label="item.lable"
            :value="item.value">
            <div>{{ item.lable }}</div> 
          </el-option>  不显示数据🤬🤬🤬🤬🤬
        </el-select> -->
        <el-dropdown @command="handleCommand" trigger="click">
          <span class="el-dropdown-link" >
            分类<i class="el-icon-arrow-down el-icon--right"></i>
            <div>{{ select }}</div>
          </span>
          <el-dropdown-menu slot="dropdown">
            <!-- @click="selectCategory(item)"  -->
            <el-dropdown-item 
              v-model="selectOption"
              @click="console.log(item)"
              v-for="item in options.value" :key="item.value" :command="item.lable">
                {{ item.lable }}
            </el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
      <div @click="toDashboard">后台</div>
    </div>
    <el-divider></el-divider>
    <div  v-for="blog in blogList.value">
          <el-card class="card" shadow="hover">                          
            <div slot="header" class="header clearfix">               
              <span>{{blog.title}}</span>             
            </div>             
            <div class="text item">{{blog.content}}</div>    
            <div class="footer" align="center">
              <div class="createtime">发布时间：{{ blog.create_time }}</div>
            </div>
          </el-card>
        </div>

        <div class="fly" @click="toPage(pageNum)" v-for="pageNum in pageInfo.page_count" >
            <div :style="`color : `+ ( pageNum == pageInfo.page ? 'red' : '')">{{ pageNum }}</div>
        </div>
        <div>
            <el-pagination
            background
            layout="prev, pager, next"
            :total="pageInfo.page_count * 10">
          </el-pagination>
        </div>

    <div class="footer">
      <el-divider></el-divider>
      <div class="iscenter">Power by xxxx</div>
      <div class="iscenter">XICP备xxxxx号-1</div>
    </div>
  </div>
</template>
<script>
export default {
  name: "HomePage",
  data() {
    return {
      options: [
        // {
        //   value : '',
        //   lable : ''
        // }
      ],
      selectOption: "",
      blogList : [],
      pageInfo : {
        page : 1,
        page_size : 3,
        page_count : 0,  // 多少页
        count : 0,        // 文章总数
        keyword : ''
      },
    };
  },
  methods: {
    loadCategorys() {
      this.$api.category.listCategory().then((res) => {
        console.log(res.data);
        this.options.value = res.data.rows.map((item) => {
          return {
            lable: item.name,
            value: item.id,
          };
        });
        console.log(this.options.value);
        this.$forceUpdate();
        // console.log(this.options.value);
        // for(let i=0;i<this.options.value.length;i++){
        //   console.log(this.options.value[i].value,this.options.value[i].lable);
        // }
      });
    },
    toDashboard() {
      // console.log(this.options.value);
      this.$router.push('/login')
    },
    toHomepage() {
      this.$router.push("/");
    },
    selectCategory(item) {
      console.log(2222);
      console.log(item.lable,11111);
    },
    loadBlogs() {
      let params = `?keyword=${this.pageInfo.keyword}&page=${this.pageInfo.page}&page_size=${this.pageInfo.page_size}`
      console.log(params);
      this.$api.blog.searchBlog(params).then((res) => {
        console.log(res.data);
        let temp = res.data.data.rows;
        for(let row of temp) {
          row.content += '...'
          let d = new Date(row.create_time)
          row.create_time = `${d.getFullYear()}年${d.getMonth() +1}月${d.getDate()}日`
        }
        this.blogList.value = temp;
        this.pageInfo.count = res.data.count
        console.log(res.data.count);
        this.pageInfo.page_count = 
          parseInt(this.pageInfo.count / this.pageInfo.page_size) 
          + (this.pageInfo.count % this.pageInfo.page_size >0 ? 1 : 0)
        // console.log(this.blogList.value);
        // this.$router.go(0)
      })
    },
    handleCommand(command) {
      console.log(command);
    }
  },
  mounted() {
    console.log(11111,this.options.value);
    this.loadCategorys();
    this.loadBlogs() 
    console.log(this.options.value);
  },
  created() {
    // this.loadCategorys();
    // console.log(this.options.value);
  },
  computed : {
    select : function(){
      
    }
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
.container {
  width: 1200px;
  margin: 0 auto;
}
.nav {
  display: flex;
  font-size: 20px;
  padding-top: 15px;
  color: #64676a;
}
.nav div {
  margin-right: 15px;
}
.nav div:hover {
  cursor: pointer;
  color: #409eff;
}
.el-dropdown-link {
    cursor: pointer;
    color: #409EFF;
  }
  .el-icon-arrow-down {
    font-size: 12px;
  }

  .iscenter{
    text-align: center;
    line-height: 25px;
    color: #64676a;
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