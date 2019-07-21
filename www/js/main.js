/*
 *
 */
$(ducument).on('pageinit', '#splash', function() {
   $('#title0').text("bbb");
    setTimeout(function() { $('#title11').addClass('animation'); }, 1000);
    setTimeout(function() { $('#title12').addClass('animation'); }, 2000);
    setTimeout(function() { $('#title13').addClass('animation'); }, 3000);
    setTimeout(function() { $('#title1').addClass('animation'); }, 4000);
    setTimeout(function() { $('#title21').addClass('animation'); }, 5000);
    setTimeout(function() { $('.titleholder2').addClass('animation'); }, 6000);
    setTimeout(function() { $('#title41').addClass('animation'); }, 7000);
});

var prevLatVal;
var prevLngVal; 
var dist;

var locationOptions = {
  maximumAge: 3000,
  timeout: 3000,
  enableHighAccuracy: true
};

var numAnimals = 6;
var curIndex;

var animals = [
  { name: "くろうさ", img: "kurousa.png" },
  { name: "キテルグマ", img: "kiteruguma.png" },
  { name: "アンちゃん", img: "anchan.png" },
  { name: "ミュウツー", img: "mewtwo.png"},
  { name: "ゲノセクト", img: "genosect.png"},
  { name: "ワンちゃん", img: "wanchan.png"},
];

var caughtList = new Set();

function onError(err) {
  switch(err.code) {
    case 1:
      errorMsg = "位置情報の取得がユーザーによって許可されていません。";
      break;
    case 2:
      errorMsg = "位置情報の取得が行えません。";
      break;
    case 3:
      errorMsg = "時間切れです。位置情報が利用できない可能性があります。";
      break;
    default:
      errorMsg = "エラーが発生しました: " + err.code;
  }
  ons.notification.alert({ message: errorMsg });
};

function getLatLng() {
  navigator.geolocation.getCurrentPosition(
    function(p) {
      var curLatVal = p.coords.latitude;
      var curLngVal = p.coords.longitude;

      var distLatVal = (curLatVal - prevLatVal) * 10000 * 1000 / 90;
      var distLngVal = Math.cos(curLatVal / 180 * Math.PI) * (curLngVal - prevLngVal) * 10000 * 1000 / 90;
      var dist1 = Math.sqrt(distLatVal * distLatVal + distLngVal * distLngVal);
      dist = dist + dist1;

      $('#latVal').text(curLatVal);
      $('#lngVal').text(curLngVal);
      $('#distVal').text(Math.floor(dist) + " (" + Math.floor(dist1) + ")");

      prevLatVal = curLatVal;
      prevLngVal = curLngVal;

      if (dist > 10) {
        do {
          curIndex = Math.floor(Math.random() * numAnimals);
        } while (caughtList.has(curIndex));

        $('#animal')[0].src = "img/" + animals[curIndex].img;
        $('#animal').addClass('active');
        $('#text').text(animals[curIndex].name + " が現れた。");
        $('.buttonClass')[0].style.visibility="visible";
        $('.buttonClass')[1].style.visibility="visible";
        dist = 0.0;

      } else {
        $('#text').text("誰かいないか探しています...");
        setTimeout(getLatLng, 5000);
      };
    },
    onError, locationOptions);
};

function nadenade() {
  $('.buttonClass')[0].style.visibility="hidden";
  $('.buttonClass')[1].style.visibility="hidden";

  $('#text').text(animals[curIndex].name + " をなでなでした。");

  setTimeout(function() {
    var r = Math.floor(Math.random() * 10);
    if (r < 4) { // ゲット
      $('#text').text(animals[curIndex].name + " はついて来たがっている。");
      setTimeout(caught, 2000);
    } else if (r < 6) { // 逃げた
      $('#text').text(animals[curIndex].name + " はそわそわしている。");
      setTimeout(runaway, 2000);
    } else { // 待ち
      $('#text').text(animals[curIndex].name + " はにこにこしている。");
      $('.buttonClass')[0].style.visibility="visible";
      $('.buttonClass')[1].style.visibility="visible";
    };
  }, 3000);
};

function bikkuri() {
  $('.buttonClass')[0].style.visibility="hidden";
  $('.buttonClass')[1].style.visibility="hidden";

  $('#text').text(animals[curIndex].name + " をおどろかした。");

  setTimeout(function() {
    var r = Math.floor(Math.random() * 10);
    if (r < 4) { // ゲット
      $('#text').text(animals[curIndex].name + " は気絶した。");
      setTimeout(caught, 2000);
    } else { // 逃げた
      $('#text').text(animals[curIndex].name + " はびっくりした。");
      setTimeout(runaway, 2000);
    };
  }, 3000);
};

function caught() {
  $('#text').text(animals[curIndex].name + " をゲットした!!");
  $('#animal').removeClass('active');
  $('#animal')[0].src = "";

  $('.caughtAnimals')[caughtList.size].src = "img/" + animals[curIndex].img;
  caughtList.add(curIndex);
  curIndex = -1;

  if (caughtList.size < numAnimals) {
    setTimeout(getLatLng, 5000);
  } else {
    setTimeout(function() { $('#text').text("全員ゲットした。おめでとう!!"); }, 2000);
  };
};

function runaway() {
  $('#text').text(animals[curIndex].name + " は逃げ出した...");
  $('#animal').removeClass('active');
  $('#animal')[0].src = "";

  curIndex = -1;

  setTimeout(getLatLng, 5000);
};

function startup() {
  myModal.show();
  setTimeout(main, 5000);

  var imgs = "";

  for (var i = 0; i < numAnimals; i++) {
    imgs += "<img width='60px' height='80px' src='' class='caughtAnimals'>";
  };

  $('#collection')[0].innerHTML = imgs;
}

function main() {
  myModal.hide();
  navigator.geolocation.getCurrentPosition(
    function(p) {
      prevLatVal = p.coords.latitude;
      prevLngVal = p.coords.longitude;
      dist = 0.0;

      document.getElementById("latVal").textContent = prevLatVal;
      document.getElementById("lngVal").textContent = prevLngVal;
      document.getElementById("distVal").textContent = dist;
    },
    onError, locationOptions);

  setTimeout(getLatLng, 5000);
};