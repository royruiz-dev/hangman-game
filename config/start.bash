#!/usr/bin/env bash
# http://stackoverflow.com/questions/59895/getting-the-source-directory-of-a-bash-script-from-within
dir="$(cd "$(dirname "$0")" && cd .. && pwd)"
mkdir -p "$dir/logs"

echo "Starting NGINX server..."

# https://www.nginx.com/resources/wiki/start/topics/tutorials/commandline/
nginx -p "$dir" -c config/proxy.conf
if [ $? -eq 0 ]; then
  echo "NGINX started successfully."
else
  echo "NGINX failed to start."
fi