const express = require('express');
const users = require("./MOCK_DATA.json");
const  app = express();
const fs = require('fs');
const  mongoose  = require('mongoose');
const { timeStamp } = require('console');
const PORT = 8000;

// connection with monodb
mongoose.connect("mongodb://localhost:27017/youtube")
.then(()=> console.log("MongoDB Connected"))
.catch(err => console.log("Mongo Error, ", err));

// Schema
const userSchema = new mongoose.Schema({
    firstName:{
        type:String,
        required:true,
    },
    lastName:{
        type:String,
    },
    email:{
        type:String,
        require:true,
        unique:true,
    },
    jobTitle:{
        type:String,
    },
    gender:{
        type:String,
    },
},{timestamps:true});

// Create modle
const User = mongoose.model("user", userSchema);




// middleware for post request

app.use(express.urlencoded({extended: false}));
/*
app.use((req,res, next) =>{
    console.log("i am from middleware 1");
    next();
});
*/

 app.use((req, res, next) =>
{
    fs.appendFile('tast.txt', `${Date.now()}: ${req.method}:${req.path}`, (error, data) =>{
       next();
    });
   
})

//  GET Routers
app.get('/api/users', async(req, res) =>
{
    const allDbUsers = await User.find({});
    return res.json(allDbUsers);
});

app.get('/users', async(req, res) =>
{
    const allDbUsers = await User.find({});
    const html = `
    <ul>
    ${allDbUsers.map((user) => `<li>${user.firstName} - ${user.email}</li>`).join("")}
    </ul>
    `;
    res.send(html);
})

// get put patch, delete user by id

app.route("/api/users/:id")
.get(async(req, res) =>
{
    const user = await User.findById(req.params.id);

    if(!user) return res.status(404).json({error:" user not find"});

    return res.json(user);
})
.patch(async(req, res) => {
    await User.findByIdAndUpdate(req.params.id,{lastName:"chande"});

    return res.json({ status:"success"});
})
.delete(async(req, res) => {
    await User.findByIdAndDelete(req.params.id);
    return res.json({ status:"success"});
});



// post request create new user
app.post('/api/users', async(req, res) => {
    const body = req.body;
    if(
        !body || !body.first_name || !body.last_name || !body.email || !body.gender || !body.job_title
    ){
        return res.status(400).json({msg:"All fields are req..."});
    }

    const result = await User.create({
        firstName:body.first_name,
        lastName:body.last_name,
        email:body.email,
        gender:body.gender,
        jobTitle:body.job_title,
       
    });
    return res.status(200).json({msg:"success"});
    
});



app.listen(PORT, ()=>{console.log("server is start")});
