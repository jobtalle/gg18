function Crystal(angle, essence) {
    this.angle = angle;
    this.essence = essence;
    this.life = this.LIFETIME;
    this.day = true;
    
    this.position = new Vector(
        Math.cos(angle) * Planet.prototype.RADIUS,
        Math.sin(angle) * Planet.prototype.RADIUS);
}

Crystal.prototype = {
    LIFETIME: 4,
    
    update(timeStep) {
        
    },
    
    setDay(day) {
        this.day = day;
    },
    
    drain(timeStep) {
        this.life -= timeStep;
        
        if(this.life < 0)
            this.life = 0;
    },
    
    getStrength() {
        return Math.sqrt(this.life / this.LIFETIME);
    },
    
    getColor() {
        return this.essence.getColor(this.day);
    },
    
    carry(angle, height) {
        this.angle = angle;
        this.position.x = Math.cos(angle) * (Planet.prototype.RADIUS + height);
        this.position.y = Math.sin(angle) * (Planet.prototype.RADIUS + height);
    },
    
    drop(angle) {
        this.position.x = Math.cos(angle) * Planet.prototype.RADIUS;
        this.position.y = Math.sin(angle) * Planet.prototype.RADIUS;
    },
    
    render(context) {
        context.save();
        context.translate(this.position.x, this.position.y);
        context.rotate(this.angle + Math.PI * 0.5);
        context.globalAlpha = this.getStrength();
        
        context.fillStyle = this.getColor();
        context.beginPath();
        context.moveTo(0, 0);
        context.lineTo(-5, -5);
        context.lineTo(0, -10);
        context.lineTo(5, -5);
        context.closePath();
        
        
        context.fill();
        
        context.restore();
    }
}
