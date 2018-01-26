function Beamer(angle) {
    this.angle = angle;
    
    this.place(angle);
}

Beamer.prototype = {
    COLOR: "#0056bb",
    
    update(timeStep) {
        
    },
    
    render(context) {
        context.save();
        context.translate(this.position.x, this.position.y);
        context.rotate(this.angle + Math.PI * 0.5);
        
        context.strokeStyle = this.COLOR;
        context.beginPath();
        context.moveTo(0, 0);
        context.lineTo(0, -10);
        context.stroke();
        
        context.restore();
    },
    
    place(angle) {
        this.position = new Vector(
            Math.cos(angle) * Planet.prototype.RADIUS,
            Math.sin(angle) * Planet.prototype.RADIUS);
    }
}