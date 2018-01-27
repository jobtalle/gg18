function start() {
    const renderer = new Renderer();
    
    renderer.resize();
    const gamepad = new Gamepad();
    var pcf = new playerControllerFactory(gamepad);

    gamepad.on('press', 'button_1', e => {
        console.log(e.player + ' button 1 was pressed!');
        console.log(pcf.getPlayerControllerController(e.player));
    });
    gamepad.on('press', 'button_2', e => {
        console.log(e.player + ' button 1 was pressed!');
        console.log(pcf.releaseControllerId(e.player));
    });

    var game = new Game(
        renderer,
        [new Player(new PlayerController())]);
    game.start();
}