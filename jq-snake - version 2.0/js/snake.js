//Snake logic and class
class Snake{
  constructor( scene ){
     this.snake = $.localStorage.get('players');
     this.playerName = $('small').text();
     //Finds the saved player and get the player settings
      for(var i = 0; i < this.snake.length; i++){
        if(this.playerName == this.snake[i].name){
          this.scene = scene;  //GameMap
          this.direction = this.snake[i].direction;
          this.speed = this.snake[i].speed;
          this.body = this.snake[i].body;
          this.score = this.snake[i].score;
          this.deaths = this.snake[i].deaths;
        }
      }
  }



  render(){

    for(var i = 0; i < this.body.length; i++){
      $('canvas').drawRect({
      fillStyle: i==0?'#0F0' :'#FF0',
      x: this.body[i].x*20 + 10,
      y: this.body[i].y*20 + 10,
      width: 18,
      height: 18

    });
 }
  }

  move(){

    var head = {
      x: this.body[0].x,
      y: this.body[0].y
    }

   if(this.direction=='up'){
     if(head.y <= 0){
       head.y = 25;
     }
        head.y--;
   }
   else if(this.direction=='down'){
     if(head.y >= 24){
       head.y = -1;
     }
     head.y++;
   }
   else if(this.direction=='left'){
     if(head.x <= 0){
       head.x = 25;
     }
     head.x--;
   }

   else if(this.direction=='right'){
     if(head.x >= 24){
       head.x = -1;
     }
     head.x++;
   }
   this.body.unshift( head );

//if the mouse is not found => delete the last body element of our snake
      if(this.scene.isMouse( head.x, head.y ) == false){
           this.body.pop();
      }
      //if the mousse is  found rise the snake speed, players score, create a new mouse and save this player settings to localStorage
      else{
        if(this.speed >= 70){ this.speed -= 20; }
        this.score++;
        for(var i = 0; i < this.snake.length; i++){
          if(this.playerName == this.snake[i].name){
             this.snake[i].score = this.score;
             this.snake[i].direction = this.direction;
             this.snake[i].speed = this.speed;
             this.snake[i].body = this.body;
             $.localStorage.set('players', this.snake);
          }
        }
        this.live();
        var mouse = new Mouse();
        m = this.filterMouse(mouse);
        this.scene.addMouse(m);
       }

//ends the game if the snake bits itself
       for(var i = 1; i < this.body.length; i++){
     if(head.x == this.body[i].x && head.y == this.body[i].y){
      this.scene.gameOver();
      this.deaths++;
      this.direction = 'stop';
      this.live();
    }
    }

    this.scene.render();
    this.render();


}
//if the mouse coordinates = snakes coordinates. create new mouse
  filterMouse(mouse){

    for(var i = 0; i < this.body.length; i++){
      if(mouse.x == this.body[i].x && mouse.y == this.body[i].y){
          mouse = new Mouse();
          this.filterMouse(mouse);
      }
   }
   return mouse;
  }

//makes our snake live
  live(){

  if(this.timer){clearInterval(this.timer)};
  if(this.direction != 'stop'){
   this.timer = setInterval(function(){
     this.move();
   }.bind(this), this.speed);
   this.bindEvents();
 }
  }



bindEvents(){

  $('body').keydown(function(e){

    if(e.keyCode == 37){if(this.body[0].x - 1 != this.body[1].x) this.direction = 'left';}    //{if(this.direction != 'right') this.direction = 'left';}
      else if(e.keyCode == 38){if(this.body[0].y - 1 != this.body[1].y) this.direction = 'up';}
        else if(e.keyCode == 39){if(this.body[0].x + 1 != this.body[1].x) this.direction = 'right';}
          else if(e.keyCode == 40){if(this.body[0].y + 1 != this.body[1].y) this.direction = 'down';}
  }.bind(this));
}


}
