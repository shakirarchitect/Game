var renderer = {}

function createRender() {
    renderer = PIXI.autoDetectRenderer(1280, 530, {
        backgroundColor: 0x1099bb
    });
    document.body.appendChild(renderer.view);
}

var stage = new PIXI.Container();

var texture = PIXI.Texture.fromImage('http://www.goodboydigital.com/pixijs/examples/17/eggHead.png');

var dropper = new PIXI.Sprite(texture);

var ballTexture = PIXI.Texture.fromImage('http://www.goodboydigital.com/pixijs/examples/1/bunny.png');

var activeBalls = [];

function addBall(x, y) {
    var ball = new PIXI.Sprite(ballTexture);
    ball.interactive = true;
    ball.anchor.x = 0.5;
    ball.anchor.y = -1;
    ball.position.x = x;
    ball.position.y = y;
    ball.on('mousedown', onDown);
    ball.on('touchstart', onDown);
    activeBalls.push(ball);
    stage.addChild(ball);
    return ball;
}

function onDown(eventData) {
    stage.removeChild(this);
    var removeIndex = activeBalls.indexOf(this);
    activeBalls.splice(removeIndex, 1);
    count++;
}

dropper.anchor.x = 0.5;
dropper.anchor.y = 0;
dropper.position.x = 200;
dropper.position.y = 10;
stage.addChild(dropper);

var flag = 1;
var count = 0;
var win = 1;

var style = {
    font: 'bold italic 36px Arial',
    fill: '#F7EDCA',
    stroke: '#4a1850',
    strokeThickness: 5,
    dropShadow: true,
    dropShadowColor: '#000000',
    dropShadowAngle: Math.PI / 6,
    dropShadowDistance: 6,
    wordWrap: true,
    wordWrapWidth: 440
};

function addGameOver() {
    var richText = new PIXI.Text('GAME OVER. ' + displayName + ' Score:' + count, style);
    richText.x = 30;
    richText.y = 180;
    stage.addChild(richText);
}

function animate() {
    requestAnimationFrame(animate);
    if (win == 0) {

        return;
    }
    ballAnimate();
    if (flag == 1) {
        dropper.position.x += 1;
        dropper.position.y += 0;
        if (dropper.position.x > 950) {

            flag = 0;
        }
    } else {
        dropper.position.x = dropper.position.x - 1;
        dropper.position.y += 0;
        if (dropper.position.x < 50) {
            flag = 1;
        }
    }
    if (dropper.position.x % 155 == 0 && win == 1) {
        var ball = addBall(dropper.position.x, dropper.position.y);
    }
    renderer.render(stage);
}

function ballAnimate() {
    for (var j = 0; j < activeBalls.length; j++) {
        if (win == 1) {
            activeBalls[j].position.y += 4;
            activeBalls[j].position.x += 0;
            if (activeBalls[j].position.y > 460) {
                win = 0;

                addGameOver();
            }
        }
    }
}