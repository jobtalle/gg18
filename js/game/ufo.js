function Ufo() {
    this.angle = Math.random() * Math.PI * 2;
    this.orbits = 2;
    this.speed = this.getRadialSpeed(200);
}

Ufo.prototype = {
    COLOR: "#66aa33",
    INCOMING_RADIANS: 1,
    
    update(timeStep) {
        const radius = this.getRadius();
        
        this.angle += this.speed * timeStep;
        this.position = new Vector(
            Math.cos(this.angle) * radius,
            Math.sin(this.angle) * radius);
    },
    
    render(context) {
        context.save();
        context.translate(this.position.x, this.position.y);
        context.rotate(this.angle + Math.PI * 0.5);
        
        context.strokeStyle = this.COLOR;
        context.beginPath();
        context.moveTo(-8, 0);
        context.lineTo(8, 0);
        context.stroke();
        
        context.fillStyle = this.COLOR;
        context.beginPath();
        context.arc(0, 0, 4, 0, Math.PI * 2);
        context.fill();
        
        context.restore();
    },
    
    getRadius() {
        return Planet.prototype.RADIUS_ORBIT;
    },
    
    getRadialSpeed(speed) {
        return speed / (Planet.prototype.RADIUS_ORBIT * 2 * Math.PI);
    }
}