function Ufo(essence) {
    this.essence = essence;
    this.initialAngle = Math.random() * Math.PI * 2;
    this.angle = 0;
    this.orbit = 0;
    this.orbits = 1;
    this.speed = this.getRadialSpeed(300);
    this.orbitHeight = Planet.prototype.RADIUS_ORBIT;
    this.position = new Vector();
    this.finished = false;
    
    this.storeColors();
}

Ufo.prototype = {
    COLOR: "#66aa33",
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
    
    render(context) {
        context.save();
        context.translate(this.position.x, this.position.y);
        context.rotate(this.initialAngle + this.angle + Math.PI * 0.5);
        
        context.strokeStyle = this.COLOR;
        context.beginPath();
        context.moveTo(-8, 0);
        context.lineTo(8, 0);
        context.stroke();
        
        context.fillStyle = this.essence[0].getColor();
        context.beginPath();
        context.arc(0, 0, 4, 0, Math.PI * 2);
        context.fill();
        
        context.restore();
    },
    
    storeColors() {
        this.colors = [];
        
        for(var i = 0; i < this.essence; ++i)
            this.colors.push(this.essence.color);
    },
    
    findBeams(beams) {
        var hitBeams = [];
        
        for(var i = 0; i < beams.length; ++i)
            if(this.isInBeam(beams[i]))
                hitBeams.push(beams[i]);
        
        return hitBeams;
    },
    
    isInBeam(beam) {
        const delta = this.position.subtract(beam.position).normalize();
        
        return Math.acos(delta.dot(Vector.prototype.fromAngle(beam.angle))) < beam.getAngle() * 0.5;
    },
    
    match(beams) {
        if(beams.length == 0)
            return false;
        
        var matches = new Array(this.colors.length);
        
        for(var i = 0; i < this.colors.length; ++i)
            matches[i] = false;
        
        for(var i = 0; i < beams.length; ++i) {
            const index = this.colors.indexOf(beams[i].crystal.essence.color);
            
            if(index != -1)
                matches[index] = true;
        }
        
        for(var i = 0; i < this.colors.length; ++i)
            if(!matches[i]) return false;
        
        return true;
    },
    
    leave() {
        this.finished = true;
        console.log("Ufo destroyed");
    },
    
    addLeaveListener(onLeave) {
        this.onLeave = onLeave;
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
        return speed / (Planet.prototype.RADIUS_ORBIT * 2 * Math.PI);
    }
}