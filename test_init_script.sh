#! /bin/sh
### BEGIN INIT INFO
# Provides:          skeleton
# Required-Start:    $remote_fs $syslog
# Required-Stop:     $remote_fs $syslog
# Default-Start:     2 3 4 5
# Default-Stop:      0 1 6
# Short-Description: Example initscript
# Description:       This file should be used to construct scripts to be
#                    placed in /etc/init.d.
### END INIT INFO

# Author: Foo Bar <foobar@baz.org>
#
# Please remove the "Author" lines above and replace them
# with your own name if you copy and modify this script.

# Do NOT "set -e"

# PATH should only include /usr/* if it runs after the mountnfs.sh script
PATH=/sbin:/usr/sbin:/bin:/usr/bin
DESC="Test service"
NAME=testinitd
DAEMON=/home/paytm/minreload/test.js
DAEMON_ARGS=""
PIDFILE=/tmp/pid.txt
SCRIPTNAME=/etc/init.d/$NAME

# Exit if the package is not installed
[ -x "$DAEMON" ] || exit 0

# Read configuration variable file if it is present
[ -r /etc/default/$NAME ] && . /etc/default/$NAME

# Load the VERBOSE setting and other rcS variables
. /lib/init/vars.sh

# Define LSB log_* functions.
# Depend on lsb-base (>= 3.2-14) to ensure that this file is present
# and status_of_proc is working.
. /lib/lsb/init-functions

case "$1" in
  start)
    start-stop-daemon --start --oknodo --pidfile $PIDFILE --background --startas $DAEMON
    ;;
  stop)
    start-stop-daemon --stop --signal USR1 --oknodo --pidfile $PIDFILE
    ;;
  status)
    start-stop-daemon --status --pidfile $PIDFILE
    case "$?" in
        0) echo 'Program is running.';;
        1) echo 'Program is not running and the pid file exists.';;
        3) echo 'Program is not running.';;
        4) echo 'Unable to determine program status.';;
    esac
    ;;
  force-stop)
    start-stop-daemon --stop --oknodo --pidfile $PIDFILE
    ;;
  restart|reload)
    start-stop-daemon --stop --signal USR2 --oknodo --pidfile $PIDFILE
    ;;
  *)
    #echo "Usage: $SCRIPTNAME {start|stop|restart|reload|force-reload}" >&2
    echo "Usage: $SCRIPTNAME {start|stop|status|restart|force-stop}" >&2
    exit 3
    ;;
esac

:
