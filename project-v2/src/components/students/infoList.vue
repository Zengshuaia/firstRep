<template>
    <div class="infoList">
        <el-form :inline="true"  class="demo-form-inline" size="small">
        <el-form-item >
            <el-button type="primary" @click="AddStudent">新增</el-button>
        </el-form-item>
        </el-form>

       <!-- 数据列表 -->
            <el-table :data="cmpData" stripe style="width: 100%">
                <el-table-column prop="name" label="姓名" align="center"></el-table-column>
                <el-table-column prop="age" label="年龄" align="center"></el-table-column>
                <el-table-column prop="sex_text" label="性别" align="center"></el-table-column>
                <el-table-column prop="father" label="父亲" align="center"></el-table-column>
                <el-table-column prop="mather" label="母亲" align="center"></el-table-column>
                <el-table-column prop="date"  label="入学时间" align="center"></el-table-column>
                <el-table-column prop="address" label="家庭地址" align="center"></el-table-column>
                <el-table-column prop="phone" label="联系电话" align="center"></el-table-column>
                <el-table-column  label="操作" align="center">
                    <template slot-scope="scope">
                        <!-- 这个是传递每一行的数据  -->
                        <el-button type="danger" size="mini"  icon="el-icon-edit" @click="Edit(scope.row)">
                        </el-button> 
                        <el-button type="danger" size="mini"  icon="el-icon-delete" @click="DelData(scope.row)">
                        </el-button> 
                    </template>
                </el-table-column>
            </el-table>
            <el-dialog :title="state?'添加学生信息':'修改学生信息'" :visible.sync="dialogFormVisible" width="500px">
            <el-form :model="form" :rules="rules" ref="form" >
                <el-form-item label="姓名 " :label-width="formLabelWidth" prop="name">
                <el-input v-model="form.name" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="年龄 " :label-width="formLabelWidth" prop="age">
                <el-input v-model="form.age" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="性别 " :label-width="formLabelWidth" prop="sex">
                <el-radio v-model="form.sex" label="1">男</el-radio>
                <el-radio v-model="form.sex" label="2">女</el-radio>
                </el-form-item>
                <el-form-item label="父亲 " :label-width="formLabelWidth" prop="father">
                <el-input v-model="form.father" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="母亲 " :label-width="formLabelWidth" prop="mather">
                <el-input v-model="form.mather" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="入学时间 " :label-width="formLabelWidth" prop="time">
                    <el-date-picker
                    type="date"
                    v-model="form.time"
                    value-format="yyyy-MM-dd">
                    </el-date-picker>
                </el-form-item>
                <el-form-item label="家庭地址 " :label-width="formLabelWidth" prop="address">
                <el-input v-model="form.address" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="联系电话 " :label-width="formLabelWidth" prop="phone">
                <el-input v-model="form.phone" autocomplete="off"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="closeInfo('form')">取 消</el-button>
                <el-button type="primary" @click="sure('form')">确 定</el-button>
            </div>
            </el-dialog>
            <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="currentPage"
            :page-sizes="[5, 10, 15, 20]"
            :page-size="pageSize"
            layout="total, sizes, prev, pager, next, jumper"
            :total="total">
            </el-pagination>
    </div>
</template>
<script>
import {Info,AddOrUpdate,InfoDel} from '../../api/api'
import {getData} from '../../utils/table'
export default{
    data(){
        return{
            currentPage:1,
            pageSize:5,
            tableData:[],
            dialogFormVisible:false,
            form:{
                name:'',
                age:null,
                sex:'1',
                father:'',
                mather:'',
                time:'',
                address:'',
                phone:''
            },
            rules:{
                name:[{required:true,message:'请输入姓名'}],
                age:[{required:true,message:'请输入年龄'}],
                sex:[{required:true,message:'请输入性别'}],
                time:[{required:true,message:'请输入入学时间'}],
                address:[{required:true,message:'请输入家庭住址'}],
                phone:[{required:true,message:'请输入联系电话'}]
            },
            formLabelWidth:"80px",
            total:0,
            state:true
        }
    },
    computed:{
        cmpData(){
          return  this.tableData.slice((this.currentPage-1)*this.pageSize,this.currentPage*this.pageSize);
        }
    },
    methods:{
        Edit(row){//修改方法
            this.dialogFormVisible=true;
            this.form={...row};
            this.state=false;
            //这是点击修改按钮弹出修改界面，并不是保存框
        },
        DelData(row){
            console.log(row)
            this.$alert('你确定要删除吗？','提示',{
                confirmButtonText:'确定',
                callback:()=>{
                    InfoDel(row.id).then(res=>{
                if(res.data.status===200){
                    this.$message({message:'删除成功',type:'success'});
                    this.getData();
                }
            }).catch(err=>{
                console.error(err);
            })
                }
            })
            
        },
        AddStudent(){//新增按钮点击事件
            this.state=true;
            this.dialogFormVisible=true;
            this.form={
                name:'',
                age:null,
                sex:'1',
                father:'',
                mather:'',
                time:'',
                address:'',
                phone:'',
                id:''
            }
            
        },
        closeInfo(form){
            this.dialogFormVisible=false;
            this.$refs[form].resetFields();
        },
        getData(){
            Info().then(res=>{
                if(res.data.status===200){
                    this.tableData=res.data.data;
                this.total=res.data.total;
                this.tableData.forEach(item=>{
                    item.sex==='1'?item.sex_text='男':item.sex_text='女'
                })
                }
            }).catch(err=>{
                console.error(err);
            })
        }
        ,
        sure(form){//新增信息按钮确认时间
            this.$refs[form].validate(valid=>{
                if(valid){//验证成功
                    if(this.state){
                        AddOrUpdate('post',this.form).then(res=>{
                    if(res.status===200){
                        this.getData();
                        this.dialogFormVisible=false;//关闭新增窗口
                        
                        this.$refs['form'].resetFields();
                        this.$message({message:'新增成功',type:'success'});
                    }
                   }).catch(err=>[
                    console.log(err)
                   ])
                }else{
                    AddOrUpdate('put',this.form).then(res=>{
                        if(res.data.status===200){
                            this.$message({message:'修改成功',type:'success'});
                            this.dialogFormVisible=false;
                            this.$refs['form'].resetFields();
                        }
                    }).catch(err=>[
                        console.error(err)
                    ])
                }
                }
            })
        },
        handleSizeChange(val) {//条数改变
        this.pageSize=val;
        this.currentPage=1;
      },
      handleCurrentChange(val) {//页数改变
        this.currentPage=val;
      }
    },
    created(){
        getData(this,'/users/students/info')
    },
    
}
</script>
<style lang="less" scoped>
.infoList{
    .demo-form-inline,.el-form-item {
        text-align: left;
    }
    .el-pagination{
        text-align: left;
    }
}
</style>