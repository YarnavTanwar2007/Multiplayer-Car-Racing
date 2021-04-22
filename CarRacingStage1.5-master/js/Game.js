class Game {
  constructor(){

  }
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
  /*starting the game*/
  async start(){
    if(gameState === 0){
      player = new Player();
      var playerCountRef = await database.ref('playerCount').once("value");
      /*ensures that 4 players are in the game*/
      if(playerCountRef.exists()){
        playerCount = playerCountRef.val();
        player.getCount();
      }
      /*If 4 players are not in the game it will open a new form until we get 4 players*/
      form = new Form()
      form.display();
    }

    /*After getting 4 players*/
    /*I will assign sprites to each player*/
    car1 = createSprite(100,200);
    car1.addImage(car1Img);
    car2 = createSprite(300,200);
    car2.addImage(car2Img);
    car3 = createSprite(500,200);
    car3.addImage(car3Img);
    car4 = createSprite(700,200);
    car4.addImage(car4Img);
    cars = [car1, car2, car3, car4];

    gameover = createSprite(800,2000);
    gameover.addImage(gameOverImg);
  }
/*If the game starts play function will be executed and the game starts*/
  play(){
    form.hide();

    Player.getPlayerInfo();

    player.getCarsAtEnd();

    if(allPlayers !== undefined){
      //var display_position = 100;
      image(track2Img,0,-displayHeight*4,displayWidth,displayHeight*5)
      //index of the array
      var index = 0;

      //x and y position of the cars
      var x = 250;
      var y;

      for(var plr in allPlayers){
        //add 1 to the index for every loop
        index = index + 1 ;

        //position the cars a little away from each other in x direction
        x = x + 200;
        //use data form the database to display the cars in y direction
        y = displayHeight - allPlayers[plr].distance;
        cars[index-1].x = x;
        cars[index-1].y = y;

        if (index === player.index){
          stroke(10);
          fill("yellow");
          ellipse(x, y, 125,125);
          cars[index - 1].shapeColor = "red";
          camera.position.x = displayWidth/2;
          camera.position.y = cars[index-1].y
        }
        //textSize(15);
        //text(allPlayers[plr].name + ": " + allPlayers[plr].distance, 120,display_position)
      }
    }

    if(keyIsDown(UP_ARROW) && player.index !== null){
      player.distance +=10
      player.update();
    }
    if(player.distance>=4200){
      player.rank = player.rank + 1;
      Player.updateCarsAtEnd(player.rank)
      gameState = 2;
      gameover.debug = true;
      gameover.visible = true;
    }
    drawSprites();
  }
  end(){
    console.log(player.rank);
    console.log("gameover");
  }
}