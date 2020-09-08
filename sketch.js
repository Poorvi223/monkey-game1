
var monkey , monkey_running
var banana ,bananaImage, obstacle, obstacleImage
var FoodGroup, obstacleGroup
var score
var survivalTime=0;

function preload(){
  
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
 
}



function setup() {
  createCanvas(400,400);
  
  monkey = createSprite(50,300,20,20);
  monkey.addAnimation("running",monkey_running);
  monkey.scale = 0.15; 

  ground = createSprite(200,350,800,20);
  ground.velocityX = -4;
  ground.x = ground.width/2;
  
  FoodGroup = new Group();
  obstacleGroup = new Group();
  
 // monkey.setCollider("circle",0,0,50);
  monkey.debug = true
  survivalTime=0;
}


function draw() {
 background("lightblue");
  
  if(keyDown("space")){
    monkey.velocityY=-10;
  }
  monkey.velocityY = monkey.velocityY + 0.8
  
   if (ground.x < 0){
      ground.x = ground.width/2;
    }
  if (obstacleGroup.isTouching(monkey)){
   FoodGroup.setVelocityXEach(0); 
   obstacleGroup.setVelocityXEach(0);
    ground.velocityX = 0;
    monkey.velocityY = 0;
    obstacleGroup.setLifetimeEach(-1);
    FoodGroup.setLifetimeEach(-1);
  }
  monkey.collide(ground);
  
  stroke("black");
  textSize(20);
  fill("black")
  survivalTime = Math.ceil(frameCount/frameRate());
  text("Survival Time:"+survivalTime,100,50);
  
  food();
  obstacles();
  
  drawSprites();
  
}

function food() {
 if(frameCount % 80 === 0){
   banana = createSprite(600,300,30,30)
   banana.addImage(bananaImage);
   banana.velocityX = -6;  
   banana.y = Math.round(random(120,200));
   
   banana.lifetime = 200;
   
   banana.scale = 0.05;
   FoodGroup.add(banana);
  
 }

}

function obstacles(){
  if(frameCount % 300 === 0){
    obstacle = createSprite(600,330,20,20);
    obstacle.velocityX = -5;
    obstacle.addImage(obstacleImage);
    
  
    obstacle.scale = 0.15;
    obstacleGroup.add(obstacle);
  }
}





