var MINRELOAD = require('./index.js');

console.log("PID - ", process.pid);
setInterval(function(){
    console.log("running ... ", new Date(), " PID ", process.pid);
}, 1000);


var opts = {

    "pidfile" : "//Users/shrey/testpid.pid",
};

var m = new MINRELOAD(opts);

m.on('reload', function(){
    console.log("reload called .. killng self after 5 sec");

    setTimeout(function(){ console.log("Killing self"); process.exit(1); }, 5000);
});

m.on('stop', function(){
    console.log("stop called... killing self.");
    process.exit(1);
});