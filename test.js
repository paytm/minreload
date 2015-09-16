var MINRELOAD = require('./index.js');

console.log("PID - ", process.pid);

var opts = {

    "pidfile" : "//Users/shrey/testpid.pid",
};

var m = new MINRELOAD(opts);

m.on('reload', function(){
    console.log("reload called");
});

m.on('stop', function(){
    console.log("stop called");
});