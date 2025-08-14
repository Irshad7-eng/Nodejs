const express = require('express');
const users = require("./MOCK_DATA.json");
const  app = express();
const fs = require('fs');



const PORT = 8000;

// middleware for post request

app.use(express.urlencoded({extended: false}));

app.use((req,res, next) =>{
    console.log("i am from middleware 1");
    next();
});
app.use((req, res, next) =>
{
    fs.appendFile('tast.txt', `${Date.now()}: ${req.method}:${req.path}`, (error, data) =>{
       next();
    });
   
})

//  GET Routers
app.get('/api/users', (req, res) =>
{
    return res.json(users);
});

app.get('/users', (req, res) =>
{
    const html = `
    <ul>
    ${users.map((user) => `<li>${user.first_name}</li>`).join("")}
    </ul>
    `;
    res.send(html);
})

// get put patch, delete user by id

app.route("/api/users/:id")
.get((req, res) =>
{
    const id = Number(req.params.id);

    const user = users.find((user) => user.id === id);

    return res.json(user);
})
.put((req, res) => {
    return res.json({ status:"panding"});
})
.patch((req, res) => {
    return res.json({ status:"panding"});
})
.delete((req, res) => {
    return res.json({ status:"panding"});
});

// post request create new user
app.post('/api/users', (req, res) => {
    const body = req.body;
    users.push({...body, id: users.length+1});
    fs.writeFile('./MOCK_DATA.json',JSON.stringify(users), (err, data) =>{
       return res.json({ status:"sucess", id: users.length}); 
    });
    
});



app.listen(PORT, ()=>{console.log("server is start")});
