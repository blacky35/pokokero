// This is a JavaScript file

var numCharacters = 3;

var characters = [
  { name: "アンちゃん", img: "anchan.png" },
  { name: "キテルグマ", img: "kiteruguma.png" },
  { name: "くろうさ", img: "kurousa.png" },
];

$(document).on('pageinit', '#selectCharacter', function() {
  for (var i = 0; i < numCharacters; i++) {
    $('.charImg')[i].src = "img/" + characters[i].img;
  }

  $(document).on('tap', '.charImg', function(event) {
//    console.log("tap" + $('#charSelect')[0].disabled);
    for (var i = 0; i < numCharacters; i++) {
      $('.charImg')[i].classList.remove("selected");
    }
    $(this).addClass("selected");
    selectedChar = $(this)[0].id - 1;
  });
});

function confirmSelected() {
  if (selectedChar >= 0) {
//    console.log(selectedChar +  " is selected.");
    ons.notification.confirm({
      message: characters[selectedChar].name + " でいいですか?",
      title: "確認",
      callback: function(index) {
        if (index == 1) {
          appNavigator.resetToPage("map.html", { animation: "slide" } );
        }
      }
    });
  }
}