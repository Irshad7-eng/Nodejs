const fs = require("fs");

// Creating file 
// sync
// fs.writeFileSync('./test.txt',"hello bro how are you?");
// // asyn
// fs.writeFile('./test.txt','hello bro',(error) => {});


// // read the file
// const result = fs.readFileSync('./hello.cpp',"utf-8");
// console.log(result);

// // async reading

// fs.readFile('./hello.cpp','utf-8',(error, result)=>
// {
//     if(error)
//     {
//         console.log(error);

//     }
//     else{
//         console.log(result);
//     }
// });

// fs.unlinkSync('./test.txt');

// console.log(fs.statSync('./hello.cpp'));


// Blocking code /sync cdode

console.log("1");

const res = fs.readFileSync("./hello.cpp", "utf-8");

console.log(res);

console.log("2");
console.log("2");

console.log("Non bloking code\n");

// non Blocking code /async cdode

console.log("1");

fs.readFile("./hello.cpp", "utf-8", (error, result)=>
{
    if(error)
    {
        console.log(error);
    }
    else{
        console.log(result);
    }
});

console.log("2");
console.log("3");

