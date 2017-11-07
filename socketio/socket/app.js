var app = require('http').createServer(handler)
var io = require('socket.io')(app);
var fs = require('fs');


console.log("logging...");
app.listen(8082, ()=>{
    console.log("running");
});
console.log("logging agn...");

function handler (req, res) {
  fs.readFile(__dirname + '/index.html',
  function (err, data) {
    if (err) {
      res.writeHead(500);
      return res.end('Error loading index.html');
    }

    res.writeHead(200);
    res.end(data);
  });
}


call();
call2();
call();
call2();
call();

arr = [{
    "filename":"amex",
    "status":"uploading",
    "percentage":"10%"
},
{
    "filename":"amex",
    "status":"Analysing Context",
    "percentage":"30%"
},{
    "filename":"amex",
    "status":"12 Contexts identified",
    "percentage":"60%"
},
{
    "filename":"amex",
    "status":"91 Terms Identified",
    "percentage":"80%"
},
{
    "filename":"amex",
    "status":"Ready to view",
    "percentage":"100%"
}
]

function call(){
    io.on('connection', function (socket) {
        // socket.emit('news', "data");
        socket.emit('news', "1");
        // socket.emit('news', "25");
        //socket.emit('news', "50");
        socket.emit('news', "70");
        // socket.emit('news', "100");
        // socket.emit('news',arr);
    });

    io.on('disconnect', function(){
        console.log("ok");
    })
    
}

function call2(){
    io.on('connection', function (socket) {
        socket.emit('news', "data2");
    });

    io.on('disconnect', function(){
        console.log("ok");
    })
    
}