function UfoMoverOrbit(orbits, height) {
    this.position = new Vector();
    this.initialAngle = Math.random() * Math.PI * 2;
    this.angle = 0;
    this.orbit = 0;
    this.orbits = orbits - 1;
    this.orbitHeight = height;
    this.speed = this.getRadialSpeed(300);
}

UfoMoverOrbit.prototype = {
    INCOMING_RADIANS: 1.4,
    
    update(timeStep) {
        const radius = this.getRadius();
        const angle = this.angle + this.initialAngle;
        
        if(this.angle > Math.PI * 2) {
            this.angle -= Math.PI * 2;
            
            if(++this.orbit > this.orbits && this.onLeave != undefined)
                this.onLeave(this);
        }
        
        this.angle += this.speed * timeStep;
        this.position.x = Math.cos(angle) * radius;
        this.position.y = Math.sin(angle) * radius;
    },
    
    getAngle() {
        return this.initialAngle + this.angle;
    },
    
    getRadius() {
        if(this.orbit == 0 && this.angle < this.INCOMING_RADIANS) {
            return this.orbitHeight +
                (Planet.prototype.RADIUS_INCOMING - this.orbitHeight) *
                (1 - Math.sin((this.angle / this.INCOMING_RADIANS) * Math.PI * 0.5));
        }
        else if(this.orbit == this.orbits && this.angle > Math.PI * 2 - this.INCOMING_RADIANS) {
            return this.orbitHeight +
                (Planet.prototype.RADIUS_INCOMING - this.orbitHeight) *
                (1 - Math.sin(((Math.PI * 2 - this.angle) / this.INCOMING_RADIANS) * Math.PI * 0.5));
        }
        
        return this.orbitHeight;
    },
    
    getRadialSpeed(speed) {
        return speed / (this.orbitHeight * 2 * Math.PI);
    }
}