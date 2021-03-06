    var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');
var itemCounter = 0;
canvas.width = 500;
canvas.height = 300;

var name = prompt("Enter your name!");

var roomTile = {
    loaded: false,
    image: new Image(),
    tileWidth: 500,
    tileHeight: 300
};
roomTile.image.onload = function () {
    roomTile.loaded = true;
};
roomTile.image.src = 'http://goo.gl/80md2t';

var coinTile = {
    loaded: false,
    image: new Image(),
    tileWidth: 10,
    tileHeight: 10
};
coinTile.image.onload = function () {
    coinTile.loaded = true;
};
coinTile.image.src = 'http://goo.gl/crnD3D';

var dogeTiles = {
    loaded: false,
    image: new Image(),
    tileWidth: 64,
    tileHeight: 64
};
dogeTiles.image.onload = function () {
    dogeTiles.loaded = true;
};
dogeTiles.image.src = 'http://goo.gl/1dnj7l';

var mySprite = {
    x: 200,
    y: 200,
    width: 64,
    height: 64,
    speed: 200,
    state: 0

};

var item = {
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    width: 10,
    height: 10,
    color: '#fff'
};
var keysDown = {};
window.addEventListener('keydown', function (e) {
    keysDown[e.keyCode] = true;
});
window.addEventListener('keyup', function (e) {
    delete keysDown[e.keyCode];
});

function update(mod) {
    if (65 in keysDown) {
        mySprite.state = 2;
        mySprite.x -= mySprite.speed * mod;
    }
    if (87 in keysDown) {
        mySprite.state = 3;
        mySprite.y -= mySprite.speed * mod;
    }
    if (68 in keysDown) {
        mySprite.state = 0;
        mySprite.x += mySprite.speed * mod;
    }
    if (83 in keysDown) {
        mySprite.state = 1;
        mySprite.y += mySprite.speed * mod;
    }

    if (
    mySprite.x < item.x + item.width && mySprite.x + mySprite.width > item.x && mySprite.y < item.y + item.height && mySprite.y + mySprite.height > item.y) {
        item.x = Math.random() * canvas.width;
        item.y = Math.random() * canvas.height;
        itemCounter++;
    }

    if (mySprite.x >= 436) {
        mySprite.x = 436;
    } else if (mySprite.x <= 0) {
        mySprite.x = 0;
    }

    if (mySprite.y >= 236) {
        mySprite.y = 236;
    } else if (mySprite.y <= 0) {
        mySprite.y = 0;
    }

    if (item.x >= 436) {
        item.x = 436;
    } else if (item.x <= 0) {
        item.x = 0;
    }

    if (item.y >= 236) {
        item.y = 236;
    } else if (item.y <= 0) {
        item.y = 0;
    }
}

function render() {
    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    if (roomTile.loaded) {
        ctx.drawImage(
        roomTile.image,
        0,
        0,
        500,
        300);
    }

    if (dogeTiles.loaded) {
        ctx.drawImage(
        dogeTiles.image,
        mySprite.state * dogeTiles.tileWidth, 0,
        mySprite.width,
        mySprite.height,
        Math.round(mySprite.x),
        Math.round(mySprite.y),
        mySprite.width,
        mySprite.height);
    }

    if (coinTile.loaded) {
        ctx.drawImage(
            coinTile.image,
            item.x, 
            item.y,
            10,
            10);
    }
        
    ctx.font = '12pt Comic Sans';
    ctx.fillStyle = '#fff';
    ctx.textBaseline = 'top';
    ctx.fillText(name + " has collected " + itemCounter + " points", 10, 10);
}

function run() {
    update((Date.now() - time) / 1000);
    render();
    time = Date.now();
}

var time = Date.now();
setInterval(run, 10);
