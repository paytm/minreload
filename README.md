# minreload
Minimum reload for nodejs apps

Idea is to provide spawn functionality with existing process and alerting existing process that it has to exit

## Usage
See test.js


## Features
- Calls reload/stop event. Rest has to be handled by the app

## ToDo and improvements
- Provide multiple worker support
- Provide a timeout for Stop - kill itself
- Provides master(x) and worker support like cluster

## ChangeLog
0.0.1 
``` Init ```
