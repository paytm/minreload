var MINRELOAD = require('./index.js');

console.log("PID - ", process.pid);


var m = new MINRELOAD();

m.on('reload', function(){
    console.log("reload called");
});

m.on('stop', function(){
    console.log("stop called");
});