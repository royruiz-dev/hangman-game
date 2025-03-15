#!/bin/bash

# Check if haml is installed
if ! gem list haml -i >/dev/null 2>&1; then
  echo "Haml is not installed. Installing..."
  gem install --user-install haml
else
  echo "...Haml is already installed."
fi

# Check if sass is installed
if ! npm list -g sass >/dev/null 2>&1; then
  echo "Sass is not installed. Installing..."
  npm install -g sass
else
  echo "...Sass is already installed."
fi
