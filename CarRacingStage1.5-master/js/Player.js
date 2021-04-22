class Player {
  constructor(){
    this.index = null;
    this.distance = 0;
    this.name = null;
    this.rand = null;
  }

  getCount(){
    var playerCountRef = database.ref('playerCount');
    playerCountRef.on("value",(data)=>{
      playerCount = data.val();
    })
  }

  //setting player count in database
  updateCount(count){
    database.ref('/').update({
      playerCount: count
    });
  }

  update(){
    var playerIndex = "players/player" + this.index;
    database.ref(playerIndex).set({
      name:this.name,
      distance:this.distance
    });
  }

  static getPlayerInfo(){
    var playerInfoRef = database.ref('players');
    playerInfoRef.on("value",(data)=>{
      allPlayers = data.val();
    })
  }

  getCarsAtEnd(rank){
    database.ref('CarsAtEnd').on("value",(data)=>{
      this.rank = data.val();
    })
  }
  static updateCarsAtEnd(rank){
    database.ref('/').update({
      CarsAtEnd: rank
    })
  }
}
