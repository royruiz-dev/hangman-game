#!/bin/bash

echo "Building the Project... (4 Steps)"

echo "Step 1 | Installing Dependencies..."
./scripts/install_dependencies.sh

echo "Step 2 | Build Assets..."
./scripts/build_assets.sh

echo "Step 3 | Starting NGINX..."
./scripts/nginx_start.sh

echo "Step 4 | Starting Flask app..."
./scripts/start_flask.sh