function spawnPopup() {
	
            var element = document.getElementById("popup");
            var rnd = getRandomInt(200, 6000);
            var randomCol = getRandomColor();
            
            if (element.classList.contains("popup"))
                element.classList.remove("popup");
            
            void element.offsetWidth;
            
            element.style.border = '2px solid ' + randomCol;
            element.style.textShadow = '2px 2px ' + randomCol;
            element.style.boxShadow = '0px 0px 25px ' + randomCol;
            
            element.classList.add("popup");
            element.innerHTML = rnd;
        }
            
        function spawnCharacterSelection(playerAmount) {
            console.log("creating " + playerAmount + " players");
            
            var charHeaders = document.getElementById("characterHeaders");
            var charPortraits = document.getElementById("characterPortraits");
            
            //cleanup on aisle 3
            while (charHeaders.firstChild){
                charHeaders.removeChild(charHeaders.firstChild);
                charPortraits.removeChild(charPortraits.firstChild);
            }
            
            for (var i = 0; i < playerAmount; i++) {
                var th = document.createElement("th");
                var randomcolor = getRandomColor();
                th.style.color = randomcolor;
                th.style.textShadow = '2px 2px rgba(0,0,0,1)';
                th.innerHTML = 'Player: ' + i.toString();
                
                var tr = document.createElement("td");void tr.offsetWidth;
                tr.classList.add("expandingClass");
                tr.style.boxShadow = '0px 10px 80px ' + randomcolor;
                tr.innerHTML = 'portrait of player ' + i.toString() + ' goes here';
                
                charHeaders.appendChild(th);
                charPortraits.appendChild(tr);
                
                instantiatePlayer(i);
            }
        }
            
        function lerpItGirl (value1, value2, amount){
            amount = amount < 0 ? 0 : amount;
            amount = amount > 1 ? 1 : amount;
            return value1 + (value2 - value1) * amount;
        }
            
        function getRandomInt(min, max) {
            min = Math.ceil(min);
            max = Math.floor(max);
            return Math.floor(Math.random() * (max - min)) + min;
        }
            
        function getRandomColor() {
            var letters = '0123456789ABCDEF';
            var color = '#';
            for (var i = 0; i < 6; i++) 
            {
                color += letters[Math.floor(Math.random() * 16)];
            }
            return color;
        }
            
        function getOneOfTheSecundaryColors() {
            var rnd = getRandomInt(0, 5);
            var colors = ['#008000', '#FFFF00', '#FF0000', '#008080', '#800080', '#00FF00'];
            
            return colors[rnd];
        }
		
    var element = document.getElementById("popup");
    var rnd = getRandomInt(200, 6000);
    var randomCol = getRandomColor();

    if (element.classList.contains("popup"))
        element.classList.remove("popup");

    void element.offsetWidth;

    element.style.border = '2px solid ' + randomCol;
    element.style.textShadow = '2px 2px ' + randomCol;
    element.style.boxShadow = '0px 0px 25px ' + randomCol;

    element.classList.add("popup");
    element.innerHTML = rnd;
}

function spawnCharacterSelection(playerAmount) {
    console.log("creating " + playerAmount + " players");

    var charHeaders = document.getElementById("characterHeaders");
    var charPortraits = document.getElementById("characterPortraits");

    //cleanup on aisle 3
    while (charHeaders.firstChild){
        charHeaders.removeChild(charHeaders.firstChild);
        charPortraits.removeChild(charPortraits.firstChild);
    }

    for (var i = 0; i < playerAmount; i++) {
        var th = document.createElement("th");
        var randomcolor = getRandomColor();
        th.style.color = randomcolor;
        th.style.textShadow = '2px 2px rgba(0,0,0,1)';
        th.innerHTML = 'Player:' + i.toString();

        var tr = document.createElement("td");void tr.offsetWidth;
        tr.classList.add("expandingClass");
        tr.style.boxShadow = '0px 10px 80px ' + randomcolor;
        tr.innerHTML = 'portrait of player ' + i.toString() + ' goes here';

        charHeaders.appendChild(th);
        charPortraits.appendChild(tr);

        //instantiatePlayer(i);
    }
    
    document.getElementById('startscreen').style.display = 'block';
}

function lerpItGirl (value1, value2, amount){
    amount = amount < 0 ? 0 : amount;
    amount = amount > 1 ? 1 : amount;
    return value1 + (value2 - value1) * amount;
}

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
}

function getRandomColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) 
    {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

function getOneOfTheSecondaryColors() {
    var rnd = getRandomInt(0, 5);
    var colors = ['#008000', '#FFFF00', '#FF0000', '#008080', '#800080', '#00FF00'];

    return colors[rnd];
}
