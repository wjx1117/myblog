<template>
  <div > 
    <ul v-for="item in orders" v-if="orders.length !==0 ">
      <li>{{item.info}} - {{item.updateTime}} </li>
    </ul>
    <button @click="update()">刷新</button>
  </div>
</template>
<script>
import axios from 'axios'
export default {
  name : 'dd',
      data () {
        return {
          orders : [],
          in : {}
        }
      },
      methods : {
        getOrder (i) {
          axios.get(
            `http://localhost:8080/test/api/order/${i+1}`
          ).then( (res) => {
              let info = {}  
              info.id = i + 1
              info.info = res.data.info;
              info.updateTime = res.data.updateTime; 

              // this.in = info 
              // console.log(this.in);
              this.$set(this.orders,i,info)         
          }).catch( err => {
            console.log(err)
          })
        },
        getAll () {
          // return new Promise((resolve, reject) => {
            for(let i = 0; i < 10; i ++) {
              this.getOrder(i)
              // this.$set(this.orders,i,this.in)  
            }
          //   resolve()
          // })
        },
        get(){
          for(let i = 0; i < 10; i ++) {
              this.getOrder1(i)
            }
        },
        getOrder1 (i) {
          axios.get(
            `http://localhost:8080/test/api/order/${i+1}`
          ).then( (res) => {
              let info = {}  
              info.id = i + 1
              info.info = res.data.info;
              info.updateTime = res.data.updateTime; 
              this.orders[i]  = info

              // this.in = info 
              // console.log(this.in);
              // this.$set(this.orders,i,info)         
          }).catch( err => {
            console.log(err)
          })
        },
        sortOrder(){
          this.orders.sort(function(a, b) {
            return b.updateTime< a.updateTime? -1 : 1
          })
        },
        async update () {
          // let _this = this
          // Promise.resolve().then(res => {
          //   _this.getAll()
          // }).then( res => {
          //   _this.sortOrder()
          // })
          // this.getAll().then( res => {
          //   _this.sortOrder()
          // })
            // this.getAll()
            this.get()
          // }
          // // console.log(333);
          // await this.getAll()
          // // console.log(444);
          this.sortOrder()
        }
      },
      created (){
        this.getAll()
      },
};
</script>
<style>
</style>