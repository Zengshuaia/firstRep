<template>
  <div class="home">
  <Header/>
  <el-container class="content">
        <Menu/>
    <el-container>
      <el-main>
        <Bread/>
        <div class="cont">
          <router-view></router-view> 
        </div>
      </el-main>
      <el-footer><Footer/></el-footer>
    </el-container> 
  </el-container>

  </div>
</template>

<script>
import Header from '../components/common/Header.vue'
import Footer from '../components/common/Footer.vue'
import Menu from '../components/common/Menu.vue'
import Bread from '../components/common/Breadcrumb.vue'
export default {
  name: 'HelloWorld',
  data(){
    return{

    }
  },
  components:{
    Header,
    Menu,
    Footer,
    Bread
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
.home{
  width:100%;
  height:100%;
  .content{
    position:absolute;
    width:100%;
    top:60px;
    bottom:0;
    .cont{
      margin:20px 0px;
    }
  }
}
</style>
