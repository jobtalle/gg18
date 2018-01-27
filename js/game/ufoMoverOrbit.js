function UfoMoverOrbit(orbits, height) {
    this.position = new Vector();
    this.initialAngle = Math.random() * Math.PI * 2;
    this.angle = 0;
    this.orbit = 0;
    this.orbits = orbits - 1;
    this.orbitHeight = height;
    this.speed = this.getRadialSpeed(300);
    this.leaving = false;
    this.leaveHeight = 0;
}

UfoMoverOrbit.prototype = {
    INCOMING_RADIANS: 1.4,
    LEAVE_SPEED: 100,
    
    update(timeStep) {
        const radius = this.getRadius();
        const angle = this.angle + this.initialAngle;
        
        if(this.leaving) {
            this.leaveHeight += this.LEAVE_SPEED * timeStep;
            
            if(this.leaveHeight + this.orbitHeight > Planet.prototype.RADIUS_INCOMING)
                this.onLeave(this);
        }
        
        if(this.angle > Math.PI * 2) {
            this.angle -= Math.PI * 2;
            
            if(++this.orbit > this.orbits)
                this.onLeave(this);
        }
        
        this.angle += this.speed * timeStep;
        this.position.x = Math.cos(angle) * radius;
        this.position.y = Math.sin(angle) * radius;
    },
    
    leave() {
        this.leaving = true;
    },
    
    getAngle() {
        return this.initialAngle + this.angle;
    },
    
    getRadius() {
        if(this.orbit == 0 && this.angle < this.INCOMING_RADIANS)
            return this.orbitHeight +
                (Planet.prototype.RADIUS_INCOMING - this.orbitHeight) *
                (1 - Math.sin((this.angle / this.INCOMING_RADIANS) * Math.PI * 0.5)) +
                this.leaveHeight;
        else if(this.orbit == this.orbits && this.angle > Math.PI * 2 - this.INCOMING_RADIANS)
            return this.orbitHeight +
                (Planet.prototype.RADIUS_INCOMING - this.orbitHeight) *
                (1 - Math.sin(((Math.PI * 2 - this.angle) / this.INCOMING_RADIANS) * Math.PI * 0.5)) +
                this.leaveHeight;
        
        return this.orbitHeight + this.leaveHeight;
    },
    
    getRadialSpeed(speed) {
        return speed / (this.orbitHeight * 2 * Math.PI);
    }
}