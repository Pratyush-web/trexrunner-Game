var trex ,trex_running, trex_collided;
var ground, ground_image, invisible_ground;
var cloud, cloud_image, cloudGroup;
var obstacle, obstacle1, obstacle2, obstacle3, obstacle4, obstacle5, obstacle6, obstacleGroup;
var score =0;
var PLAY = 1;
var END = 0;
var gameState = PLAY;
var restart, restartImage;
var gameover, gameoverImage;
var jumpSound;
var checkpointSound;
var dieSound;

function preload()
{
  trex_running = loadAnimation("trex1.png", "trex3.png", "trex4.png");
  trex_collided = loadAnimation("trex_collided.png");
  ground_image = loadImage("ground2.png");
  cloud_image = loadImage("cloud.png");
  obstacle1 = loadImage("obstacle1.png");
  obstacle2 = loadImage("obstacle2.png");
  obstacle3 = loadImage("obstacle3.png");
  obstacle4 = loadImage("obstacle4.png");
  obstacle5 = loadImage("obstacle5.png");
  obstacle6 = loadImage("obstacle6.png");
  restartImage = loadImage("restart.png");
  gameoverImage = loadImage("gameOver.png");
  jumpSound = loadSound("jump.mp3");
  checkpointSound = loadSound("checkPoint.mp3");
  dieSound = loadSound("die.mp3");
}

function setup()
{
  
  createCanvas(600,200)
  
  //create a trex sprite
  trex = createSprite(50,170,20,50);
  trex.addAnimation("running", trex_running);
  trex.addAnimation("collided", trex_collided);  
  trex.scale = 0.5;

  ground = createSprite(300,170, 600, 2); 
  ground.addImage(ground_image);
  
  
  invisible_ground = createSprite(300, 180, 600, 2);
  invisible_ground.visible = false;
  
  cloudGroup = new Group();
  
  obstacleGroup = new Group();
  obstacleGroup.debug = false;
  
  trex.debug = false;
  trex.setCollider("rectangle", 0, 0, 150, 50);
  
  restart = createSprite(300, 100, 20, 20);
    restart.addImage(restartImage);
    restart.scale = 0.5;
 
    gameover = createSprite(300, 50, 20, 20);
    gameover.addImage(gameoverImage);
    gameover.scale = 0.5;
}

function draw()
{
  background("white");
  
  stroke("black");
  text("Score:"+score, 500, 20);
  
  if(gameState === PLAY)
  {
    ground.velocityX = -(5 + Math.round(score/100));
    
  if(keyDown("space") && trex.y > 165)
  {
  trex.velocityY = -12;
  jumpSound.play();
  }
  
  if(ground.x<0)
  {
  ground.x = ground.width/2;
  }  
  
  spawnClouds();
  spawnObstacles();
  
  score=score+Math.round(getFrameRate()/30);
    
  gameover.visible = false;
  restart.visible = false;
    
  if(trex.isTouching(obstacleGroup)){
   gameState = END;    
   dieSound.play();
  }
  }
  else
  if(gameState === END){
    ground.velocityX = 0;
    
    cloudGroup.setVelocityXEach(0);
    obstacleGroup.setVelocityXEach(0);
    
    cloudGroup.setLifetimeEach(-1);
    obstacleGroup.setLifetimeEach(-1);
    
    trex.changeAnimation("collided", trex_collided);
    
    gameover.visible = true;
      restart.visible = true;
    
    if(mousePressedOver(restart))
    {
      reset();
    }
  } 
  
  if(score%100 === 0 && score>0)
  {
    checkpointSound.play();
  }
  
      var message = "Hi I'm Pratyush";
    console.log(message);

  
  trex.velocityY = trex.velocityY+1;
  trex.collide(invisible_ground);       
      
  drawSprites();
}

function spawnClouds()
{
  if(frameCount%60 === 0)
  {
  cloud = createSprite(600, 20, 20, 20);
  cloud.addImage(cloud_image);
  cloud.velocityX = -(5 + Math.round(score/100));
  cloud.scale=0.5;
  
  console.log(cloud.depth);
  cloud.y = Math.round(random(20, 60));
  
  trex.depth=cloud.depth;
  trex.depth=trex.depth+1;
  
  cloud.lifetime=130;
  cloudGroup.add(cloud);  
  }
}

function spawnObstacles()
{
  if(frameCount%60===0)
  {
  obstacle = createSprite(600, 170, 10, 10);
  obstacle.velocityX = -(5 + Math.round(score/100));
  
  var rand = Math.round(random(1, 6));
  switch(rand)
  {
    case 1: obstacle.addImage(obstacle1);
    break;
    case 2: obstacle.addImage(obstacle2);
    break;
    case 3: obstacle.addImage(obstacle3);
    break;
    case 4: obstacle.addImage(obstacle4);
    break;
    case 5: obstacle.addImage(obstacle5);
    break;
    case 6: obstacle.addImage(obstacle6);
    break;
    default : break;
      }
    obstacle.scale = 0.5;
    obstacle.lifetime = 130;
    obstacleGroup.add(obstacle);
    obstacle.debug = false;
  }
}

function reset()
{
  score = 0;
      obstacleGroup.destroyEach();
      cloudGroup.destroyEach();
      gameover.visible = false;
      restart.visible = false;
      trex.changeAnimation("running", trex_running);
      gameState = PLAY;
}


