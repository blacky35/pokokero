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
  { name: "スライム", hp: 100,
    waza: [
      { name: "たいあたり", action: "taiatari",
        damage: 20, hitRatio: 0.7 },
    ],
    img: new Image(), src: "slime.png" },
];

var num_monsters = 0;

var currentMonster = { mo: -1, hp: 0 };

var FIGHT = { action: "fight", src: "button-fight.png" };
var RUNAWAY = { action: "runaway", src: "button-runaway.png" };

var charX = 10;
var charY = 12;

var countImg = 0;

var CELL_WIDTH = 60;
var CELL_HEIGHT = 60;

var isPreventingEventsFlg = false;
var isFighting = false;

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
  var charImgSrc = "img/characters/" + characters[yourChar.yo].img;
  var dir = "down";
  if (dx < 0) {
    charImgSrc = "img/characters/" + characters[yourChar.yo].imgR;
    dir = "right";
  }
  if (dx > 0) {
    charImgSrc = "img/characters/" + characters[yourChar.yo].imgL;
    dir = "left";
  }
  if (dy < 0) {
    charImgSrc = "img/characters/" + characters[yourChar.yo].imgB;
    dir = "up";
  }

  //addMessage("move " + dir);

  $('#yourChar')[0].src = charImgSrc;

  var el = world[charY + dy][charX + dx] - Math.floor(world[charY + dy][charX + dx] / 100) * 100;
  if (el != SG) return;

  isPreventingEventsFlg = true;

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
      isPreventingEventsFlg = false;
    }
//    console.log("scroll end " +charX + " " + charY);
//    $('#msg').text("move end");
  }
}

function encount(mo) {
  currentMonster.mo = mo;
  currentMonster.hp = monsters[mo].hp;
  yourChar.hp = characters[yourChar.yo].hp;

  addMessage(monsters[currentMonster.mo].name + "があらわれた！");

  $('#yourChar').addClass('animation');
  $('#yourChar')[0].src = "img/characters/" + characters[yourChar.yo].imgB;
  $('#yourHP > .bar').css('width', yourChar.hp + '%');
  $('#yourHP').addClass('animation');
  $('#yourHP').show();
  $('#monsterChar').addClass('animation');
  $('#monsterChar')[0].src = "img/monsters/" + monsters[mo].src;
  $('#monsterChar').show();
  $('#monsterHP > .bar').css('width', currentMonster.hp + '%');
  $('#monsterHP').addClass('animation');
  $('#monsterHP').show();
  setTimeout(function() {
    drawMap(charX, charY, 0, 0, 0, 0, false);
    $('#viewCanvas').addClass('animation');
    $('#yourChar').removeClass('animation').addClass('fight');
    $('#yourHP').removeClass('animation').addClass('fight');
    $('#monsterChar').removeClass('animation').addClass('fight');
    $('#monsterHP').removeClass('animation').addClass('fight');
    setTimeout(function(){
      $('#button1').show();
      $('#button2').show();
      isFighting = true;
      isPreventingEventsFlg = false;
      startYourTurn();
    },1000);
  },100);
}

function startYourTurn() {
    $('#button1')[0].src = "img/buttons/" + FIGHT.src;
    $('#button1')[0].setAttribute('action', FIGHT.action);
    $('#button2')[0].src = "img/buttons/" + RUNAWAY.src;
    $('#button2')[0].setAttribute('action', RUNAWAY.action);
    isPreventingEventsFlg = false;
}

function yourAction(action) {
  var you = characters[yourChar.yo];

  if (action == RUNAWAY.action) {
    addMessage(you.name + "はにげだした。");
    fightOver();
  } else if (action == FIGHT.action) {
    $('#button1')[0].src = "img/buttons/" + you.waza[0].src;
    $('#button1')[0].setAttribute('action', you.waza[0].action);
    $('#button2')[0].src = "img/buttons/" + you.waza[1].src;
    $('#button2')[0].setAttribute('action', you.waza[1].action);
    addMessage(you.name + "のこうげき");
    isPreventingEventsFlg = false;
  } else {
    for (var i = 0; i < you.waza.length; i++) {
      if (action == you.waza[i].action) {
        addMessage(you.name + "の" + you.waza[i].name + "!");
        setTimeout(function(){
          if (Math.random() < you.waza[i].hitRatio) {
            var damage = you.waza[i].damage;
            addMessage(monsters[currentMonster.mo].name + "に" + damage + "ダメージ!");

            currentMonster.hp -= damage;
            if (currentMonster.hp < 0) currentMonster.hp = 0;

            drawMap(charX, charY, 0, 0, 0, 0, false);
            $('#monsterHP > .bar').css('width', currentMonster.hp + '%');
          } else {
            addMessage(monsters[currentMonster.mo].name + "によけられた。");
          }

          setTimeout(function(){
            $('#msg2').text("You:" + yourChar.hp + " Monster(" + num_monsters + "):" + currentMonster.hp);
            if (currentMonster.hp > 0) {
              monstersAction();
            } else {
              addMessage(monsters[currentMonster.mo].name + "をたおした!");
              world[charY][charX] -= 100 * (currentMonster.mo + 1);
              num_monsters--;
              if (num_monsters <= 0) {
                setTimeout(missionComplete, 1000);
              }
              setTimeout(fightOver, 1000);
            }
          },1000);
        },1000);

        break;
      }
    }
  }
}

function missionComplete() {
  $('#modalMsg').html("<p>敵をぜんぶたおした! </p><p>おめでとう!!</p>");
  modalPage.show();
  setTimeout(function(){
    fightOver();
    modalPage.hide();
    appNavigator.resetToPage("selectCharacter.html", { animation: "slide" } );
  },2000);
}

function monstersAction() {
  var mon = monsters[currentMonster.mo];
  addMessage(mon.name + "のこうげき");
  setTimeout(function() {
    var i = Math.floor(Math.random() * mon.waza.length);
    addMessage(mon.name + "の" + mon.waza[i].name + "!");

    setTimeout(function(){
      if (Math.random() < mon.waza[i].hitRatio) {
        var damage = mon.waza[i].damage;
        addMessage(characters[yourChar.yo].name + "に" + damage + "ダメージ!");
        yourChar.hp -= damage;
        if (yourChar.hp < 0) yourChar.hp = 0;
        $('#yourHP > .bar').css('width', yourChar.hp + '%');

      } else {
        addMessage(characters[yourChar.yo].name + "はよけた。");
      }

      setTimeout(function(){
        $('#msg2').text("You:" + yourChar.hp + " Monster(" + num_monsters + "):" + currentMonster.hp);
        if (yourChar.hp > 0) {
          startYourTurn();
        } else {
          $('#modalMsg').html("<p>" + characters[yourChar.yo].name + "はちからつきた。。。</p>");
          modalPage.show();
          fightOver();
          setTimeout(function(){
            modalPage.hide();
            appNavigator.resetToPage("selectCharacter.html", { animation: "slide" } );
          },3000);
        }
      },1000);
    },1000);
  },1000);
}

function fightOver() {
  $('#monsterChar').hide();
  $('#monsterChar').removeClass('fight');
  $('#monsterHP').hide();
  $('#monsterHP').removeClass('fight');
  $('#yourChar').hide();
  $('#yourChar').removeClass('fight');
  $('#yourHP').hide();
  $('#yourHP').removeClass('fight');
  $('#button1').hide();
  $('#button2').hide();
  $('#viewCanvas').removeClass('animation');
  setTimeout(function(){
    $('#viewCanvas')[0].width = 300;
    $('#viewCanvas')[0].height = 300;
    drawMap(charX, charY, 0, 0, 0, 0, true);
    $('#yourChar').show();
    isFighting = false;
    isPreventingEventsFlg = false;
  },1000);
}

function swipe(event) {
//  $('#msg2').text("swipe " + isPreventingEvents());
  
  if (isPreventingEvents()) return;
  if (isFighting) return;

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
  if (isPreventingEvents()) return;

  var id = event.originalEvent.gesture.target.id;
  var action = event.originalEvent.gesture.target.getAttribute('action');

//  $('#msg2').text('tap ' + action);
  $('#' + id).addClass("tap");

  isPreventingEventsFlg = true;

  setTimeout(function(){
    $('#' + id).removeClass("tap");
    yourAction(action);
  },100);
}

function isPreventingEvents() {
  return (isPreventingEventsFlg || isMessaging());
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
  isPreventingEventsFlg = false;
  isFighting = false;
  msgQueue = [];
  charX = 10;
  charY = 12;
  num_monsters = 0;

  $('#mapCanvas')[0].width = $('#viewCanvas')[0].width + CELL_WIDTH * 2;
  $('#mapCanvas')[0].height = $('#viewCanvas')[0].height + CELL_HEIGHT * 2;
  $('#mapCanvas')[0].getContext('2d').translate(CELL_WIDTH, CELL_HEIGHT);

  for (var i = 0; i < elements.length; i++) {
    elements[i].img.onload = initMap;
    elements[i].img.src = "img/world/" + elements[i].src;
  }

  for (var i = 0; i < monsters.length; i++) {
    monsters[i].img.onload = initMap;
    monsters[i].img.src = "img/monsters/" + monsters[i].src;
  }

  if (yourChar.yo < 0) {
    yourChar.yo = Math.floor(Math.random() * 3);
  }
  
  $('#yourChar')[0].src = "img/characters/" + characters[yourChar.yo].img;

  for (var y = 0; y < world.length; y++) {
    for (var x = 0; x < world[y].length; x++) {
      world[y][x] -= Math.floor(world[y][x] / 100) * 100;
    }
  }

  do {
    var mx = Math.floor(Math.random() * WORLD_WIDTH);
    var my = Math.floor(Math.random() * WORLD_HEIGHT);
    if ((mx == charX && my == charY) || world[my][mx] != SG) continue;

    var mo = Math.floor(Math.random() * monsters.length);
    world[my][mx] += 100 * (mo + 1);
    num_monsters++;
  } while (num_monsters < 10);

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

  initMap();
});

