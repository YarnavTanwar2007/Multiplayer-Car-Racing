class Form {

  /*Creating necessary elements*/
  constructor() {
    this.input = createInput("Name");
    this.button = createButton('Play');
    this.greeting = createElement('h2');
    this.title = createElement('h2');
    this.restart = createButton('Reset');
  }
  /*hiding at the elements after key pressed*/
  hide(){
    this.greeting.hide();
    this.button.hide();
    this.input.hide();
    this.title.hide();
  }

  /*displaying elements in order with their position*/
  display(){
    this.title.html("Car Racing Game");
    this.title.position(displayWidth/2 - 60, 0);

    this.input.position(displayWidth/2 - 60, displayHeight/2 - 80);
    this.button.position(displayWidth/2 + 30, displayHeight/2);
    this.restart.position(1450, 20);
2
    /*writing the functions of button*/
    /*this.button => used to call the current object*/
    this.button.mousePressed(()=>{
      this.input.hide();
      this.button.hide();
      player.name = this.input.value();
      playerCount+=1;
      player.index = playerCount;
      player.update();
      player.updateCount(playerCount);
      this.greeting.html("Hello " + player.name)
      this.greeting.position(displayWidth/2 - 70, displayHeight/4);
    });
    this.restart.mousePressed(()=>{
      player.updateCount(0);
      game.update(0);
    });
  }
}
