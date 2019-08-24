// This is a JavaScript file

var numCharacters = 3;

var characters = [
  { name: "いとうと",
    hp: 100,
    waza: [
      { name: "たたく", action: "tataku", damage: 20, hitRatio: 0.8 },
      { name: "はたく", action: "hataku", damage: 50, hitRatio: 0.5 },
    ],
    img: "anchan2.png", imgB: "anchanB2.png", imgR: "anchanR2.png", imgL: "anchanL2.png" },
  { name: "キテルグマ",
    hp: 100,
    waza: [
      { name: "たたく", action: "tataku", damage: 20, hitRatio: 0.8 },
      { name: "はたく", action: "hataku", damage: 50, hitRatio: 0.5 },
    ],
    img: "kiteruguma2.png", imgB: "kiterugumaB2.png", imgR: "kiterugumaR2.png", imgL: "kiterugumaL2.png" },
  { name: "くろうさ",
    hp: 100,
    waza: [
      { name: "たたく", action: "tataku", damage: 20, hitRatio: 0.8 },
      { name: "はたく", action: "hataku", damage: 50, hitRatio: 0.5 },
    ],
    img: "kurousa2.png", imgB: "kurousaB2.png", imgR: "kurousaR2.png", imgL: "kurousaL2.png" },
];

$(document).on('pageinit', '#selectCharacter', function() {
  for (var i = 0; i < numCharacters; i++) {
    $('.charImg')[i].src = "img/characters/" + characters[i].img;
  }

  yourChar.yo = -1;

  $(document).on('tap', '.charImg', function(event) {
//    console.log("tap" + $('#charSelect')[0].disabled);
    for (var i = 0; i < numCharacters; i++) {
      $('.charImg')[i].classList.remove("selected");
    }
    $(this).addClass("selected");
    yourChar.yo = $(this)[0].id - 1;
  });
});

function confirmSelected() {
  if (yourChar.yo >= 0) {
//    console.log(selectedChar +  " is selected.");
    ons.notification.confirm({
      message: characters[yourChar.yo].name + " でいいですか?",
      title: "確認",
      callback: function(index) {
        if (index == 1) {
          appNavigator.resetToPage("map.html", { animation: "slide" } );
        } else {
          yourChar.yo = -1;
        }
      }
    });
  }
}