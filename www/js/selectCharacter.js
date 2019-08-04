// This is a JavaScript file

var numCharacters = 3;

var characters = [
  { name: "アンちゃん", img: "anchan.png", imgB: "anchanB.png", imgR: "anchanR.png", imgL: "anchanL.png" },
  { name: "キテルグマ", img: "kiteruguma.png", imgB: "kiterugumaB.png", imgR: "kiterugumaR.png", imgL: "kiterugumaL.png" },
  { name: "くろうさ", img: "kurousa.png", imgB: "kurousaB.png", imgR: "kurousaR.png", imgL: "kurousaL.png" },
];

$(document).on('pageinit', '#selectCharacter', function() {
  for (var i = 0; i < numCharacters; i++) {
    $('.charImg')[i].src = "img/characters/" + characters[i].img;
  }

  $(document).on('tap', '.charImg', function(event) {
//    console.log("tap" + $('#charSelect')[0].disabled);
    for (var i = 0; i < numCharacters; i++) {
      $('.charImg')[i].classList.remove("selected");
    }
    $(this).addClass("selected");
    yourChar = characters[$(this)[0].id - 1];
  });
});

function confirmSelected() {
  if (yourChar != null) {
//    console.log(selectedChar +  " is selected.");
    ons.notification.confirm({
      message: yourChar.name + " でいいですか?",
      title: "確認",
      callback: function(index) {
        if (index == 1) {
          appNavigator.resetToPage("map.html", { animation: "slide" } );
        } else {
          yourChar = null;
        }
      }
    });
  }
}