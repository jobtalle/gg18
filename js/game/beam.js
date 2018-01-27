function Beam(angle, aim, crystal, radius) {
    this.angle = angle;
    this.aim = aim;
    this.crystal = crystal;
    this.radius = radius;
    
    this.cut = false;
    this.innerRadius = 0;
    this.outerRadius = 0;
}

Beam.prototype = {
    SPEED: 800,
    
    update(timeStep) {
        this.outerRadius += this.SPEED * timeStep;
        this.radians = 0.5 * this.crystal.getStrength();
        
        if(this.outerRadius > Planet.prototype.RADIUS_INCOMING)
            this.outerRadius = Planet.prototype.RADIUS_INCOMING;
        
        if(this.cut)
            this.innerRadius += this.SPEED * timeStep;
    },
    
    render(context) {
        context.save();
        context.rotate(this.angle + Math.PI * 0.5);
        context.translate(0, -this.radius);
        context.rotate(-Math.PI * 0.5 + this.aim);
        context.globalAlpha = 0.5;
        
        context.fillStyle = this.crystal.getColor();
        context.beginPath();
        context.arc(0, 0, this.innerRadius, -this.radians * 0.5, this.radians * 0.5, false);
        context.arc(0, 0, this.outerRadius, this.radians * 0.5, -this.radians * 0.5, true);
        
        context.shadowBlur = 25;
        context.shadowColor = this.crystal.getColor();
        
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
        this.aim += angle;
    }
}