function Interface() {
    
}

Interface.prototype = {
    showStartScreen() {
        spawnCharacterSelection(0);
    },
    
    startGame() {
        var game = new Game(
            renderer,
            [new Player(new PlayerController(gamepad, 0))]);
        game.start();
    }
}