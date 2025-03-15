#!/usr/bin/env bash
# https://www.nginx.com/resources/wiki/start/topics/tutorials/commandline/
# http://stackoverflow.com/questions/59895/getting-the-source-directory-of-a-bash-script-from-within
dir="$(cd "$(dirname "$0")" && cd .. && pwd)"

# Stop NGINX if nginx.pid file exists
if [ -f "$dir/logs/nginx.pid" ]; then
  kill -QUIT "$(< "$dir/logs/nginx.pid")"  # Stop NGINX gracefully by sending QUIT signal
  echo "...NGINX stopped successfully."
else
  echo "...No NGINX process found to stop."
fi