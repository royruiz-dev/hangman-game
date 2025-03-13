#!/bin/bash

echo "Building the project..."

echo "Installing dependencies..."
# Check if haml is installed
if ! gem list haml -i >/dev/null 2>&1; then
  echo "Haml is not installed. Installing..."
  gem install --user-install haml
else
  echo "Haml is already installed."
fi

# Check if sass is installed
if ! npm list -g sass >/dev/null 2>&1; then
  echo "Sass is not installed. Installing..."
  npm install -g sass
else
  echo "Sass is already installed."
fi

# Check if build folder exists, if not, create it
if [ ! -d "build" ]; then
  echo "build folder not found. Creating build folder..."
  mkdir -p build
else
  echo "build folder exists."
fi

# Compile HAML to Flask's templates folder
echo "Compiling HAML..."
haml render src/index.haml > build/index.html

# Compile SASS to Flask's static folder
echo "Compiling SASS..."
sass src/style.sass build/css/style.css

# Copy static assets (images and JS files) to build/
cp -r public/img build/
cp -r public/js build/

echo "Build complete!"

# Start the Flask app
# echo "Starting Flask app..."
# python app.py
