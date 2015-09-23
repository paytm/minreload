/*jshint multistr: true ,node: true*/
"use strict";


var
    /* NODE internal */
    _                   = require('lodash'),
    FS                  = require('fs'),
    UTIL                = require('util'),
    EVENTEMITTER        = require('events').EventEmitter,

    /* Global Variable */
    SPAWN               = require('child_process').spawn;

UTIL.inherits(mR, EVENTEMITTER);
function mR(opts) {
    var self = this;
    EVENTEMITTER.call(self);

    if(opts === undefined) opts = {};
    self.opts = opts;

    // Start watching
    self._watch();

    //Write pid file
    if(_.get(opts, 'pidfile', null)) {
        FS.writeFileSync(_.get(opts, 'pidfile'), process.pid);
    }
}

/* Called when we need to reload the app */
mR.prototype.reload = function() {

    var self = this;

    /* Spawn another process and send reload to previous process */
    self._spawnDuplicate();
    self.emit('reload');
};

/* called when we need to stop the app */
mR.prototype.stop = function() {
    this.emit('stop');
};

/* core wathcing functions */
mR.prototype._watch = function(cbReload, cbTerminate) {
    var
        self        = this,
        restartFile = process.env.RESTARTFILE || './public/system/restart';

    process.on('SIGUSR2', self.reload.bind(self));

    /* As mentioned in https://nodejs.org/api/process.html#process_signal_events

        SIGUSR1 is reserved by Node.js to start the debugger. It's possible to install a listener but that won't stop the debugger from starting.

        Hence we use SIGUSR1 for STOPPING
    */
    process.on('SIGUSR1', self.stop.bind(self));

    /* Watch this file for reload */
    FS.watchFile(restartFile, self.reload.bind(self));
};


mR.prototype._spawnDuplicate = function() {

    var child = SPAWN(

        /* executable */
        process.argv[0],

        /* rest of the original arguments */
        process.argv.slice(1),
        
        /* opts */
        {   
            cwd     : process.cwd(),

            /*
                Source : https://nodejs.org/docs/v0.10.24/api/child_process.html#child_process_child_process_spawn_command_args_options
                If the detached option is set, the child process will be made the leader of a new process group.
                This makes it possible for the child to continue running after the parent exits.
            */
            detached : true,

            /*
                Inherit STDIO of the running process
                [process.stdin, process.stdout, process.stderr] or [0,1,2]
            */
            stdio : [process.stdin, process.stdout, process.stderr]
        }
    );

    /*
        By default, the parent will wait for the detached child to exit.
        To prevent the parent from waiting for a given child, use the child.unref() method,
        and the parent's event loop will not include the child in its reference count.
    */
    child.unref();

};

module.exports = mR;

