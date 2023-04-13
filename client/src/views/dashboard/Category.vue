<template>
  <div>
    <el-button type="text" @click="isShowDialog = true">添加</el-button>
    <el-table :data="tableData" border fit style="width: 100%" >
      <el-table-column prop="id" label="编 号" header-align="center" align="center"> </el-table-column>
      <el-table-column prop="name" label="名 称" header-align="center" align="center"> </el-table-column>
      <el-table-column label="操 作" header-align="center" align="center">
        <template slot-scope="scope">
          <el-button icon="el-icon-edit" size="small" @click="editTable(scope.row)"></el-button>
          <el-button icon="el-icon-delete" size="small" @click="delTable(scope.row)"></el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-dialog title="添加分类" :visible.sync="isShowDialog" width="30%">
    <el-input v-model="input" placeholder="请输入分类名称"></el-input>
      <span slot="footer" class="dialog-footer">
        <el-button @click="isShowDialog = false">取 消</el-button>
        <el-button type="primary" @click="add">提 交</el-button>
      </span>
    </el-dialog>

    <el-dialog title="修改分类" :visible.sync="isUpdateDialog" width="30%">
    <el-input v-model="input" placeholder="请输入分类名称"></el-input>
      <span slot="footer" class="dialog-footer">
        <el-button @click="isUpdateDialog = false">取 消</el-button>
        <el-button type="primary" @click="update">提 交</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
export default {
  name: "Category",
  data() {
    return {
      tableData: [],
      isShowDialog : false,
      isUpdateDialog : false,
      input : '',
      updateId : ''
    };
  },
  methods: {
    showList() {
      this.$api.category.listCategory().then((res) => {
        this.tableData = res.data.rows;
        // console.log(this.tableData[0].id);
      });
    },
    add() {
      console.log(this.input);
      let params = {
        name : this.input
      }
      this.$api.category.addCategory(params).then(res => {
        // console.log(res.data);
        if(res.data.code == 200) {
          this.$message({
            message: '添加成功',
            type: 'success',
            center: true
          });
          this.showList()
        } else {
          this.$message({
            message: '请先登录',
            type: 'error',
            center : true
          });
        }
      }).catch(err => { })
      this.isShowDialog = false
    },
    delTable (tdata) {
      this.$confirm('确认删除？')
          .then(_ => {
            this.$api.category.deleteCategory(tdata.id).then(res => {
              console.log(res);
              if(res.data.code == 200) {
                this.$message({
                  message : '删除成功',
                  type : 'success',
                  center : true
                })
                this.showList()
              } else {
                this.$message({
                  message: '请先登录',
                  type: 'error',
                  center : true
                });
              }
            }).catch(err => { console.log(err); })
          })
          .catch(_ => {});
      
    },
    editTable(tdata) {
      this.isUpdateDialog = true
      this.updateId = tdata.id
      console.log(this.updateId);
    },
    update() {
      let params = {
        id : this.updateId,
        name : this.input
      }
      console.log(params);
      this.$api.category.updateCategory(params).then(res => {
        console.log(res);
        if(res.data.code == 200) {
          this.$message({
            message : '修改成功',
            type : 'success',
            center : true
          })
          this.showList()
        } else {
          this.$message({
            message: '请先登录',
            type: 'error',
            center : true
          });
        }
      }).catch(err => { console.log(err); })
      this.isUpdateDialog = false
    }
  },
  mounted() {
    this.showList();
  },
};
</script>
<style>
</style>