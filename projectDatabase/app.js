const express=require('express');
const bodyParser=require('body-parser'); 
const app=new express();
app.use(express.json());
app.use(require('cors')());
app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json());

app.use('/users',require('./routes/router'));
app.listen(3000,()=>console.log('server is runing on 3000'))