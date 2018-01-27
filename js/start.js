function start() {
    const renderer = new Renderer();
    
    renderer.resize();
    const gamepad = new Gamepad();
    var pcf = new playerControllerFactory(gamepad);
  
    var game = new Game(
        renderer,
        [new Player(new PlayerController(gamepad, 0))]);
    game.start();
}

function instantiatePlayer(index) {
    var player = new Player(new PlayerController());
    
    player.INDEX = index;
    
    console.log("Created player: " + index);
}