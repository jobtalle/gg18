function Interface() {
    this.showStartScreen();
}

Interface.prototype = {
    showStartScreen() {
        new CharSelect();
    },
    
    startGame() {
        var game = new Game(
            renderer,
            [new Player(new PlayerController(gamepad, 0))]);
        game.start();
    }
}