<template>
    <div class="map-view">
        <div id="main" >
            
        </div>
    </div>
</template>
<script>
import china from '../../assets/china.json'
export default{
    data(){
        return{
        }
    }
    ,
    created(){

    },
    mounted(){
        let MyCharts=this.$echarts.init(document.getElementById('main'));
        this.$echarts.registerMap('china',china);
        let option={//必须包括geo组件或map图标类型
            backgroundColor:'rgb(121,145,209)',
            geo:{
                map:'china',
                zoom:1.2,//地图缩放比例
                aspectScale:0.75,//长宽比
                regions:[
                    {
                        name:'南海诸岛',
                        itemStyle:{
                            opacity:0
                        }
                    }
                ]
            },
            series:[
                {//配置地图相关参数，绘制地图
                    type:'map',
                    zoom:1.2,
                    map:'china',
                    label:{//字体的样式
                        normal:{//自然状态下    
                            show:true,
                            textStyle:{
                                color:'#1DE9B6',
                                fontSize:'10'
                            }
                        },
                        emphasis:{
                            textStyle:{
                                color:'rgb(183,185,14)'
                            }
                        }
                    },
                    itemStyle:{//每个小地图的样式
                    normal:{
                        //自然的状态    
                        areaColor:{
                            type:'radial',//径向渐变
                            x:0.5,
                            y:0.5,
                            r:0.8,
                            borderWidth:1,
                            colorStops:[
                                {//径向渐变开始的颜色,起始色
                                    offset:0,
                                    color:'#09132c'//0%处的颜色
                                },
                                {
                                    offset:1,//终止色
                                    color:'#274d68'//100%处的颜色
                                }
                            ],
                                globalCoord:true
                        },
                        shadowColor:'rgb(58,115,192)',
                        shadowOffsetX:1,
                        shadowOffsetY:2
                    },
                    emphasis:{//高亮的样式
                        areaColor:'rgb(46,229,206)' ,
                        borderWidth:0.1
                    }
                },//每一项的样式
                }
            ]
            ,

        }
        MyCharts.setOption(option)
    }
}
</script>
<style lang="less" scoped>
.map-view{
    width:100%;
    #main{
        width:100%;
        height:600px;
        margin-top:50px;
    }
}
</style>