function Popup(x, y, score, color) {
    if (x == -1)
        this.x = this.getRandomInt(0, window.innerWidth);
    else
        this.x = x;
    
    if (y == -1)
        this.y = this.getRandomInt(0, window.innerHeight);
    else
        this.y = y;
    
    if(color == undefined)
        this.color = this.getRandomColor();
    else
        this.color = color;
    
    this.score = score;
    
    this.spawnPopup();
}

Popup.prototype = {
    getParent() {
        return document.getElementById("popupParent");
    },
    
    spawnPopup() {
        this.element = document.createElement("popup");

        this.getParent().appendChild(this.element);

        void this.element.offsetWidth;

        //this.element.style.border = '2px solid ' + this.color;
        
        this.element.style.textShadow = '2px 2px ' + this.color;
        //this.element.style.boxShadow = '0px 0px 25px ' + this.color;

        this.element.classList.add("popup");
        this.element.innerHTML = this.score;

        this.element.style.top = this.y + (-this.element.clientHeight / 2) + window.innerHeight * 0.5 + 'px';
        this.element.style.left = this.x + (-this.element.clientWidth / 2) + window.innerWidth * 0.5 + 'px';
        console.log( this.x + (-this.element.clientWidth / 2) + 'px');
        this.element.addEventListener("webkitAnimationEnd", this.onEnd.bind(this));
    },
    
    onEnd() {
        this.getParent().removeChild(this.element);
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