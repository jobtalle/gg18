function start() {
    renderer = new Renderer();
    gamepad = new Gamepad();
    interface = new Interface();
    controllerFactory = new ControllerFactory();

    renderer.resize();
}