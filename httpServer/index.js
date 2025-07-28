const http = require("http");
const fs = require("fs");
const url = require("url");
// cerate server
const myServer = http.createServer((req, res) =>{

    if(req.url === "/favicon.ico") return res.end();
    const log = `${Date.now()}:${req.url}:New Req Recived\n`;
    const myUrl = url.parse(req.url, true);
    console.log(myUrl);
    fs.appendFile("log.txt",log,(error, data) =>{
        switch(myUrl.pathname){
            case '/': res.end("HomePage");
            break;

            case '/about':
            const username = myUrl.query.myname;
            res.end(`Hi i am, ${username}`);
            break;

            // in youtube case

            case '/search':
                const search = myUrl.query.search_query;
                console.log(search);
                res.end("Here are your reseult for" + search);
                break;

            default:
                res.end("404 Not Found");
        }
    });
    
});
// for runin server need port no.

myServer.listen(8000, ()=>{
    console.log("Server started!");
})