#!/bin/bash

# Compile HAML to Flask's build folder
echo "...Compiling HAML..."
haml render src/haml/index.haml > static/index.html

# Compile SASS to Flask's static/css folder
echo "...Compiling SASS..."
sass src/sass/style.sass static/css/style.css

echo "Build is complete!"