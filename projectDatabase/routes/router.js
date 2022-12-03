const router=require('express').Router();
const db=require('../unitls/db');
   

router.post('/login',(res,rep)=>{
    rep.json({
        state:200,
        message:"登录成功",
        token:res.body.username
    })
})

//新增学生表数据接口
// router.post('/students/add',async (res,rep)=>{
//     await db.students.create({data:res.body})
//     rep.json({
//         msg:'添加成功!'
//     })
// })
//查询学生表所有数据
router.get('/students',async (res,rep)=>{//查询学生列表的接口
     const data=await db.students.findMany({where:{}});
     rep.json({
        data:data,
        total:data.length
     })
})
//删除学生表的数据
router.get('/students/del/:id',async (res,rep)=>{
   await db.students.delete({where:{id:parseInt(res.params.id)}});
    rep.json({
        status:200,
        msg:'删除成功'
    })
})
//查询学生表的数据
router.get('/students/find',async (res,rep)=>{
    const data=await db.students.findMany({where:{name:res.query.name}})
    rep.json({
        data,
        total:data.length
    })
})
//新增信息管理数据接口
router.post('/students/info',async (res,rep)=>{//
    // await db.Info.create({
    //     data:res.body
    // })
    const data=res.body;
    await db.info.create({//新增数据的方法
        data:{
            name:data.name,
            age:parseInt(data.age),
            sex:data.sex,
            father:data.father,
            mather:data.mather,
            address:data.address,
            phone:data.phone,
            date:data.time
        }
    })
    rep.json({
        status:200,
        msg:'新增成功',
        
    })
})

//查询信息数据接口
router.get('/students/info',async (res,rep)=>{
    rep.json({
        status:200,
        data:await db.info.findMany(),
        total:(await db.info.findMany()).length
    })
})

//修改信息接口
router.put('/students/info',async (res,rep)=>{
    const data=res.body
    await db.info.update({
        where:{id:res.body.id},
           data:{ name:data.name,
            age:parseInt(data.age),
            sex:data.sex,
            father:data.father,
            mather:data.mather,
            address:data.address,
            phone:data.phone,
            date:data.time
           }
    })
    rep.json({
        status:200,
        msg:'修改成功',
        data:data
    })
})

router.delete('/students/info',async (res,rep)=>{
    await db.info.delete({where:{id:res.query.id}})
    rep.json({
        status:200,
        msg:'删除成功'
    })
})
//查询作业表
router.get('/studebts/works',async (res,rep)=>{
    rep.json({
        status:200,
        msg:'查询成功',
        data:await db.work.findMany({where:{}}),
        total:(await db.work.findMany({where:{}})).length
    })
})
//获取数据概览数据接口
router.get('/dataecharts',async (res,rep)=>{
    rep.json({
        status:200,
        msg:'获取数据成功',
        data:{
            legend:[
                '技术总监','产品经理','后端开发','前端开发','运维/测试'
            ],
            xAxis:[
                '周一','周二','周三','周四','周五','周六','周日'
            ],
            series:[
                {
                    name:'技术总监',
                    type:'line',
                    stack:'总量',
                    data:[40,14,15,16,41,61,69]
                },
                {
                    name:'产品经理',
                    type:'line',
                    stack:'总量',
                    data:[23,34,35,15,21,71,19]
                },
                {
                    name:'后端开发',
                    type:'line',
                    stack:'总量',
                    data:[43,24,55,26,11,61,69]
                },
                {
                    name:'前端开发',
                    type:'line',
                    stack:'总量',
                    data:[30,12,65,26,31,61,69]
                },
                {
                    name:'运维/测试',
                    type:'line',
                    stack:'总量',
                    data:[44,24,65,16,41,61,69]
                },
            ]
        }
    })
})
//获取地图散点数据接口
router.get('/mapdata',async(res,rep)=>{
    rep.json({
        status:200,
        msg:'查询成功',
        data:{
            points:[
                {value:[188.123,299.324],itemStyle:{color:'#4ab2e5'}},
            ],
            linesData:[
                {coords:[[188.123,299.324],[192.331,23.314]],lineStyle:{color:'#4ab2e5'}}
            ],
            
        }
    })
})
module.exports=router;