function CharSelect(playerAmount){
    if (playerAmount == -1)
        this.playerAmount = 0;
    else
        this.playerAmount = playerAmount;
    
    this.playerIndexes = [];
    this.players = [];
    
    this.createCharacterSelectionScreen();
    this.addCharacterListeners();
}

CharSelect.prototype = {
    createCharacterSelectionScreen()
    {
        document.getElementById("startscreen").style.display = 'block';
    },
    
    hideCharacterSelection(){
        var charHeaders = document.getElementById("characterHeaders");
        var charPortraits = document.getElementById("characterPortraits");
        
        //cleanup on aisle 3
        while (charHeaders.firstChild){
            charHeaders.removeChild(charHeaders.firstChild);
            charPortraits.removeChild(charPortraits.firstChild);
        }
        
        document.getElementById("startscreen").style.display = 'none';
    },
    
    addCharacterListeners(){
        gamepad.on('press', 'button_1', e => {
            if (this.playerIndexes.indexOf(e.player) == -1){
                this.playerIndexes.push(e.player);
                this.addPlayer(e.player);
            }
        });
        
        gamepad.on('press', 'start', e => {
            if (this.playerIndexes.length < 2)
                console.log("Can't start game because there are not enough players");
            else{
                console.log("Starting game!");
                this.startGame();
            }
                
        });
    },
    
    startGame(){
        var game = new Game(
            renderer,
            this.players);
        this.hideCharacterSelection();
        game.start();
    },
    
    addPlayer(playerId) {
        var charHeaders = document.getElementById("characterHeaders");
        var charPortraits = document.getElementById("characterPortraits");
        
        const color = this.getRandomColor();
        var th = document.createElement("th");
        var randomcolor = color;
        th.style.color = color;
        th.style.textShadow = '2px 2px rgba(255,255,255,1)';
        th.innerHTML = 'Player: ' + playerId.toString();

        var tr = document.createElement("td");

        void tr.offsetWidth;
        tr.classList.add("expandingClass");
        tr.style.boxShadow = '0px 10px 80px ' + color;
        tr.innerHTML = 'portrait of player ' + playerId.toString() + ' goes here';

        charHeaders.appendChild(th);
        charPortraits.appendChild(tr);
        
        this.players.push(new Player(new PlayerController(gamepad, playerId)));
    },
    
    getRandomColor() {
        var letters = '0123456789ABCDEF';
        var color = '#';
        for (var i = 0; i < 6; i++) 
        {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    }
}