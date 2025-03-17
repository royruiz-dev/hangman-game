from flask import Flask, request, send_from_directory, render_template
from wonderwords import RandomWord
import os, re

app = Flask(__name__)
r = RandomWord()

STATIC_FOLDER = os.path.join(os.getcwd(), 'static')

def get_random_words(count, min_length=4, max_length=10, categories=None):
  return r.random_words(
    count,                        # number of words to generate
    word_min_length=min_length,   # minimum length of each word
    word_max_length=max_length,   # maximum length of each word
    include_categories=categories # filter words by categories
  )

# Generate random words based on specified category
random_nouns = get_random_words(200, categories=["noun"])
clean_nouns = [word for word in random_nouns if re.match(r'^[A-Za-z]+$', word)]

@app.route('/nouns')
def get_nouns():
  print("Headers: ", request.headers)
  return clean_nouns

# Serve the index.html from the templates folder
@app.route('/')
def index():
  return render_template("index.html")

# Serves static files from the STATIC_FOLDER directory.
 # Matches any file request and returns the corresponding file.
@app.route('/<path:filename>')
def serve_static(filename):
  return send_from_directory(STATIC_FOLDER, filename)

if __name__ == '__main__':
  app.run(debug=True, port=5000)
  # app.run(debug=True, host="0.0.0.0", port=5000)