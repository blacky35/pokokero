// This is a JavaScript file

var EG = 0;
var SG = 1;  // sougen
var IW = 2;  // yama

var elements = [
  { img: new Image(), src: "edge.png" },    // EG
  { img: new Image(), src: "sougen2.png" }, // SG
  { img: new Image(), src: "iwa.png" },     // IW
];

var WORLD_WIDTH = 20;
var WORLD_HEIGHT = 16;

var world = [
  [EG, EG, EG, EG, EG, EG, EG, EG, EG, EG, EG, EG, EG, EG, EG, EG, EG, EG, EG, EG],
  [EG, SG, SG, SG, SG, SG, SG, SG, SG, SG, SG, SG, SG, SG, SG, IW, IW, IW, IW, EG],
  [EG, SG, SG, SG, SG, SG, SG, SG, SG, SG, SG, SG, SG, SG, SG, SG, IW, IW, IW, EG],
  [EG, SG, SG, SG, SG, SG, SG, SG, SG, SG, SG, SG, SG, SG, SG, SG, IW, IW, IW, EG],
  [EG, SG, SG, SG, SG, SG, SG, SG, SG, SG, SG, SG, SG, SG, SG, SG, SG, IW, IW, EG],
  [EG, SG, SG, SG, SG, SG, SG, SG, SG, SG, SG, SG, SG, SG, SG, SG, SG, SG, SG, EG],
  [EG, SG, SG, SG, SG, SG, SG, SG, SG, SG, SG, SG, SG, SG, SG, SG, SG, SG, SG, EG],
  [EG, SG, SG, SG, SG, SG, SG, SG, SG, SG, SG, SG, SG, SG, SG, SG, SG, SG, SG, EG],
  [EG, SG, SG, SG, SG, SG, SG, SG, SG, SG, SG, SG, SG, SG, SG, SG, SG, SG, SG, EG],
  [EG, SG, SG, SG, SG, SG, SG, SG, SG, SG, SG, SG, SG, SG, SG, SG, SG, SG, SG, EG],
  [EG, SG, SG, SG, SG, SG, SG, SG, SG, SG, SG, SG, SG, SG, SG, SG, SG, SG, SG, EG],
  [EG, IW, SG, SG, SG, SG, SG, SG, SG, SG, SG, SG, SG, SG, SG, SG, SG, SG, SG, EG],
  [EG, IW, IW, IW, IW, IW, SG, SG, SG, SG, SG, SG, SG, SG, SG, SG, SG, SG, SG, EG],
  [EG, IW, IW, IW, IW, IW, SG, SG, SG, SG, SG, SG, SG, SG, SG, SG, SG, SG, SG, EG],
  [EG, IW, IW, IW, IW, IW, IW, IW, SG, SG, SG, SG, SG, SG, SG, SG, SG, SG, SG, EG],
  [EG, EG, EG, EG, EG, EG, EG, EG, EG, EG, EG, EG, EG, EG, EG, EG, EG, EG, EG, EG],
]; 

var monsters = [
  { name: "スライム", hp: 100, img: new Image(), src: "slime.png" },
];

var charX = 10;
var charY = 12;

var countImg = 0;

var CELL_WIDTH = 60;
var CELL_HEIGHT = 60;

var isMoving = false;
var msgQueue = [];

function drawMap(cx, cy, top, bottom, left, right, moFlg) {
  var viewCanvas = $('#viewCanvas')[0];
  var width = viewCanvas.width;
  var height = viewCanvas.height;

  var num_x = Math.floor(viewCanvas.width / CELL_WIDTH);  
  var num_y = Math.floor(viewCanvas.height / CELL_HEIGHT);  

  var margin_x = (num_x - 1) / 2;
  var margin_y = (num_y - 1) / 2;

//  $('#msg2').text("drawMap " + cx + " " + cy + " " + top + " " + bottom + " " + left + " " + right + " " + margin_x + " " + margin_y);

  var mapCanvas = $('#mapCanvas')[0];
  var context = mapCanvas.getContext('2d');
  context.clearRect(-CELL_WIDTH, -CELL_HEIGHT, width + CELL_WIDTH * 2, height + CELL_HEIGHT * 2);

  var s = "";

  for (var y = top; y < num_y + bottom; y++) {
    s += "- ";
    for (var x = left; x < num_x + right; x++) {
      var wx = cx - margin_x + x;
      var wy = cy - margin_y + y;
      if (wx < 0 || wy < 0 || wx >= WORLD_WIDTH || wy >= WORLD_HEIGHT) {
        s += "-1 ";
        context.drawImage(elements[0].img, x * CELL_WIDTH, y * CELL_HEIGHT, CELL_WIDTH, CELL_HEIGHT);
        continue;
      }

      var mo = Math.floor(world[wy][wx] / 100) - 1;
      var el = world[wy][wx] - 100 * (mo + 1);

      s += world[wy][wx] + " ";
      context.drawImage(elements[el].img, x * CELL_WIDTH, y * CELL_HEIGHT, CELL_WIDTH, CELL_HEIGHT);

      if (moFlg && mo >= 0) {
        context.drawImage(monsters[mo].img, x * CELL_WIDTH, y * CELL_HEIGHT, CELL_WIDTH, CELL_HEIGHT);
      }
    }
  }

//  $('#msg3').text((cx - margin_x + left) + " " + (cy - margin_y + top) + " " + s);

  viewCanvas.getContext('2d').drawImage(mapCanvas, CELL_WIDTH, CELL_HEIGHT, width, height, 0, 0, width, height);
}

function initMap() {
  if (++countImg < elements.length + monsters.length) return;
  drawMap(charX, charY, 0, 0, 0, 0, true);
}

function move(dx, dy) {
  var charImgSrc = "img/characters/" + yourChar.img;
  var dir = "down";
  if (dx < 0) {
    charImgSrc = "img/characters/" + yourChar.imgR;
    dir = "right";
  }
  if (dx > 0) {
    charImgSrc = "img/characters/" + yourChar.imgL;
    dir = "left";
  }
  if (dy < 0) {
    charImgSrc = "img/characters/" + yourChar.imgB;
    dir = "up";
  }

  //addMessage("move " + dir);

  $('#yourChar')[0].src = charImgSrc;

  var el = world[charY + dy][charX + dx] - Math.floor(world[charY + dy][charX + dx] / 100) * 100;
  if (el != SG) return;

  isMoving = true;

  var top = 0, bottom = 0, left = 0, right = 0;

  if (dx < 0) left = -1;
  if (dx > 0) right = 1;
  if (dy < 0) top = -1;
  if (dy > 0) bottom = 1;

  drawMap(charX, charY, top, bottom, left, right, true);
  setTimeout(function(){scroll(dx, dy, 0);}, 50);
}

function scroll(dx, dy, dd) {
//  $('#msg').text("scroll " + charX + " " + charY + " " + dx + " " + dy + " " + dd);

  dd += 10;

  var mapCanvas = $('#mapCanvas')[0];
  var viewCanvas = $('#viewCanvas')[0];
  var width = viewCanvas.width;
  var height = viewCanvas.height;

  viewCanvas.getContext('2d').drawImage(mapCanvas, CELL_WIDTH + dx * dd, CELL_HEIGHT + dy * dd, width, height, 0, 0, width, height);

  if ((dx != 0 && dd < CELL_WIDTH) || (dy != 0 && dd < CELL_HEIGHT)) {
//    console.log("scroll " + dx + " " + dy + " " + dd);
    setTimeout(function(){scroll(dx, dy, dd);}, 50);
  } else {
    charX += dx;
    charY += dy;

    var mo = Math.floor(world[charY][charX] / 100) - 1;
    if (mo >= 0) {
      encount(mo);
    } else {
      isMoving = false;
    }
//    console.log("scroll end " +charX + " " + charY);
//    $('#msg').text("move end");
  }
}

var isFighting = false;

function encount(mo) {
  addMessage(monsters[mo].name + "があらわれた！");
  $('#yourChar').addClass('animation');
  $('#yourChar')[0].src = "img/characters/" + yourChar.imgB;
  $('#yourCharHP').addClass('animation');
  $('#yourCharHP').show();
  $('#monsterChar').addClass('animation');
  $('#monsterChar')[0].src = "img/monsters/" + monsters[mo].src;
  $('#monsterChar').show();
  $('#monsterCharHP').addClass('animation');
  $('#monsterCharHP').show();
  setTimeout(function() {
    drawMap(charX, charY, 0, 0, 0, 0, false);
    $('#viewCanvas').addClass('animation');
    $('#yourChar').removeClass('animation').addClass('fight');
    $('#yourCharHP').removeClass('animation').addClass('fight');
    $('#monsterChar').removeClass('animation').addClass('fight');
    $('#monsterCharHP').removeClass('animation').addClass('fight');
    $('#button1')[0].src = "img/buttons/button-fight.png";
    $('#button1').show();
    $('#button2')[0].src = "img/buttons/button-runaway.png";
    $('#button2').show();
    isFighting = true;
    isMoving = false;

//    fightOver();
  },100);
}

function fightOver() {
  setTimeout(function(){
    $('#monsterChar').hide();
    $('#monsterChar').removeClass('fight');
    $('#monsterCharHP').hide();
    $('#monsterCharHP').removeClass('fight');
    $('#yourChar').hide();
    $('#yourChar').removeClass('fight');
    $('#yourCharHP').hide();
    $('#yourCharHP').removeClass('fight');
    $('#button1').hide();
    $('#button2').hide();
    $('#viewCanvas').removeClass('animation');
    setTimeout(function(){
      $('#viewCanvas')[0].width = 300;
      $('#viewCanvas')[0].height = 300;
      drawMap(charX, charY, 0, 0, 0, 0, true);
      $('#yourChar').show();
      isFighting = false;
    },1000);
  },5000);
}

function swipe(event) {
  if (isMoving || isFighting) return;
  if (isMessaging()) return;

  var direction = event.originalEvent.gesture.direction;

//  $('#msg').text("move " + direction + " " + charX + " " + charY + " " + moveFlg);

  if (direction == 'left') {
    move(1, 0);
  } else if (direction == 'right') {
    move(-1, 0);
  } else if (direction == 'up') {
   move(0, 1);
  } else if (direction == 'down') {
    move(0, -1);
  } else {
    console.log("ignored");
  }
}

function tap(event) {
  $('#msg2').text('tap ' + event.originalEvent.gesture.target.id);
//  event.originalEvent.gesture.target.addClass("tap");
}

function isMessaging() {
  return (msgQueue.length != 0);
}

function addMessage(msg) {
  msgQueue.push(msg);
  setTimeout(showMessage, 100);
}

var msgLine = 0;

function showMessage() { 
  if (msgQueue.length > 0) {
    if (msgLine < 3) {
      $('#msgArea').find('li').eq(msgLine).text(msgQueue.shift());
      msgLine++;
    } else {
      if (!$('#msgArea').vTicker('next', {animate:true})) {
          setTimeout(showMessage, 100);
      }
    }
  } 
}

function showMessageAfterTicking() {
  setTimeout(function() {
    $('#msgArea').find('li').eq(msgLine).text("");
    $('#msgArea').find('li').eq(msgLine-1).text(msgQueue.shift());
  }, 500);
}

$(document).on('pageinit', '#map', function() {
  $('#mapCanvas')[0].width = $('#viewCanvas')[0].width + CELL_WIDTH * 2;
  $('#mapCanvas')[0].height = $('#viewCanvas')[0].height + CELL_HEIGHT * 2;
  $('#mapCanvas')[0].getContext('2d').translate(CELL_WIDTH, CELL_HEIGHT);

  var a = new Array();
  a[10] = 1;
  a[20] = 2;

//  $('#msg').text($('#mapCanvas')[0].width + " " + $('#mapCanvas')[0].height + " " + a.length);

  for (var i = 0; i < elements.length; i++) {
    elements[i].img.onload = initMap;
    elements[i].img.src = "img/world/" + elements[i].src;
  }

  for (var i = 0; i < monsters.length; i++) {
    monsters[i].img.onload = initMap;
    monsters[i].img.src = "img/monsters/" + monsters[i].src;
  }

  if (yourChar == null) {
    yourChar = characters[Math.floor(Math.random() * 3)];
  }
  
  $('#yourChar')[0].src = "img/characters/" + yourChar.img;

  var num_mo = 0;

  do {
    var mx = Math.floor(Math.random() * WORLD_WIDTH);
    var my = Math.floor(Math.random() * WORLD_HEIGHT);
    if ((mx == charX && my == charY) || world[my][mx] != SG) continue;

    var mo = Math.floor(Math.random() * monsters.length);
    world[my][mx] += 100* (mo + 1);
    num_mo++;
  } while (num_mo < 10);

  $(document).on('swipe', '#viewCanvas', swipe);
  $(document).on('swipe', '#yourChar', swipe);
  $(document).on('tap', '#button1', tap);
  $(document).on('tap', '#button2', tap);

  $('#msgArea').vTicker({
    showItems: 3,
    padding: 2,
    startPaused: true,
    speed: 400,
    pause: 10,
  });
  $('#msgArea').on('vticker.afterTick', showMessageAfterTicking);
});

