class Mouse{
  constructor(){
    this.x = parseInt(Math.random()*25);
    this.y = parseInt(Math.random()*25);
    this.url = 'img/mouse.png';
  }
  render(){

    $('canvas').drawImage({
      source: this.url,
      x: this.x *20 + 10, y: this.y * 20 + 10
    });
}
}
