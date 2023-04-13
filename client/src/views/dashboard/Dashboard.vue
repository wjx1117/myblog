<template>
  <div class="container">
      <div class="menus">
        <div v-for="(menu, index) in menus" :key="index"  @click="toPage(menu)">
          {{ menu.name }}
        </div>
      </div>
      <div class="main" style="padding:20px;width:100%">
        <router-view></router-view>
      </div>
  </div>
</template>
<script>
export default {
  name: "Dashboard",
  data() {
    return {
      menus : [
        { name : "文章管理", herf : '/dashboard/article'},
        { name : "分类管理", herf : '/dashboard/category'},
        { name : "退出", herf : 'logout'}
      ]
    }
  },
  methods : {
    toPage (menu) {
      if(menu.herf == 'logout') {
        this.$router.push('/login')
      } else {
        this.$router.push(menu.herf)
      }
    }
  },
};
</script>
<style>
.container {
  display: flex;
  color: #313334;
  max-width: 1500px;
  margin: 0 auto;
}

.menus{
  background-color: #eeecec;
  padding: 20px 0;
  box-sizing: border-box;
  line-height: 55px;
  text-align: center;
  width: 180px;
  height: 100vh;
  border-right: 1px solid #dadada;
}
.menus div:hover {
  cursor: pointer;
      color:#409EFF;
    } 
</style>