function Scenery(angle) {
    this.angle = angle;
    this.position = new Vector(
        Math.cos(angle) * Planet.prototype.RADIUS,
        Math.sin(angle) * Planet.prototype.RADIUS);
}

Scenery.prototype = {
    COLOR: "#ff0000",
    
    render(context) {
        context.save();
        context.rotate(this.angle);
        
        context.fillStyle = this.COLOR;
        
        context.beginPath();
        context.arc(this.position.x, this.position.y, 5, 0, Math.PI * 2);
        context.fill();
        
        context.restore();
    }
}