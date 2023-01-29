var p5Inst = new p5(null, 'sketch');

window.preload = function () {
  initMobileControls(p5Inst);

  p5Inst._predefinedSpriteAnimations = {};
  p5Inst._pauseSpriteAnimationsByDefault = false;
  var animationListJSON = {"orderedKeys":[],"propsByKey":{}};
  var orderedKeys = animationListJSON.orderedKeys;
  var allAnimationsSingleFrame = false;
  orderedKeys.forEach(function (key) {
    var props = animationListJSON.propsByKey[key];
    var frameCount = allAnimationsSingleFrame ? 1 : props.frameCount;
    var image = loadImage(props.rootRelativePath, function () {
      var spriteSheet = loadSpriteSheet(
          image,
          props.frameSize.x,
          props.frameSize.y,
          frameCount
      );
      p5Inst._predefinedSpriteAnimations[props.name] = loadAnimation(spriteSheet);
      p5Inst._predefinedSpriteAnimations[props.name].looping = props.looping;
      p5Inst._predefinedSpriteAnimations[props.name].frameDelay = props.frameDelay;
    });
  });

  function wrappedExportedCode(stage) {
    if (stage === 'preload') {
      if (setup !== window.setup) {
        window.setup = setup;
      } else {
        return;
      }
    }
// -----

// make game objects like = goal1,goal2,mallets,boundaries 
var goal1=createSprite(200,28,100,20);
var goal2=createSprite(200,372,100,20);
var striker=createSprite(200,200,10,10);
var computerMallet=createSprite(200,50,50,10);
var playerMallet=createSprite(200,350,50,10);
var boundary1=createSprite(380,200,5,400);
var boundary2=createSprite(20,200,5,400);
var boundary3 = createSprite(200, 15,400,5);
var boundary4=createSprite(200,385,400,5);
var boundary5 = createSprite(200, 100,400,5);
var boundary6 = createSprite(200, 300,400,5);
 
//make gamestate amd scores
var gameState="serve";
var computerScore=0;
var playerScore=0;

//give colours to our objects
goal1.shapeColor="yellow";
goal2.shapeColor="yellow";
striker.shapeColor="red";
playerMallet.shapeColor="black";
computerMallet.shapeColor="white";
boundary1.shapeColor="white";
boundary2.shapeColor="white";
boundary3.shapeColor="white";
boundary4.shapeColor="white";
boundary5.shapeColor="white";
boundary6.shapeColor="white";


function draw() {

//make backgroung
background("green");

//make scoreboard
fill("yellow");
text(computerScore,197,180);
text(playerScore,197,230);

//make striker bounceoff boundaries
striker.bounceOff(boundary1);
striker.bounceOff(boundary2);
striker.bounceOff(boundary3);
striker.bounceOff(boundary4);

//make playerMallet collide with boundaries
playerMallet.collide(boundary1);
playerMallet.collide(boundary2);
playerMallet.collide(boundary3);
playerMallet.collide(boundary4);

//make computerMallet collide with boundaries
computerMallet.collide(boundary1);
computerMallet.collide(boundary2);
computerMallet.collide(boundary3);
computerMallet.collide(boundary4);

//make striker bounceoff mallets
striker.bounceOff(playerMallet);
striker.bounceOff(computerMallet);

//make mallets bounceoff goals
playerMallet.bounceOff(goal2);
computerMallet.bounceOff(goal1);



computerMallet.x=striker.x;
//computerMallet.y=striker.y;

//give controlls to mallets
if(gameState==="play"){
if (keyDown("left")) {
  playerMallet.x=playerMallet.x-5;
}

if (keyDown("right")) {
  playerMallet.x=playerMallet.x+5;
}

if (keyDown("up")) {
  playerMallet.y=playerMallet.y-5;
}

if (keyDown("down")) {
  playerMallet.y=playerMallet.y+5;
}
}

//make centre line 
for (var i = 0; i < 400; i=i+20) {
 line(i,200,i+10,200);
}

//giving instuctions to play game 
if (gameState === "serve") {
  textSize(15);
  fill("yellow");
  text("(Press SPACE To Start)",125,150);
  
   textSize(15);
  fill("yellow");
  text("use LEFT OR RIGHT arrow to operate",90,250);
}


// to serve 
if (keyDown("space") && gameState === "serve") {
  serve();
  gameState="play";
}

//to give scores to scoreboard
if(striker.isTouching(goal1) || striker.isTouching(goal2)) {
    if (striker.isTouching(goal2)) {
    computerScore=computerScore+1;
    }
    if (striker.isTouching(goal1)) {
      playerScore=playerScore+1;
    }
    reset();
    gameState="serve";
  }

//giving instuctions to reset game
if (playerScore===5 || computerScore===5) {
    gameState="over";
    text("GAME OVER",170,160);
    text("Press   R  To Restart",150,250);
  }
  
  if (keyDown("r")&& gameState==="over") {
    computerScore=0;
    playerScore=0;
    gameState="serve";
    }
    
    
createEdgeSprites();
drawSprites();
}
function serve(){
  striker.velocityX=3;
  striker.velocityY=3;
}

function reset(){
  striker.velocityX=0;
  striker.velocityY=0;
  striker.x=200;
  striker.y=200;
  playerMallet.x=200;
  playerMallet.y=350;
  computerMallet.x=200;
  computerMallet.y=50;
}




// -----
    try { window.draw = draw; } catch (e) {}
    switch (stage) {
      case 'preload':
        if (preload !== window.preload) { preload(); }
        break;
      case 'setup':
        if (setup !== window.setup) { setup(); }
        break;
    }
  }
  window.wrappedExportedCode = wrappedExportedCode;
  wrappedExportedCode('preload');
};

window.setup = function () {
  window.wrappedExportedCode('setup');
};
