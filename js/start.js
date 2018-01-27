function start() {
    renderer = new Renderer();
    gamepad = new Gamepad();
    interface = new Interface();
    
    renderer.resize();
    interface.startGame();
}

function instantiatePlayer(index) {
    var player = new Player(new PlayerController());
    
    player.INDEX = index;
    
    console.log("Created player: " + index);
}