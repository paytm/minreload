var MINRELOAD = require('./index.js');

console.log("PID - ", process.pid);

// var opts = {

//     'RESTARTFILE' : './public/system/restart',

//     'RELOAD_ON_SIGUSR2'    : ,

//     'RELOADSIGNALS' : ['SIGUSR2'],
//     'STOPSIGNALS'   : ['SIGTERM']

// };

var m = new MINRELOAD(opts);

m.on('reload', function(){
    console.log("reload called");
});

m.on('stop', function(){
    console.log("stop called");
});