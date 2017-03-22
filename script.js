// 0. SETTING UP THE PAGE

// 0.1 Establish variables for keypresses.
var LEFT_KEY = 37;
var UP_KEY = 38;
var RIGHT_KEY = 39;
var DOWN_KEY = 40;

// 0.2 Establish speed of square's movement.
var SQUARE_MOVEMENT = 5;

var lastLoopRun = 0;

// 0.3 Establish x/y position of starting point, as well has width/height of element's CSS.
var square = new Object();
square.element = 'square';
square.x = 225;
square.y = 225;
square.w = 50;
square.h = 50;

var controller = new Object();

// 1. SPRITE MOVEMENT

// 1.1 Establish different states for key-up and key-down.

document.onkeydown = function(event) {
    toggleKey(event.keyCode, true);
};

document.onkeyup = function(event) {
    toggleKey(event.keyCode, false);
};

// 1.2 Create a controller to handle the keypresses.

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

// 1.3 Change x/y positions based on keypresses.

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

// 2. BOUNDED AREA

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

// 3. CSS POSITIONING

function setPosition(sprite) {
    var e = document.getElementById(square.element);
    e.style.left = sprite.x + 'px';
    e.style.top = sprite.y + 'px'; 
}

function showSprites() {
    setPosition(square);
}

// 4. UPDATE LOOP

function loop() {
    if (new Date().getTime() - lastLoopRun > 40) { 	// Update every 40 milliseconds.
        handleControls();							// Change javascript x/y positioning.
        showSprites();								// Change css x/y positioning to match.
        lastLoopRun = new Date().getTime();
    }
    setTimeout('loop();', 2);						// Restarts loop ever 2 milliseconds.
}

// 5. INITIALIZE

setPosition(square);	// Sets first CSS position.
loop();					// Starts the loop.