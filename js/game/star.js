function Star(x, y, type) {
    if (x == -1)
        this.x = this.getRandomInt(0, window.innerWidth);
    else
        this.x = x;
    
    if (y == -1)
        this.y = this.getRandomInt(0, window.innerHeight);
    else
        this.y = y;
    
    this.spawnStar();
}

Star.prototype = {
    
    getParent(){
        return document.getElementById("popupParent");  
    },
    
    spawnStar() {
        this.element = document.createElement("IMG");
        
        this.element.style.position = 'absolute';
        this.element.style.top = this.x + 'px';
        this.element.style.left = this.y + 'px';
        
        var rnd = this.getRandomInt(0,7);
        
        
        this.element.setAttribute("src", "img/gems/stars_big_blue.gif");
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
                return ''
                break;
            case 1:
                break;
            case 2:
                break;
            case 3:
                break;
            case 4:
                break;
            case 5:
                break;
            case 6:
                break;
            case 7:
                break;
        }
    }
}