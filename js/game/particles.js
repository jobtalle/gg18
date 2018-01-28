function Particle(x, y, type) {
    this.x = x;
    this.y = y;
    
    this.type = type;
    
    this.spawnParticle();
}

Particle.prototype = {
    getParent() {
        return document.getElementById("popupParent");
    },
    
    spawnParticle() {
        this.element = document.createElement("IMG");
        
        this.element.setAttribute("src", "img/particles/" + this.getSpriteWithIndex(this.type));
        this.element.setAttribute("width", "32");
        this.element.setAttribute("height", "32");

        this.getParent().appendChild(this.element);

        void this.element.offsetWidth;

        this.element.innerHTML = this.score;
        this.element.classList.add("particles");

        this.element.style.top = this.y + (-this.element.clientHeight / 2) + window.innerHeight * 0.5 + 'px';
        this.element.style.left = this.x + (-this.element.clientWidth / 2) + window.innerWidth * 0.5 + 'px';
        this.element.style.position = 'absolute';
        
        this.element.addEventListener("webkitAnimationEnd", this.onEnd.bind(this));
    },
    
    onEnd() {
        this.getParent().removeChild(this.element);
    },
    
    getSpriteWithIndex(type){
        switch (type){
            case 0:
                return 'heart.gif';
                break;
            case 1:
                return 'mad.gif';
                break;
        }
    },
    
    getRandomInt(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min)) + min;
    }
}