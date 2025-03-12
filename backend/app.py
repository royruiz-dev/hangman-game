from flask import Flask, request
from wonderwords import RandomWord

app = Flask(__name__)
r = RandomWord()

def get_random_words(count, word_min_length=4, include_categories=None):
  return r.random_words(count, word_min_length=word_min_length, include_categories=include_categories)

# generate random words meeting criteria below
random_nouns = get_random_words(100, include_categories=["noun"])
random_verbs = get_random_words(100, include_categories=["verb"])

@app.route('/nouns')
def get_nouns():
  print("Headers: ", request.headers)
  return random_nouns

@app.route('/verbs')
def get_verbs():
  print("Headers: ", request.headers)
  return random_verbs

if __name__ == '__main__':
  app.run()