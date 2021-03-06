function CharSelect(playerAmount){
    if (playerAmount == -1)
        this.playerAmount = 0;
    else
        this.playerAmount = playerAmount;

    this.playerIndexes = [];
    this.players = [];
    this.CHARACTER_PORTRAITS = ['portraits_idle.gif', 'portraits_idle_arms.gif', 'portraits_running.gif', 'portraits_running_arms.gif', 'portraits_shooting.gif'];

    this.color = undefined;
    
    this.CHARACTER_SYMBOLS = ['9830', '9829', '9827', '9824', '1422', '1758', '4044', '9004', '9630', '9865', '9823'];
    this.symbol = undefined;

    this.createCharacterSelectionScreen();
    this.addCharacterListeners();
    this.game = undefined;
}

CharSelect.prototype = {
    createCharacterSelectionScreen()
    {
        document.getElementById("startscreen").style.display = 'block';
    },

    hideCharacterSelection(){
        document.getElementById("startscreen").style.display = 'none';
        
        var charHeaders = document.getElementById("characterHeaders");
        var charPortraits = document.getElementById("characterPortraits");

        //cleanup on aisle 3
        while (charHeaders.firstChild){
            charHeaders.removeChild(charHeaders.firstChild);
            charPortraits.removeChild(charPortraits.firstChild);
        }
        
        var tut = document.getElementById("tutorial");
        
    },

    addCharacterListeners(){
        gamepad.on('press', 'button_1', e => {
            if (this.playerIndexes.indexOf(e.player) == -1){
                this.playerIndexes.push(e.player);
                this.addPlayer(e.player);
            }
        });

        gamepad.on('press', 'start', e => {
            if (this.playerIndexes.length < 1)
                console.log("Can't start game because there are not enough players");
            else if(this.game == undefined)
                this.startGame();

        });
    },

    startGame() {
        this.game = new Game(renderer, this.players);
        this.hideCharacterSelection();
        globalScore.unhide();
        this.game.start();
    },

    addPlayer(playerId) {
        var charHeaders = document.getElementById("characterHeaders");
        var charPortraits = document.getElementById("characterPortraits");
        var header = document.getElementById("header");

        this.color = this.getRandomColor();
        const symbol = this.getRandomSymbol();
        
        this.CHARACTER_SYMBOLS.splice(this.CHARACTER_SYMBOLS.indexOf(symbol), 1);
        
        var th = document.createElement("th");
        th.style.color = this.color;
        th.style.textShadow = '2px 2px rgba(255,255,255,1)';
        th.innerHTML = 'Player: ' + symbol;
        this.symbol = symbol;

        var tr = document.createElement("td");

        void tr.offsetWidth;
        tr.classList.add("expandingClass");
        tr.style.boxShadow = '0px 20px 80px ' + this.color;

        var img = document.createElement("img");
        img.setAttribute("src", "img/character/" + this.getNewPortrait());

        charHeaders.appendChild(th);
        charPortraits.appendChild(tr);
        tr.appendChild(img);

        this.players.push(new Player(controllerFactory.createPlayerController(playerId), undefined, this.color));
        
        if (this.players.length > 1)
            header.innerHTML = 'Press START to play or continue adding players with A';
    },

    getNewPortrait(){
        return this.CHARACTER_PORTRAITS[this.getRandomInt(0, this.CHARACTER_PORTRAITS.length)];
    },
    
    getRandomSymbol(){
        return String.fromCharCode(this.CHARACTER_SYMBOLS[getRandomInt(0, this.CHARACTER_SYMBOLS.length)]);
    },

    getRandomColor() {
        return "hsl(" + 360 * Math.random() + ',' +
                 (75 + 100 * Math.random()) + '%,' + 
                 (50 + 0 * Math.random()) + '%)';
    },

    getRandomInt(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min)) + min;
    }
}
