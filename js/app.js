// Enemies our player must avoid
var Enemy = function(x, y, bug_speed) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    this.x = x; // x-axis on the board 
    this.y = y; // y-axis on the board
    this.bug_speed = bug_speed; // for the speed of the bug

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {

    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.

    this.x = this.x + this.bug_speed * dt;

    // controlling the speed of the bugs 
    if (this.x > 510) {
        this.x = -50;
        this.bug_speed = 120 + Math.floor(Math.random() * 300);
    };

    // Checks for collisions between the player and the enemies
    if (player.x < this.x + 80 && player.x + 80 > this.x && player.y < this.y + 60 && 60 + player.y > this.y) {
        // once the collision happens this will be the new position of the character
        //note it's different from the starting position
        player.x = 202;
        player.y = 405;
    };
};


// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};


// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.


// this class handles the x  , y poisoning  also it has the default image for the character
var Player = function(x, y) {

    this.x = x; // this variable will take the x  position of the character.
    this.y = y; // this variable will take y  position of the character

    //The image of the player of char-pink-girl 
    //which will be added to the map. 
    this.player = 'images/char-pink-girl.png';

};

Player.prototype.update = function(dt) {

};

// Renders the image of the user into the game
Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.player), this.x, this.y);
};

// this function will handle the input event from the keyboard and check if the user
//is using arrows to move the character .
// it also handles moving the character on the map according the arrow clicked.
Player.prototype.handleInput = function(arrow) {

    // once the left arrow has been clicked  the character is moved horizontally by 102.
    // it also  prevents the user from  going outside the boundary of the map    
    if (arrow == 'left' && this.x > 0) {
        this.x -= 102;
    };

    // once the right arrow has been clicked  the character is moved horizontally by 102.
    // it also  prevents the user from  going outside the boundary of the map    
    if (arrow == 'right' && this.x < 405) {
        this.x += 102;
    };

    // once the up arrow has been clicked  the character is moved vertically by 83.
    // it also  prevents the user from  going outside the boundary of the map    
    if (arrow == 'up' && this.y > 0) {
        this.y -= 83;
    };


    // once the down arrow has been clicked  the character is moved vertically by 83.
    // it also  prevents the user from  going outside the boundary of the map
    if (arrow == 'down' && this.y < 383) {
        this.y += 83;
    };

    // check if the character reaches the goal , Once the character reaches the goal " the water ",
    // teleport the character to the starting position after 0.5 second to start again and try to pass once more.
    if (this.y < 0) {
        setTimeout(() => {
            this.x = 202;
            this.y = 320;
        }, 500);
    };
};


// this array will hold all the enemies
var allEnemies = [];

// Location of the 3 bugs on the y axis on the map 
var enemyLocation = [63, 147, 230];

// var randomSpeed = (Math.floor(Math.random() * 300) + 1);

// the enemy speed at the begging of the game is 300 after that it will be randomly generated
// the starting position of the enemy is always 0
enemyLocation.forEach(function(locationY) {
    enemy = new Enemy(0, locationY, 300);
    allEnemies.push(enemy);
});

// The starting location of the character is the same once you get to the goal
// you can change it by going to the handleInput function find the if  at the end and change its values 
var player = new Player(202, 320);




// This listens for key presses and sends the keys to your
// Player.handleInput() method. 
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };
    player.handleInput(allowedKeys[e.keyCode]);
});