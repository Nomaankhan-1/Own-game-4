var bg,bgImg;
var player,bullet,bulletGroup,zombie,zombieGroup;
var score = 0;


function preload(){
  
  shooterImg = loadImage("assets/shooter_2.png")
  shooter_shooting = loadImage("assets/shooter_3.png")
  bulletImg = loadImage("assets/bullet2.png")    
  bgImg = loadImage("assets/bg.jpeg")
  zombiesound=loadSound("checkPoint.mp3");
  zombie2Img= loadImage("assets/zombie.png");
  zombie1Img = loadImage("assets/zombie1.png");
  
}

function setup() {

  
  createCanvas(windowWidth,windowHeight);

  //adding the background image
  bg = createSprite(displayWidth/2-20,displayHeight/2-40,20,20)
bg.addImage(bgImg)
bg.scale = 1.1
  

//creating the player sprite
player = createSprite(displayWidth-1150, displayHeight-300, 50, 50);
 player.addImage(shooterImg)
   player.scale = 0.3
   player.debug = true
   player.setCollider("rectangle",0,0,300,300)
  
  
 

   bulletGroup = new Group();
   zombieGroup = new Group();
  
}

function draw() {
  background(0); 
 




  //moving the player up and down and making the game mobile compatible using touches
if(keyDown("UP_ARROW")||touches.length>0){
  player.y = player.y-30 
}
if(keyDown("DOWN_ARROW")||touches.length>0){
 player.y = player.y+30
}




//release bullets and change the image of shooter to shooting position when space is pressed
if(keyWentDown("space")){
 
  player.addImage(shooter_shooting)
 
}

//player goes back to original standing image once we stop pressing the space bar
else if(keyWentUp("space")){
  player.addImage(shooterImg)
}
 if(keyDown("space")){
  createBullet();
 }




if(bulletGroup.isTouching(zombieGroup))
{
  zombieGroup.destroyEach();
  bulletGroup.destroyEach();
  zombiesound.play();
  score = score+10;
}

spawnZombies();
drawSprites();

fill("white");
textSize(30);
text("Score: "+ score, width/5, height/10);

}


function createBullet() {
  bullet= createSprite(250,300,10,10);
  bulletImg = loadImage("assets/bullet1.png")
  bullet.addImage(bulletImg)
  bullet.scale = 0.3;
  bullet.y=player.y;
  bullet.velocityX = 14;
  bulletGroup.add(bullet);


}

  function spawnZombies() {
    if(frameCount % 60 === 0) {
      var zombie = createSprite(displayWidth-300,displayHeight-random(200,600), 50, 50);
      
      //obstacle.debug = true;
     zombie.velocityX = -6;
      
      //generate random obstacles
      var rand = Math.round(random(1,2));
      switch(rand) {
        case 1: zombie.addImage(zombie1Img);
                break;
        case 2: zombie.addImage(zombie2Img);
                break;
        default: break;
      }
      
      //assign scale and lifetime to the obstacle           
      zombie.scale = 0.2;
      zombie.lifetime = 300;
      
     
      
      //add each obstacle to the group
      zombieGroup.add(zombie);
    }
  }


