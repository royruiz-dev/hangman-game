

w = document.getElementById('wordChallenge');
secretWord.split('').reduce(function(a,v){return a+"<div class='letterBox'></div> "},"");
secretWord.split('').map(function(){return "<div class='letterBox'></div>"}).join(' ');
secretWord.replace(/./g,"<div class='letterBox'></div> ")

w.innerHTML = secretWord.replace(/./g,"<div class='letterBox'></div> ")


letters = document.getElementsByClassName('alphabet');
Array.prototype.map.call(letters,function(x) {
  x.addEventListener('click',function() {
    console.log(this.innerText)
  });
});


