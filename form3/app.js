const express=require('express')
const app=express()
const bodyParser=require('body-parser')
const mongoose=require('mongoose')
const PORT=process.env.PORT||3000
const path=require('path')



// connect database
mongoose.connect('mongodb://127.0.0.1:27017/Form',{
    useNewUrlParser:true,
    useUnifiedTopology:true
})

.then(()=>{
    console.log('Connect ho gaya')
}).catch((err)=>{
    console.log("Connect nahi hua")
})



app.get('/',(req,res)=>{
    res.sendFile(path.join(__dirname,'/form3.html'))
})
// create model
 const form3=mongoose.model('Form4',{
    email:String,
    fname:String,
    lname:String,
    password:String,
    cpassword:String,
    countary:String
 })

 app.use(bodyParser.urlencoded({
    extended:true
 }))
// insert data

app.post('/submit',(req,res)=>{
    const {email,fname,lname,password,cpassword,countary}=req.body;
   const data=form3({
    email,fname,lname,password,cpassword,countary
   })
   data.save().then(()=>{
    res.send('Successfully Store data')
   }).catch((err)=>{
    console.log('nahi hua')
   })
   
})




app.listen(PORT,(err)=>{
    if(!err){
        console.log(`Server on running http://localhost:${PORT}`)
    }
    else{
        console.log("Server Connection Failed")
    }
})