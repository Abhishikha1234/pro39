class Game {
  constructor(){}

  getState(){
    var gameStateRef  = database.ref('gameState');
    gameStateRef.on("value",function(data){
       gameState = data.val();
    })

  }

  update(state){
    database.ref('/').update({
      gameState: state
    });
  }

  async start(){
    if(gameState === 0){
      player = new Player();
      var playerCountRef = await database.ref('playerCount').once("value");
      if(playerCountRef.exists()){
        playerCount = playerCountRef.val();
        player.getCount();
      }
      form = new Form()
      form.display();
    }
    car1=createSprite(100,150,50,50);
    car1.addImage(c1);
    car2=createSprite(300,150,50,50);
    car2.addImage(c2);
    car3=createSprite(500,150,50,50);
    car3.addImage(c3);
    car4=createSprite(700,150,50,50);
    car4.addImage(c4);
    cars=[car1,car2,car3,car4];
  }

  play(){
    form.hide();
    textSize(30);
    text("Game Start", 120, 100)
    Player.getPlayerInfo();

    if(allPlayers !== undefined){
      
      image(track,0,-displayHeight*4,displayWidth,displayHeight*5);
      
      var index = 0;

      
      var x = 175;
      var y;

      for(var plr in allPlayers){
       
        index = index + 1 ;

        
        x = x + 200;
        
        y = displayHeight - allPlayers[plr].distance;
        cars[index-1].x = x;
        cars[index-1].y = y;

        if (index === player.index){
          cars[index - 1].shapeColor = "red";
          camera.position.x = displayWidth/2;
          camera.position.y = cars[index-1].y
        }
       
       
      }

    }

    if(keyIsDown(UP_ARROW) && player.index !== null){
      player.distance +=10
      player.update();
    }

    drawSprites();
  }
}