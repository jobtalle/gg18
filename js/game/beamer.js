function Beamer(angle) {
    this.angle = angle;
    this.aim = 0;
    this.beamSize = 0.5;
    this.beams = [];
    this.on = false;
    
    this.place(angle);
}

Beamer.prototype = {
    COLOR: "#0056bb",
    COLOR_DISH: "blue",
    
    update(timeStep) {
        for(var i = 0; i < this.beams.length; ++i)
            this.beams[i].update(timeStep);
    },
    
    render(context) {
        context.save();
        context.translate(this.position.x, this.position.y);
        context.rotate(this.angle + Math.PI * 0.5);
        
        context.strokeStyle = this.COLOR;
        context.beginPath();
        context.moveTo(0, 0);
        context.lineTo(0, -6);
        context.stroke();
        
        context.restore();
        context.save();
        
        context.translate(this.position.x, this.position.y);
        context.rotate(this.angle + Math.PI * 0.5);
        context.translate(0, -12);
        
        context.fillStyle = this.COLOR_DISH;
        context.beginPath();
        context.arc(0, 0, 6, 0, Math.PI);
        context.fill();
        
        context.restore();
        
        for(var i = 0; i < this.beams.length; ++i)
            this.beams[i].render(context);
    },
    
    place(angle) {
        this.position = new Vector(
            Math.cos(angle) * Planet.prototype.RADIUS,
            Math.sin(angle) * Planet.prototype.RADIUS);
        this.positionNormalized = this.position.normalize();
    },
    
    toggle() {
        if(this.on) {
            this.on = false;
            this.beams[this.beams.length - 1].stop();
        }
        else {
            this.on = true;
            this.beams.push(new Beam(this.angle, "green", this.beamSize));
        }
    }
}