function Beam(angle, aim, crystal, radius) {
    this.angle = angle;
    this.crystal = crystal;
    this.radius = radius;
    
    this.cut = false;
    this.innerRadius = 0;
    this.outerRadius = 0;
    
    this.position = new Vector(
        Math.cos(this.angle) * radius,
        Math.sin(this.angle) * radius);
    
    this.angle += aim;
}

Beam.prototype = {
    SPEED: 800,
    ANGLE: 0.5,
    
    update(timeStep) {
        this.outerRadius += this.SPEED * timeStep;
        this.radians = this.getAngle();
        
        if(this.outerRadius > Planet.prototype.RADIUS_INCOMING)
            this.outerRadius = Planet.prototype.RADIUS_INCOMING;
        
        if(this.cut)
            this.innerRadius += this.SPEED * timeStep;
    },
    
    getAngle() {
        return this.ANGLE * this.crystal.getStrength();
    },
    
    render(context) {
        context.save();
        context.translate(this.position.x, this.position.y);
        context.rotate(this.angle);
        context.globalAlpha = 0.5;
        
        context.fillStyle = this.crystal.getColor();
        context.beginPath();
        context.arc(0, 0, this.innerRadius, -this.radians * 0.5, this.radians * 0.5, false);
        context.arc(0, 0, this.outerRadius, this.radians * 0.5, -this.radians * 0.5, true);
        context.fill();
        
        context.restore();
    },
    
    stop() {
        this.cut = true;
    },
    
    setCrystal(crystal) {
        this.crystal = crystal;
    },
    
    isInvisible() {
        return this.innerRadius > Planet.prototype.RADIUS_INCOMING;
    },
    
    rotate(angle) {
        this.angle += angle;
    }
}