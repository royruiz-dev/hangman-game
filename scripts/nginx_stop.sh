#!/usr/bin/env bash

dir="$(cd "$(dirname "$0")" && cd .. && pwd)"

# Stop NGINX if nginx.pid file exists
if [ -f "$dir/logs/nginx.pid" ]; then
  # Stop NGINX gracefully by sending QUIT signal
  kill -QUIT "$(< "$dir/logs/nginx.pid")"
  echo "...NGINX stopped successfully."
else
  echo "...No NGINX process found to stop."
fi