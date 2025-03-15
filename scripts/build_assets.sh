#!/bin/bash

# Compile HAML to Flask's build folder
echo "...Compiling HAML..."
haml render templates/index.haml > templates/index.html

# Compile SASS to Flask's static/css folder
echo "...Compiling SASS..."
sass sass/style.sass static/css/style.css

echo "Build is complete!"