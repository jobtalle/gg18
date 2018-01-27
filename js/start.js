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