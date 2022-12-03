<template>
    <div class="data-view">
        <el-card>
            <div id="main1">

            </div>
        </el-card>
        <el-card>
            <div id="main2">
                    
            </div>
        </el-card>
    </div>
</template>
<script>
import {dataview} from '../../api/api'
export default{
    data(){
        return{

        }
    },
    mounted(){
        let MyCharts=this.$echarts.init(document.getElementById('main1'));
        MyCharts.setOption({
            title:{
                text:'牛逼'
            },
            xAxis:{//x轴
                data:[
                    '一班','二班','三班','四班','五班','六班'
                ]
            },
            yAxis:{},
            series:[//数据配置的地方
                {
                    name:'人数',
                    type:'bar',//那种图形
                    data:[45,42,13,51,16,61]//数据
                }
            ]
        })
    },
    methods:{
        draw(legend,xAxis,series){
            let MyCharts1=this.$echarts.init(document.getElementById('main2'));
            let option={
                title:{
                    text:'会话量'
                },
                tooltip:{
                    trigger:'axis'//鼠标放上去的提示
                },
                legend:{
                    data:legend
                },
                xAxis:{//x轴
                    type:'category',
                    data:xAxis  
                },
                yAxis:{
                    type:'value'
                },
                    series:series
            }
            MyCharts1.setOption(option);
        }
    },
    created(){
        dataview('get').then(res=>{
            if(res.data.status===200){
                let {legend,xAxis,series}=res.data.data;
                this.draw(legend,xAxis,series);
            }
            console.log(res.data.data)
        }).catch(err=>{
            throw err
        })
    }
}
</script>
<style lang="less" scoped>
.data-view{
    width:100%;
    display: flex;
    justify-content: space-between;
    .el-card{
        width:50%;
        #main1{
            height:500px;
        }
        #main2{
            height:500px;
        }
    }
}
</style>