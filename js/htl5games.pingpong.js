/**
 * Created with JetBrains WebStorm.
 * User: User
 * Date: 17.09.13
 * Time: 16:33
 * To change this template use File | Settings | File Templates.
 */
var pingpong = {};

pingpong.pressedKeys = [];

pingpong.ball = {
    speed: 5,
    x: 150,
    y: 100,
    directionX: 1,
    directionY: 1
}

var KEY = {
    UP: 38,
    DOWN: 40,
    W: 87,
    S: 83
}


$(function(){
   pingpong.timer = setInterval(gameloop, 30);
    $(document).keydown(function(e){
        pingpong.pressedKeys[e.which] = true;
    });
    $(document).keyup(function(e){
        pingpong.pressedKeys[e.which] = false;
    });
});

function gameloop() {
    moveBall();
    movePaddles();
}

function moveBall(){
    var playgroundHeight = parseInt($("#playground").height());
    var playgroundWidth = parseInt($("#playground").width());
    var ball = pingpong.ball;
    if (ball.y + ball.speed*ball.directionY > (playgroundHeight-20)) {
        ball.directionY = -1;
    }
    if (ball.y + ball.speed*ball.directionY < 0) {
        ball.directionY = 1;
    }
    if (ball.x + ball.speed*ball.directionX > (playgroundWidth-20)) {
        ball.directionX = -1;
    }
    if (ball.x + ball.speed*ball.directionX < 0) {
        ball.directionX = 1;
    }
    var paddleAX = parseInt($("#paddleA").css("left")) + parseInt($("#paddleA").css("width"));
    var paddleAYBottom = parseInt($("#paddleA").css("top")) + parseInt($("#paddleA").css("height"));
    var paddleAYTop = parseInt($("#paddleA").css("top"))
    if (ball.x + ball.speed*ball.directionX < paddleAX) {
        if (ball.y + ball.speed*ball.directionY <= paddleAYBottom && ball.y + ball.speed*ball.directionY >= paddleAYTop) {
            ball.directionX = 1;
        }
    }
    var paddleBX = parseInt($("#paddleB").css("left"))
    var paddleBYBottom = parseInt($("#paddleB").css("top")) + parseInt($("#paddleB").css("height"));
    var paddleBYTop = parseInt($("#paddleB").css("top"))
    if (ball.x + ball.speed*ball.directionX >= paddleBX) {
        if (ball.y + ball.speed*ball.directionY <= paddleBYBottom && ball.y + ball.speed*ball.directionY >= paddleBYTop) {
            ball.directionX = -1;
        }
    }

    ball.x += ball.speed * ball.directionX;
    ball.y += ball.speed * ball.directionY;
    $("#ball").css({"left" : ball.x, "top" : ball.y});


}



function movePaddles(){
    if(pingpong.pressedKeys[KEY.UP]) {
        var top = parseInt($("#paddleB").css("top"));
        $("#paddleB").css("top", top-5);
    }
    if(pingpong.pressedKeys[KEY.DOWN]) {
        var top = parseInt($("#paddleB").css("top"));
        $("#paddleB").css("top", top+5);
    }
    if(pingpong.pressedKeys[KEY.W]) {
        var top = parseInt($("#paddleA").css("top"));
        $("#paddleA").css("top", top-5);
    }
    if(pingpong.pressedKeys[KEY.S]) {
        var top = parseInt($("#paddleA").css("top"));
        $("#paddleA").css("top", top+5);
    }
}
