function Beamer(angle) {
    this.angle = angle;
    this.aim = 0;
    this.beamSize = 0.5;
    this.beams = [];
    
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
        context.lineTo(0, -6);
        context.stroke();
        
        context.restore();
        context.save();
        
        context.translate(this.position.x, this.position.y);
        context.rotate(this.angle + Math.PI * 0.5);
        context.translate(0, -12);
        
        context.fillStyle = "white";
        context.beginPath();
        context.arc(0, 0, 6, 0, Math.PI);
        context.fill();
        
        context.restore();
    },
    
    place(angle) {
        this.position = new Vector(
            Math.cos(angle) * Planet.prototype.RADIUS,
            Math.sin(angle) * Planet.prototype.RADIUS);
        this.positionNormalized = this.position.normalize();
    },
    
    activate() {
        
    },
    
    deactivate() {
        
    }
}