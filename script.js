var LEFT_KEY = 37;
var UP_KEY = 38;
var RIGHT_KEY = 39;
var DOWN_KEY = 40;
var SQUARE_MOVEMENT = 5;

var lastLoopRun = 0;

var square = new Object();
square.element = 'square';
square.x = 0;
square.y = 0;
square.w = 50;
square.h = 50;

var controller = new Object();

function toggleKey(keyCode, isPressed) {
    switch(keyCode) {
        case LEFT_KEY:
            controller.left = isPressed;
            break;
        case UP_KEY:
            controller.up = isPressed;
            break;
        case RIGHT_KEY:
            controller.right = isPressed;
            break;
        case DOWN_KEY:
            controller.down = isPressed;
            break;
        default:
            break;
    }
}

function ensureBounds(sprite) {
    if (sprite.x < 0) {
        sprite.x = 0;
    } if (sprite.y < 0) {
        sprite.y = 0;
    } if (sprite.x + sprite.w > 500) {
        sprite.x = 500 - sprite.w;
    } if (sprite.y + sprite.h > 500) {
        sprite.y = 500 - sprite.h;
    }
}

function setPosition(sprite) {
    var e = document.getElementById(square.element);
    e.style.left = sprite.x + 'px';
    e.style.top = sprite.y + 'px'; 
}

function handleControls() {
    if (controller.left) {
        square.x -= SQUARE_MOVEMENT;
    } if (controller.right) {
        square.x += SQUARE_MOVEMENT;
    } if (controller.up) {
        square.y -= SQUARE_MOVEMENT;
    } if (controller.down) {
        square.y += SQUARE_MOVEMENT;
    }

    ensureBounds(square);
}

function showSprites() {
    setPosition(square);
}

function loop() {
    if (new Date().getTime() - lastLoopRun > 40) {
        handleControls();
        showSprites();
        lastLoopRun = new Date().getTime();
    }
    setTimeout('loop();', 2);
}

document.onkeydown = function(event) {
    toggleKey(event.keyCode, true);
};

document.onkeyup = function(event) {
    toggleKey(event.keyCode, false);
};

setPosition(square);
loop();