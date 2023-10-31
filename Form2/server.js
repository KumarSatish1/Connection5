const express=require('express')
const app=express()
const mongoose=require('mongoose')
const bodyParser=require('body-parser')
const PORT=process.env.PORT||3000

// connect database
mongoose.connect('mongodb://127.0.0.1:27017/Form',{
    useNewUrlParser:true,
    useUnifiedTopology:true
}).then(()=>{
    console.log("Successfully connect")
}).catch((err)=>{
    console.log("DB connection fail.........",err)
})

// create model
const form=mongoose.model('Form3',{
    fname:String,
    lname:String,
    birth:String,
    gender:String,
    email:String,
    phone:String,
    sub:String

})



// access file
app.get('/',(req,res)=>{
    res.sendFile(__dirname+'/server.html')
})

app.use(bodyParser.urlencoded({
    extended:true
}))

// store data
app.post('/submit',(req,res)=>{
const {fname,lname,birth,gender,email,phone,sub}=req.body;

const form1=form({
    fname,lname,birth,gender,email,phone,sub
})
form1.save().then(()=>{
    res.send('Data Save Successfully')
}).catch((err)=>{
    res.status(500).send("Error")
    console.log("Error")
})

})

// show data

app.get('/show',(req,res)=>{
    form.find({}).then(users=>{
        const table=
        `
        <style>
        *{
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        body{
            height:100vh;
            width:100%;
            box-sizing: border-box;
            background-color: green;

        }
        .container{
            height:100%;
            width:100vw;
            display: flex;
            justify-content: center;
            align-items: center;
        }
        .form_container{
            height:80%;
            width:75%;
            background-color: white;

        }
        td,th{
            border:1px solid black;
            padding:.3em;
            
        }

        </style>
        <div class="container">
        <div class="form_container">
        <table style="border:1px solid;margin:100px auto;">
        <tr>
        <th>Full Name</th>
        <th>Email</th>
        <th>Birth</th>
        <th>Gender</th>
        <th>Email</th>
        <th>Phone</th>
        </tr>

        ${users.map(item=>
            `
            <tr>
            <td>${item.fname+" "+item.lname}</td>
            <td>${item.email}</td>
            <td>${item.birth}</td>
            <td>${item.gender}</td>
            <td>${item.email}</td>
            <td>${item.phone}</td>
            </tr>
            `
            )}


        </table>



        </div>
        </div>


        
        `
        res.send(table)
    })
})


app.listen(PORT,(err)=>{
    if(!err){
        console.log(`server on running http://localhost:${PORT}`)
    }
    else{
        console.log('Error')
    }
})