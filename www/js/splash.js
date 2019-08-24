// This is a JavaScript file

var splash = [
  { f: function(){$('#title11').addClass('animation');},      t: 1000 },
  { f: function(){$('#title12').addClass('animation');},      t: 1000 },
  { f: function(){$('#title13').addClass('animation');},      t: 1000 },
  { f: function(){$('#title1').addClass('animation');},       t: 1000 },
  { f: function(){$('#title21').addClass('animation');},      t: 1000 },
  { f: function(){$('.titleholder2').addClass('animation');}, t: 1000 },
  { f: function(){$('#title41').addClass('animation');},      t: 1000 },
  { f: function(){$('#title51').addClass('animation');},      t: 3000 },
];

var timerId = 0;
var index = 0;

function splashAnimation() {
  if (timerId == 0) return;

  if (index < splash.length) {
    splash[index].f();
    timerId = setTimeout(splashAnimation, splash[++index].t);
  } else {
    timerId = 0;
  }
}

$(document).on('pageinit', '#splash', function() {
  $('#splash').on('click', function() {
    if (timerId > 0) {
      clearTimeout(timerId); 
      timerId = 0;
    }
    appNavigator.resetToPage("selectCharacter.html", { animation: "slide" } );
  });

  timerId = setTimeout(splashAnimation, splash[index].t);
});