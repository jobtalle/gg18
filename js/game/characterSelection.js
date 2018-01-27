function CharSelect(playerAmount){
    if (playerAmount == -1)
        this.playerAmount = 0;
    else
        this.playerAmount = playerAmount;
    
    this.playerIndexes = [];
    this.players = [];
    this.CHARACTER_PORTRAITS = ['portraits_idle.gif', 'portraits_idle_arms.gif', 'portraits_running.gif', 'portraits_running_arms.gif', 'portraits_shooting.gif'];
    
    
//    this.portraits_idle = new Sprite("img/portrait/portraits_idle.png", 0,0,3, 6.667);
//    this.portraits_idle_arms = new Sprite("img/portrait/portraits_idle_arms.png", 0,0,3, 6.667);
//    this.portraits_running = new Sprite("img/portrait/portraits_running.png", 0,0,4, 6.667);
//    this.portraits_running_arms = new Sprite("img/portrait/portraits_running_arms.png", 0,0,4, 6.667);
//    this.portraits_shooting = new Sprite("img/portrait/portraits_shooting.png", 0,0,3, 6.667);
    
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
            if (this.playerIndexes.length < 1)
                console.log("Can't start game because there are not enough players");
            else{
                console.log("Starting game!");
                this.startGame();
            }
                
        });
    },
    
    startGame() {
        var game = new Game(renderer, this.players);
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
        
        var img = document.createElement("IMG");
        img.setAttribute("src", "img/character/" + this.getNewPortrait());
        img.setAttribute("width", "100%");
        img.setAttribute("height", "100%");

        charHeaders.appendChild(th);
        charPortraits.appendChild(tr);
        tr.appendChild(img);
        
        this.players.push(new Player(controllerFactory.createPlayerController(playerId)));
    },
    
    getNewPortrait(){
        return this.CHARACTER_PORTRAITS[this.getRandomInt(0, this.CHARACTER_PORTRAITS.length)];
    },
    
    getRandomColor() {
        var letters = '0123456789ABCDEF';
        var color = '#';
        for (var i = 0; i < 6; i++) 
        {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    },
    
    getRandomInt(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min)) + min;
    }
}