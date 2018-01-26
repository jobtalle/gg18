function Beam(angle, color, radians) {
    this.angle = angle;
    this.color = color;
    this.radians = radians;
    
    this.cut = false;
    this.innerRadius = 0;
    this.outerRadius = 0;
}

Beam.prototype = {
    SPEED: 500,
    
    update(timeStep) {
        this.outerRadius += this.SPEED * timeStep;
        
        if(this.cut)
            this.innerRadius += this.SPEED * timeStep;
    },
    
    render(context) {
        context.save();
        context.rotate(this.angle + Math.PI * 0.5);
        context.translate(0, -Planet.prototype.RADIUS);
        
        context.strokeStyle = "white";
        context.beginPath();
        context.moveTo(0, -this.innerRadius);
        context.lineTo(0, -this.outerRadius);
        context.stroke();
        
        context.restore();
    },
    
    stop() {
        this.cut = true;
    },
    
    isInvisible() {
        return this.innerRadius > Planet.prototype.RADIUS_INCOMING;
    }
}