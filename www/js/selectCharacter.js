// This is a JavaScript file

var numCharacters = 3;

var characters = [
  { name: "いとうと",
    hp: 100,
    waza: [
      { name: "たたく", role: "tataku", src: "button-tataku.png" },
      { name: "はたく", role: "hataku", src: "button-hataku.png" },
    ],
    img: "anchan2.png", imgB: "anchanB2.png", imgR: "anchanR2.png", imgL: "anchanL2.png" },
  { name: "キテルグマ",
    hp: 100,
    waza: [
      { name: "たたく", role: "tataku", src: "button-tataku.png" },
      { name: "はたく", role: "hataku", src: "button-hataku.png" },
    ],
    img: "kiteruguma2.png", imgB: "kiterugumaB2.png", imgR: "kiterugumaR2.png", imgL: "kiterugumaL2.png" },
  { name: "くろうさ",
    hp: 100,
    waza: [
      { name: "たたく", role: "tataku", src: "button-tataku.png" },
      { name: "はたく", role: "hataku", src: "button-hataku.png" },
    ],
    img: "kurousa2.png", imgB: "kurousaB2.png", imgR: "kurousaR2.png", imgL: "kurousaL2.png" },
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