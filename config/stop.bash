#!/usr/bin/env bash
# https://www.nginx.com/resources/wiki/start/topics/tutorials/commandline/
# http://stackoverflow.com/questions/59895/getting-the-source-directory-of-a-bash-script-from-within
dir="$(cd "$(dirname "$0")" && cd .. && pwd)"
# https://www.nginx.com/resources/wiki/start/topics/tutorials/commandline/
kill -QUIT "$(< "$dir/logs/nginx.pid")"
