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
    SPEED: 1500,
    ANGLE: 0.5,
    FLUTTER: 0.1,
    
    update(timeStep) {
        this.outerRadius += this.SPEED * timeStep;
        this.radians = this.getAngle();
        
        if(this.outerRadius > Planet.prototype.RADIUS_INCOMING)
            this.outerRadius = Planet.prototype.RADIUS_INCOMING;
        
        if(this.cut)
            this.innerRadius += this.SPEED * timeStep;
    },
    
    getAngle() {
        return (this.ANGLE * this.crystal.getStrength()) * (1 - this.FLUTTER * 0.5 + Math.random() * this.FLUTTER);
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
        
        context.shadowBlur = 25;
        context.shadowColor = this.crystal.getColor();
        
        context.fill();
        
        var minRads = Math.random() * -this.radians * 0.5;
        var maxRads = Math.random() * this.radians * 0.5;
        
        context.fillStyle = "white";
        context.beginPath();
        context.arc(0, 0, this.innerRadius, minRads, maxRads, false);
        context.arc(0, 0, this.outerRadius, maxRads, minRads, true);
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
        return this.crystal.getStrength() == 0 || this.innerRadius > Planet.prototype.RADIUS_INCOMING;
    },
    
    rotate(angle) {
        this.angle += angle;
    }
}