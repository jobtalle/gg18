function start() {
    renderer = new Renderer();
    gamepad = new Gamepad();
    interface = new Interface();
    controllerFactory = new ControllerFactory();
    globalScore = new GlobalScore(0);
    gameoverScreen = new GameoverScreen();
	
    renderer.resize();
}