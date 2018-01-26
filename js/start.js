function start() {
    const renderer = new Renderer();
    
    renderer.resize();
    
    var game = new Game(
        renderer,
        [new Player(new PlayerController())]);
    game.start();
}