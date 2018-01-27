function Interface() {
    
}

Interface.prototype = {
    showStartScreen() {
        
    },
    
    startGame() {
        var game = new Game(
            renderer,
            [new Player(new PlayerController(gamepad, 0))]);
        game.start();
    }
}