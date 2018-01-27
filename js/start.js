function start() {
    interface = new Interface();
    renderer = new Renderer();
    gamepad = new Gamepad();
    controllerFactory = new playerControllerFactory(gamepad);
    
    renderer.resize();
    interface.startGame();
}

function instantiatePlayer(index) {
    var player = new Player(new PlayerController());
    
    player.INDEX = index;
    
    console.log("Created player: " + index);
}