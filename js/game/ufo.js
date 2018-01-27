function Ufo(essences, mover) {
    this.essences = essences;
    this.mover = mover;
    this.finished = false;
    
    this.storeColors();
}

Ufo.prototype = {
    COLOR: "#66aa33",
    
    update(timeStep) {
        this.mover.update(timeStep);
    },
    
    render(context) {
        context.save();
        context.translate(this.mover.position.x, this.mover.position.y);
        context.rotate(this.mover.getAngle() + Math.PI * 0.5);
        
        context.strokeStyle = this.COLOR;
        context.beginPath();
        context.moveTo(-8, 0);
        context.lineTo(8, 0);
        context.stroke();
        
        context.fillStyle = this.essences[0].getColor();
        context.beginPath();
        context.arc(0, 0, 4, 0, Math.PI * 2);
        context.fill();
        
        context.restore();
    },
    
    storeColors() {
        this.colors = [];
        
        for(var i = 0; i < this.essences.length; ++i)
            this.colors.push(this.essences[i].color);
    },
    
    findBeams(beams) {
        var hitBeams = [];
        
        for(var i = 0; i < beams.length; ++i)
            if(this.isInBeam(beams[i]))
                hitBeams.push(beams[i]);
        
        return hitBeams;
    },
    
    isInBeam(beam) {
        const delta = this.mover.position.subtract(beam.position);
        const normalizedDelta = delta.normalize();
        const length = delta.length();
        
        return Math.acos(normalizedDelta.dot(Vector.prototype.fromAngle(beam.angle))) < beam.getAngle() * 0.5 &&
            length > beam.innerRadius &&
            length < beam.outerRadius;
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
        this.mover.leave();
    },
    
    addLeaveListener(onLeave) {
        this.mover.onLeave = onLeave;
    }
}