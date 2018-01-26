function Beam(angle, color, radians) {
    this.angle = angle;
    this.color = color;
    this.radians = radians;
    
    this.cut = false;
    this.innerRadius = 0;
    this.outerRadius = 0;
}

Beam.prototype = {
    SPEED: 800,
    
    update(timeStep) {
        this.outerRadius += this.SPEED * timeStep;
        if(this.outerRadius > Planet.prototype.RADIUS_INCOMING)
            this.outerRadius = Planet.prototype.RADIUS_INCOMING;
        
        if(this.cut)
            this.innerRadius += this.SPEED * timeStep;
    },
    
    render(context) {
        context.save();
        context.rotate(this.angle + Math.PI * 0.5);
        context.translate(0, -Planet.prototype.RADIUS);
        context.rotate(-Math.PI * 0.5);
        
        context.fillStyle = this.color;
        context.beginPath();
        context.arc(0, 0, this.innerRadius, -this.radians * 0.5, this.radians * 0.5, false);
        context.arc(0, 0, this.outerRadius, this.radians * 0.5, -this.radians * 0.5, true);
        context.fill();
        
        context.restore();
    },
    
    stop() {
        this.cut = true;
    },
    
    isInvisible() {
        return this.innerRadius > Planet.prototype.RADIUS_INCOMING;
    }
}