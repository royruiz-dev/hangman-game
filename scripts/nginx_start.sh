#!/usr/bin/env bash

NGINX_ROOT=$(pwd)
LOGS_DIR="$NGINX_ROOT/logs"

# Create directory for logs and pid
mkdir -p "$LOGS_DIR"

# Starts NGINX with proxy configuration
nginx -p "$NGINX_ROOT" -c config/proxy.conf
if [ $? -eq 0 ]; then
  echo "...NGINX started successfully."
else
  echo "...NGINX failed to start."
fi