#!/usr/bin/env bash
# https://www.nginx.com/resources/wiki/start/topics/tutorials/commandline/
kill -QUIT "$(< logs/nginx.pid)"
