from flask import Flask, request, send_from_directory
from wonderwords import RandomWord
import os

app = Flask(__name__)
r = RandomWord()

BUILD_FOLDER = os.path.join(os.getcwd(), 'build')

def get_random_words(count, min_length=4, max_length=10, categories=None):
  return r.random_words(
    count,                        # number of words to generate
    word_min_length=min_length,   # minimum length of each word
    word_max_length=max_length,   # maximum length of each word
    include_categories=categories # filter words by categories
  )

# Generate random words based on specified category
random_nouns = get_random_words(100, categories=["noun"])
# random_verbs = get_random_words(100, include_categories=["verb"])

@app.route('/nouns')
def get_nouns():
  print("Headers: ", request.headers)
  return random_nouns

# @app.route('/verbs')
# def get_verbs():
#   print("Headers: ", request.headers)
#   return random_verbs

# Serve the index.html from the build folder
@app.route('/')
def index():
  return send_from_directory(BUILD_FOLDER, 'index.html')

# Serves static files from the BUILD_FOLDER directory.
# Matches any file request and returns the corresponding file.
@app.route('/<path:filename>')
def serve_static(filename):
  return send_from_directory(BUILD_FOLDER, filename)


if __name__ == '__main__':
  app.run(debug=True, port=5000)