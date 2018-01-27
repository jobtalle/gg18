function start() {
    interface = new Interface();
    renderer = new Renderer();
    gamepad = new Gamepad();
    
    interface.showStartScreen();
    
    renderer.resize();
    interface.startGame();
}

function instantiatePlayer(index) {
    var player = new Player(new PlayerController());
    
    player.INDEX = index;
    
    console.log("Created player: " + index);
}