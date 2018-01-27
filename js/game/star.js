var tmp = []

function Star(x, y, type) {
    if (x == -1)
        this.x = this.getRandomInt(0, window.innerWidth);
    else
        this.x = x;
    
    if (y == -1)
        this.y = this.getRandomInt(0, window.innerHeight);
    else
        this.y = y;
    
    if (type == -1)
        this.type = type;
    else
        this.type = this.getRandomInt(0,7);
    
    this.spawnStar();
}

Star.prototype = {
    
    getParent(){
        return document.getElementById("backgroundElements");  
    },
    
    spawnStar() {
        this.element = document.createElement("IMG");
        
        this.element.style.position = 'absolute';
        
        tmp.push(this.y);
        
        console.log(this.x, this.y);
        
        this.element.style.top = this.x + 'px';
        this.element.style.left = this.y + 'px';
        
        this.element.setAttribute("src", "img/gems/" + this.getRandomStarSprite(this.type));
        this.element.setAttribute("width", "32");
        this.element.setAttribute("height", "32");
        
        this.getParent().appendChild(this.element);
    },
    
    getRandomInt(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min)) + min;
    },
    
    getRandomStarSprite(rnd){
        switch (rnd){
            case 0:
                return 'stars_big_blue.gif';
                break;
            case 1:
                return 'stars_big_green.gif';
                break;
            case 2:
                return 'stars_big_pink.gif';
                break;
            case 3:
                return 'stars_big_yellow.gif';
                break;
            case 4:
                return 'stars_small_blue.gif';
                break;
            case 5:
                return 'stars_small_green.gif';
                break;
            case 6:
                return 'stars_small_pink.gif';
                break;
            case 7:
                return 'stars_small_yellow.gif';
                break;
        }
    }
}