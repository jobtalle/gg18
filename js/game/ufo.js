function Ufo() {
    this.initialAngle = Math.random() * Math.PI * 2;
    this.angle = 0;
    this.orbit = 0;
    this.orbits = 1;
    this.speed = this.getRadialSpeed(400);
}

Ufo.prototype = {
    COLOR: "#66aa33",
    INCOMING_RADIANS: 1,
    
    update(timeStep) {
        const radius = this.getRadius();
        const angle = this.angle + this.initialAngle;
        
        if(this.angle > Math.PI * 2) {
            this.angle -= Math.PI * 2;
            ++this.orbit;
        }
        
        this.angle += this.speed * timeStep;
        this.position = new Vector(
            Math.cos(angle) * radius,
            Math.sin(angle) * radius);
    },
    
    render(context) {
        context.save();
        context.translate(this.position.x, this.position.y);
        context.rotate(this.initialAngle + this.angle + Math.PI * 0.5);
        
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
        if(this.orbit == 0 && this.angle < this.INCOMING_RADIANS) {
            return Planet.prototype.RADIUS_ORBIT +
                (Planet.prototype.RADIUS_INCOMING - Planet.prototype.RADIUS_ORBIT) *
                (0.5 + Math.cos((this.angle / this.INCOMING_RADIANS) * Math.PI) * 0.5);
        }
        
        return Planet.prototype.RADIUS_ORBIT;
    },
    
    getRadialSpeed(speed) {
        return speed / (Planet.prototype.RADIUS_ORBIT * 2 * Math.PI);
    }
}