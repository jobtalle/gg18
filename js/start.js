function start() {
    const renderer = new Renderer();
    
    renderer.resize();
    
    var game = new Game(
        renderer,
        [new Player(new PlayerController())]);
    game.start();
}

function instantiatePlayer(index) {
    var player = new Player(new PlayerController());
    
    player.INDEX = index;
    
    console.log("Created player: " + index);
}