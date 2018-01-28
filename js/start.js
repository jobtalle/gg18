function start() {
    renderer = new Renderer();
    gamepad = new Gamepad();
    interface = new Interface();
    controllerFactory = new ControllerFactory();
    globalScore = new GlobalScore(0);
	
    renderer.resize();
}