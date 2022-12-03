import Vue from 'vue'
import Router from 'vue-router'
// import Home from '../components/Home'


Vue.use(Router);

export default new Router({//配置路由
    routes:[
        {
            path:'/',
            redirect:'/Login',
            name:'首页',
            hidden:true,
        },//写两个登录路由，因为直接访问login也要跳转到登录界面
        {
            path:'/Login',
            hidden:true,
            name:'Login',
            component:()=>import('../components/Login')
        },
        {//学生路由，包含默认路由
            path:'/Home',
            name:'学生管理',
            redirect:'/Home/Student',//重定向到学生列表页面
            iconClass:'fa fa-users',
            children:[
                {
                    path:'/Home/Student',
                    name:'学生列表',
                    iconClass:'fa fa-list',
                    component:()=>import('../components/students/studentList')
                },
                {
                    path:'/Home/infoList',
                    name:'信息列表',
                    iconClass:'fa fa-list-alt',
                    component:()=>import('../components/students/infoList')
                },
                {
                    path:'/Home/workList',
                    name:'作业列表',
                    iconClass:'fa fa-list-alt',
                    component:()=>import('../components/students/workList')
                },
                {
                    path:'/Home/infoManagement',
                    name:'信息管理列表',
                    iconClass:'fa fa-list-ul',
                    component:()=>import('../components/students/infoManagement')
                },
                {
                    path:'/Home/workMent',
                    name:'作业管理列表',
                    iconClass:'fa fa-th-list',
                    component:()=>import('../components/students/workMent')
                },
            ],
            component:()=>import('../components/Home')
        },
        {//地图路由 
            path:'/Home',
            name:'数据分析',
            iconClass:'fa fa-bar-chart',
            component:()=>import('../components/Home'),
            children:[
                {
                    path:'/Home/DataView',
                    name:'数据概览',
                    iconClass:'fa fa-line-chart',
                    component:()=>import('../components/dataAnalysis/DataView')
                },
                {
                    path:'/Home/MapView',
                    name:'地图概览',
                    iconClass:'fa fa-line-chart',
                    component:()=>import('../components/dataAnalysis/MapView')
                },
                {
                    path:'/Home/ScoreMap',
                    name:'成绩地图',
                    iconClass:'fa fa-line-chart',
                    component:()=>import('../components/dataAnalysis/ScoreMap')
                },
                {
                    path:'/Home/TravelMap',
                    name:'旅游地图',
                    iconClass:'fa fa-line-chart',
                    component:()=>import('../components/dataAnalysis/TravelMap')
                }
            ]
        },
        {
            path:'/Home',
            name:'用户中心',
            iconClass:'fa fa-user',
            component:()=>import('../components/Home'),
            children:[
                {
                    path:'/Home/User',
                    name:'权限管理',
                    iconClass:'fa fa-users',
                    component:()=>import('../components/users/User')
                }
            ]
        },
        {//404
            path:'*',
            hidden:true,
            name:'NotFound',
            component:()=>import('../components/NotFound')
        }
    ],
    mode:"history"//设置模式
})

//配置好后就要挂载使用