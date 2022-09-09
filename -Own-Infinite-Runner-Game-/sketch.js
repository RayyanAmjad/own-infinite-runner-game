var space,rocket,meteor;
var spaceImg,rocketImg,meteorImage;
var missiles,missilesGroup,missilesImage,meteorGroup;
var end,endImage;
var gameover,button;
var gameoverImg,buttonImg;
var alein,aleinImage,aleinGroup;

var PLAY = 1;
var END = 0;
var gameState=1;

function preload(){
  

  rocketImg = loadImage("rocket.png");
  missilesImage = loadImage("missile.png"); 
  meteorImage = loadImage("meteor.png");
   spaceImg = loadImage("space3.png");
   endImage = loadImage("burst.png");
   gameoverImg =loadImage("GAME OVER.png");
   buttonImg =loadImage("button2.png");
   aleinImage = loadImage("alein.png")

}

function setup(){
  createCanvas(400,400);
  background("black");


  space=createSprite(200,200,900,300);
  space.addImage(spaceImg);
  space.velocityX = -5;
  space.scale=1.10;
  

  
  rocket = createSprite(50,190,30,30);
  rocket.addImage(rocketImg);
  rocket.scale =0.15;
  
  missilesGroup = new Group();
  meteorGroup = new Group();
  aleinGroup = new Group();

rocket.setCollider("circle" ,0,0,100);
  rocket.debug = true;

  var gameover = createSprite(300,100);
  gameover.addImage(gameoverImg);
  gameover.scale = 0.1;
  gameover.visible = false;
 

 
  

  var button = createSprite(300,100);
  button.addImage(buttonImg);
  button.scale = 0.1;
  button.visible = false;
 

  score = 0;
  aleinsdestroyed = 0;
          
}

function draw() {

  background(180);
  
  

  if (gameState===PLAY){
    space.velocityX = -5;

    
  score = score + Math.round(frameCount/100);
    
    if(space.x < 100){
      space.x = space.width/2;
       }

if (keyDown("up_arrow")) {
  rocket.y = rocket.y -7;
}

if (keyDown("down_arrow")){
  rocket.y = rocket.y +7;
}

edges = createEdgeSprites();
rocket.collide(edges);


if(World.frameCount % 30 === 0){
  spawnMeteor();  }

  if (keyDown("space")){
    createMissiles();
  }

  if(World.frameCount % 190 === 0){
    spawnalein();  }

    if(missilesGroup.isTouching(aleinGroup)){
      missilesGroup.destroyEach();
      aleinGroup.destroyEach();
     
    }

    if(meteorGroup.isTouching(rocket)){
      gameState = END; 
    }


}




   if (gameState === END){

   
    
    rocket.addImage(endImage)
    space.velocityX = 0;

    meteorGroup.setVelocityXEach(0);
    meteorGroup.setLifetimeEach(-1);

    gameover.visible = true;
    button.visible = true;

  }

  if(keyDown("RIGHT_ARROW")){
    reset();
  }

    

  drawSprites();
  fill(225);
  text("Score: "+ score, 250,50);


function createMissiles() {
  var missiles= createSprite(0,0, 0, 0);
  missiles.addImage(missilesImage);
  missiles.x = 60;
  missiles.y=rocket.y;
  missiles.velocityX = 100;
  missiles.lifetime = 100;
  missiles.scale = 0.2;
  missilesGroup.add(missiles);
  
}

function spawnMeteor() {
    
    var meteor = createSprite(550,Math.round(random(20,370)) ,20,20);
    meteor.addImage(meteorImage);
    meteor.velocityX = -4;
    meteor.lifetime = 150;
    meteor.scale = 0.1;
   meteorGroup.add(meteor);

}

function spawnalein() {
    
  var alein = createSprite(550,Math.round(random(20,370)) ,20,20);
  alein.addImage(aleinImage);
  alein.velocityX = -4;
  alein.lifetime = 150;
  alein.scale = 0.03;
  aleinGroup.add(alein);

}


function reset(){
  gameState = PLAY;
  gameover.visible = false;
  rocket.addImage(rocketImg);
   
  meteor.destroyEach();
  alein.destroyEach();
}



}

  
  

