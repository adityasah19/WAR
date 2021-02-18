var tiger,tigerimg;
var hrithik,hrithikimg;
var deadman;
var pcbullet,pcbulletimg;
var npcbullet,npcbulletimg,npcbulletgrp,pcbulletgrp,npcbullet2grp;
var tiger2,tiger2img;
var position,edges;
var gamestate=0,playbutton,playbuttonimg;
var pclifes=5;
var shield,shieldimg;
function preload(){
  tigerimg=loadImage('images/npc.png');
  hrithikimg=loadImage('images/pc.png');
  deadman=loadImage('images/dead.jpg');
  pcbulletimg=loadImage('images/pc bullet.png')
  npcbulletimg=loadImage('images/npc bullet.png')
 playbuttonimg=loadImage('images/play button.png')
 shieldimg=loadImage('images/shieldimage.png')

}



function setup() {
  createCanvas(displayWidth,displayHeight);

  tiger=createSprite(900, 500, 50, 50);
  tiger.addImage(tigerimg)
  tiger.scale=0.3

  hrithik=createSprite(100,500,50,50)
  hrithik.addImage(hrithikimg)
  hrithik.scale=0.3

  tiger2=createSprite(900, 300, 50, 50);
  tiger2.addImage(tigerimg)
  tiger2.scale=0.3

  edges=createEdgeSprites()

  playbutton=createSprite(500,350,50,50)
  playbutton.addImage(playbuttonimg)
 playbutton.scale=0.5
 playbutton.visible=false

 npcbulletgrp=new Group()
 npcbullet2grp=new Group()
 pcbulletgrp=new Group()

 
 
}

function draw() {
  background('brown');
console.log(gamestate)
  if(gamestate===0){
playbutton.visible=true
hrithik.visible=false
tiger.visible=false
tiger2.visible=false
//shield.visible=false
if(mousePressedOver(playbutton)){
gamestate=1
}

else if(gamestate===1){
  playbutton.visible=false
  if(keyWentDown('a')){
    shield=createSprite(300,500,50,50)
 shield.addImage(shieldimg)
  }
  else if(keyWentUp('a')){
    shield.destroy()
  }
  
  
  if(keyDown(UP_ARROW)){
    hrithik.y=hrithik.y-10
  }
  if(keyDown(DOWN_ARROW)){
    hrithik.y=hrithik.y+10
  }
  
 
  if(keyDown('SPACE')&&frameCount%5===0){
    spawnpcbullet()
  }
  position=Math.round(random(1,2))
  if(frameCount%70===0&&tiger.y<displayHeight&&tiger.y>0){
    if(position===1){
      tiger.velocityY=Math.round(random(-10,-5))
      tiger2.velocityY=Math.round(random(5,10))
  
    }
  else if(position===2){
    tiger.velocityY=Math.round(random(5,10))
    tiger2.velocityY=Math.round(random(-10,-5))
  
  }
  }
 // console.log(position)
  tiger2.visible=true
  tiger.visible=true
  hrithik.visible=true
  shield.visible=true
  tiger.collide(edges)
  tiger2.collide(edges)
  hrithik.collide(edges)
  createnpcbullet()
  if(npcbulletgrp.isTouching(hrithik)||npcbullet2grp.isTouching(hrithik)){
    if(pclifes>0){
    pclifes--
    }
    if(pclifes===0){
      textSize(20)
  fill('black')
  text('Game over  ',displayWidth/2,displayHeight/2)
    }
  }
  textSize(20)
  fill('black')
  text('LIFE  '+pclifes,50,50)
}
if(npcbulletgrp.isTouching(shield)||npcbullet2grp.isTouching(shield)){
  npcbulletgrp.destroyEach()
  npcbullet2grp.destroyEach()
}
if(pcbulletgrp.isTouching(tiger)){
  gamestate=0
  }
  if(pcbulletgrp.isTouching(tiger2)){
    gamestate=0
}
}
  drawSprites();
  if(gamestate===0){
  tiger.destroy()
  npcbulletgrp.destroyEach()
  tiger2.destroy()
    npcbullet2grp.destroyEach()
  }
}



function spawnpcbullet(){
  pcbullet=createSprite(180,490,50,50)
  pcbullet.addImage(pcbulletimg)
  pcbullet.y=hrithik.y-70
  pcbullet.velocityX=10
  pcbullet.scale=0.05

  pcbullet.depth=tiger.depth
  tiger.depth++
  pcbullet.depth=tiger2.depth
  tiger2.depth++
  pcbulletgrp.add(pcbullet)
}

function createnpcbullet(){
  if(frameCount%10===0){
    npcbullet=createSprite(800,300,50,50)
    npcbullet.addImage(npcbulletimg)
    npcbullet.y=tiger.y-60
    npcbullet.velocityX=-10
    npcbullet.scale=0.05
    npcbullet.depth=hrithik.depth
    hrithik.depth++

    npcbullet2=createSprite(800,300,50,50)
    npcbullet2.addImage(npcbulletimg)
    npcbullet2.y=tiger2.y-60
    npcbullet2.velocityX=-10
    npcbullet2.scale=0.05
    npcbullet2.depth=hrithik.depth
    hrithik.depth++
   
    npcbulletgrp.add(npcbullet)
    npcbullet2grp.add(npcbullet2)
  }
}