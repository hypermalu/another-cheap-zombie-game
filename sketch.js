var fondo,fondoImg
var bala,balaImg
var arma,armaImg
var personaje,personajeImg
var zombi,zombiImg
var balas
var zombiGroup
var balaGroup
var explosion,explosionImg
var score = 0
var scoretablero
var linea, lineaImg
var vida = 5
var vida2
var gameover, gameoverImg

function preload(){
  fondoImg = loadImage("fondo.jpg")
  balaImg = loadImage("bala.png")
  armaImg = loadImage("arma.png")
  personajeImg = loadImage("personaje.png")
  zombiImg = loadAnimation("zombie1.png","zombie2.png","zombie3.png")
  explosionImg = loadAnimation("exp1.png","exp2.png","exp3.png","exp4.png","exp5.png")
  lineaImg = loadImage("linea.png")
  gameoverImg = loadImage("gameover.png")
}

function setup(){
  createCanvas(600,600);

  fondo = createSprite(300,300,600,600);
  fondo.addImage(fondoImg)
  fondo.scale=2

  linea = createSprite(500,300)
  linea.addImage(lineaImg)
  linea.scale=1.2

  personaje = createSprite(550,350)
  personaje.addImage(personajeImg)
  personaje.scale = 0.5
  arma = createSprite(355,355)
  arma.addImage(armaImg)
  arma.scale = 0.2
  
  gameover=createSprite(300,300)
  gameover.addImage(gameoverImg)
  gameover.visible=false

  zombiGroup=createGroup()
  balaGroup=createGroup()

  scoretablero=createElement("h2")
  vida2=createElement("h2")
}

function disparar(){
  bala = createSprite(150, width/2, 50,20)
  bala.y= arma.y-5
  bala.x=arma.x-40
  bala.addImage(balaImg)
  bala.scale = 0.015
  bala.velocityX = -30
  balaGroup.add(bala)
}

function draw(){

  scoretablero.html("puntos "+score);
  scoretablero.style('color:white');
  scoretablero.position(150,20)
  vida2.html("vida"+vida)
  vida2.style('color:white')
  vida2.position(250,20)

  if(frameCount%80===0){
    generador()
  }
  
  if(keyDown("w")){
    personaje.y=personaje.y-15
  }

  if(keyDown("s")){
    personaje.y=personaje.y+15
  }

  if(keyDown("space")){
    disparar();
  }


  arma.x = personaje.x-40
  arma.y = personaje.y+30

  if(zombiGroup.collide(balaGroup)){
    zombi.destroy();
    explosion=createSprite(zombi.x,zombi.y);
    explosion.addAnimation("explosion",explosionImg);
    explosion.life=20
    explosion.scale=0.7
    score=score+1
  }

  if(zombiGroup.collide(linea)){
   vida=vida-1;
   explosion=createSprite(zombi.x,zombi.y);
   explosion.addAnimation("explosion",explosionImg);
   zombi.destroy();
   explosion.life=20
   explosion.scale=0.7
  }
  
  if(vida===0){
    zombiGroup.destroyEach()
    gameover.visible=true
  }

  drawSprites()
}
function generador(){
  zombi=createSprite(0,random(20,580));
  zombi.addAnimation("zombi",zombiImg);
  zombi.scale=0.5;
  zombi.velocityX=7

  zombi.lifetime=400;
  zombiGroup.add(zombi)
}


