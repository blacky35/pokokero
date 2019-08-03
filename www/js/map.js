// This is a JavaScript file

var SG = 10;  // sougen
var IW = 20;  // yama
var EG = 0;

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

var charX = 10;
var charY = 12;

var NUM_IMG = 3;
var countImg = 0;

var CELL_WIDTH = 60;
var CELL_HEIGHT = 60;

var sougen = new Image();
var iwa = new Image();
var edge = new Image();

function drawMap(cx, cy, top, bottom, left, right) {
  var viewCanvas = $('#viewCanvas')[0];
  var width = viewCanvas.width;
  var height = viewCanvas.height;

  var num_x = Math.floor(viewCanvas.width / CELL_WIDTH);  
  var num_y = Math.floor(viewCanvas.height / CELL_HEIGHT);  

  var margin_x = (num_x - 1) / 2;
  var margin_y = (num_y - 1) / 2;

  $('#msg2').text("drawMap " + cx + " " + cy + " " + top + " " + bottom + " " + left + " " + right + " " + margin_x + " " + margin_y);

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
        s += "0 ";
        continue;
      }

      if (world[wy][wx] == SG) {
        s += "S ";
        context.drawImage(sougen, x * CELL_WIDTH, y * CELL_HEIGHT, CELL_WIDTH, CELL_HEIGHT);
      } else if (world[wy][wx] == IW) {
        s += "I ";
        context.drawImage(iwa, x * CELL_WIDTH, y * CELL_HEIGHT, CELL_WIDTH, CELL_HEIGHT);
      } else if (world[wy][wx] == EG) {
        s += "E ";
        context.drawImage(edge, x * CELL_WIDTH, y * CELL_HEIGHT, CELL_WIDTH, CELL_HEIGHT);
      }
    }
  }

  $('#msg3').text((cx - margin_x + left) + " " + (cy - margin_y + top) + " " + s);

  viewCanvas.getContext('2d').drawImage(mapCanvas, CELL_WIDTH, CELL_HEIGHT, width, height, 0, 0, width, height);
}

function initMap() {
  if (++countImg < NUM_IMG) return;
  drawMap(charX, charY, 0, 0, 0, 0);
}

var moveFlg = false;

function move(dx, dy) {
  if (moveFlg) return;

  if (world[charY + dy][charX + dx] != SG) {
    return;
  }

  moveFlg = true;

  var top = 0, bottom = 0, left = 0, right = 0;

  if (dx < 0) left = -1;
  if (dx > 0) right = 1;
  if (dy < 0) top = -1;
  if (dy > 0) bottom = 1;

  drawMap(charX, charY, top, bottom, left, right);
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
    moveFlg = false;
//    console.log("scroll end " +charX + " " + charY);
//    $('#msg').text("move end");
  }
}

$(document).on('pageinit', '#map', function() {
  $('#mapCanvas')[0].width = $('#viewCanvas')[0].width + CELL_WIDTH * 2;
  $('#mapCanvas')[0].height = $('#viewCanvas')[0].height + CELL_HEIGHT * 2;
  $('#mapCanvas')[0].getContext('2d').translate(CELL_WIDTH, CELL_HEIGHT);

  $('#msg').text($('#mapCanvas')[0].width + " " + $('#mapCanvas')[0].height);

  sougen.onload = initMap;
  iwa.onload = initMap;
  edge.onload = initMap;

  sougen.src = "img/sougen2.png";
  iwa.src = "img/iwa.png";  
  edge.src = "img/edge.png";  

//  $(document).on('touchmove', '#viewCanvas', function(event) {
//    event.preventDefault();
//  });

  $(document).on('swipe', '#viewCanvas', function(event) {
    var direction = event.originalEvent.gesture.direction;

    $('#msg').text("move " + direction + " " + charX + " " + charY + " " + moveFlg);

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
  });

});
