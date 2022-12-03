<template>
    <div class="studentList">
        <!-- 查询表单 -->
        <el-form :inline="true" :model="formInline" class="demo-form-inline" size="small">
        <el-form-item label="姓名">
            <el-input v-model="formInline.name" placeholder="请输入姓名"></el-input>
        </el-form-item>
        <el-form-item >
            <el-button type="primary" @click="find">查询</el-button>
        </el-form-item>
        <el-form-item>
            <el-button type="primary" @click="reset">重置</el-button>
        </el-form-item>
        </el-form>

        <!-- 数据列表 -->
            <el-table :data="comData" stripe style="width: 100%">
                <el-table-column prop="name" label="姓名" align="center"></el-table-column>
                <el-table-column prop="age" label="年龄" align="center"></el-table-column>
                <el-table-column prop="sex_text" label="性别" align="center"></el-table-column>
                <el-table-column prop="number" label="学号" align="center"></el-table-column>
                <el-table-column prop="class" label="班级" align="center"></el-table-column>
                <el-table-column prop="state_text" label="状态" align="center"></el-table-column>
                <el-table-column prop="address" label="地址" align="center"></el-table-column>
                <el-table-column prop="phone" label="电话" align="center"></el-table-column>
                <el-table-column  label="操作" align="center">
                    <template slot-scope="scope">
                        <!-- 这个是传递每一行的数据 -->
                        <el-button type="danger" size="mini"  icon="el-icon-delete" @click="DelData(scope.row)">
                        </el-button>
                    </template>
                </el-table-column>
            </el-table>
            <el-pagination
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page="currentPage"
                :page-sizes="[5, 10, 20, 25]"
                :page-size="pageSize"
                layout="total, sizes, prev, pager, next, jumper"
                :total="total">
            </el-pagination>
    </div>
</template>
<script>
import { students,Del,Find } from '../../api/api.js'

export default{
    data(){
        return{
            tableData: [],
            currentPage:1,//当前页数
            pageSize:10,//每页条数，
            total:0,//总条数
            formInline: {
          name: '',
        }
        }
    },
    created(){
        this.getData();
    },
    computed:{
        comData(){
            return this.tableData.slice((this.currentPage-1)*this.pageSize,this.currentPage*this.pageSize);
        }
    },
    methods:{
        find() {//查询方法
        Find(this.formInline.name).then(res=>[
            this.tableData=res.data.data,
            this.total=res.data.total,
        ]).catch(err=>[
            console.log(err)
        ])
      },
      reset(){
        this.formInline={},
        this.getData(this,this.formInline)
      },
        getData(params){
            students(params).then(res=>{
                this.tableData=res.data.data;
                this.total=res.data.total;
                this.tableData.forEach(item=>{
                    item.sex===1?item.sex_text='男':item.sex_text='女';
                    item.state==="1"?item.state_text="已入学":item.state==="2"?item.state_text="未入学":item.state_text="休学";
                })
            });
        },
        DelData(row){//删除方法
            Del(row.id).then(res=>{
                console.log(res);
                if(res.status===200){
                    this.$message({message:'删除成功',type:'success'});
                    this.getData();
                }
            }).catch(err=>{
                console.error(err);
            })
        },
        handleSizeChange(val) {//条数改变
        this.pageSize=val;
        this.currentPage=1;//跳回第一页
      },
      handleCurrentChange(val) {//页数改变
        this.currentPage=val;
      }
    }
}
</script>
<style lang="less" scoped>
.studentList{
   .demo-form-inline,.el-form-item{
        text-align: left;
    }
    .el-pagination{
        margin-top:20px;
        text-align: left;
    }
}
</style>