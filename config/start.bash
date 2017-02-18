#!/usr/bin/env bash
# http://stackoverflow.com/questions/59895/getting-the-source-directory-of-a-bash-script-from-within
dir="$(cd "$(dirname "$0")" && pwd)"
mkdir -p "$dir/logs"
# https://www.nginx.com/resources/wiki/start/topics/tutorials/commandline/
nginx -p "$dir" -c proxy.conf
