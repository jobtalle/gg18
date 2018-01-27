function Crystal(angle, color) {
    this.angle = angle;
    this.color = color;
    
    this.position = new Vector(
        Math.cos(angle) * Planet.prototype.RADIUS,
        Math.sin(angle) * Planet.prototype.RADIUS);
}

Crystal.prototype = {
    update(timeStep) {
        
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
    
    getColor() {
        return this.color;
    },
    
    render(context) {
        context.save();
        context.translate(this.position.x, this.position.y);
        context.rotate(this.angle + Math.PI * 0.5);
        
        context.fillStyle = this.color;
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