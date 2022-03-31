var missil, missil_imagem, grupo_missil;
var homem, homem_correndo, homem_parado;
var chao;
var cenario, cenario_imagem;
var edges;
var score = 0;
var missil_velocidade= -6;
var gamestate = 1;
var restart, restart_image;
function preload(){
  missil_imagem = loadImage ("missil.png") ;
  homem_correndo = loadAnimation ("homem_1.png", "homem_2.png", "homem_3.png", "homem_4.png");
  homem_parado = loadAnimation ("homem_1.png");
  cenario_imagem = loadImage ("cenario.jpg");
  restart_image = loadImage ("restart.png")
}

function setup(){ 
  createCanvas (600,400);
  grupo_missil = new Group ()

  cenario = createSprite (300, 200, 600, 400)
  cenario.addImage (cenario_imagem)
  cenario.scale = 3
  cenario.velocityX = -4

  chao = createSprite (0, 400, 600, 50)
  chao.visible = false

  homem = createSprite (50, 350, 50, 50);
  homem.addAnimation ("correndo", homem_correndo);
  homem.addAnimation ("parado", homem_parado)
  homem.scale = 0.3

  restart = createSprite (300, 200, 100, 100)
  restart.addImage (restart_image)
} 


function draw(){ 
  //background(cenario_imagem);
  drawSprites()
  homem.collide (chao)
  edges = createEdgeSprites(); 
  fill ("black")
  text ("Score:"+ score, 530, 50)

  if (gamestate == 1){
    homem.changeAnimation ("correndo")
    cenario.velocityX = -4

    if (keyDown ("space") && homem.y > 300){
      homem.velocityY = -5.5
    }
    homem.velocityY += 0.2
    
    if (frameCount %3  == 0){
      score +=1
    }    
  
    if (cenario.x < 0){
      cenario.x = 600
    }
    
    if (grupo_missil.isTouching (homem)){
      gamestate = 2
    }
    lançar()
    restart.visible = false
  }
  
    if (gamestate == 2){
      homem.changeAnimation ("parado")
      restart.visible = true
      cenario.velocityX = 0
      grupo_missil.setVelocityXEach (0)

    if (mousePressedOver (restart)){
      reset()
    }
  
    }

    
}
  function lançar () {
    if (frameCount %84 == 0){
      missil = createSprite (550, 350, 50, 50)
      missil.addImage (missil_imagem)
      missil.scale = 0.2
      missil.velocityX = missil_velocidade
      grupo_missil.add (missil)
  }
  if (frameCount %300 == 0){
    missil_velocidade -=0.5
}
  
}

  function reset () {
    gamestate = 1
    grupo_missil.destroyEach ()
    score = 0

  }

  
