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
    COLOR_DISH: "white",
    DISH_HEIGHT: 12,
    AIM_RANGE: 3,
    AIM_SPEED: 10,
    
    update(timeStep) {
        for(var i = this.beams.length; i-- > 0;) {
            const beam = this.beams[i];
            
            beam.update(timeStep);
            
            if(beam.isInvisible())
                this.beams.splice(this.beams.indexOf(beam), 1);
        }
    },
    
    render(context) {
        context.save();
        context.translate(this.position.x, this.position.y);
        context.rotate(this.angle + Math.PI * 0.5);
        
        context.strokeStyle = this.COLOR;
        context.beginPath();
        context.moveTo(0, 0);
        context.lineTo(0, -this.DISH_HEIGHT);
        context.stroke();
        
        context.restore();
        context.save();
        
        context.translate(this.position.x, this.position.y);
        context.rotate(this.angle + Math.PI * 0.5);
        context.translate(0, -this.DISH_HEIGHT);
        context.rotate(this.aim);
        
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
            this.beams.push(new Beam(
                this.angle,
                this.aim,
                "rgba(100, 255, 0, 0.2)",
                Planet.prototype.RADIUS + this.DISH_HEIGHT,
                this.beamSize));
        }
    },
    
    turn(direction, timeStep) {
        const aimPrevious = this.aim;
        
        this.aim += direction * timeStep;
        
        if(this.aim > this.AIM_RANGE * 0.5)
            this.aim = this.AIM_RANGE * 0.5;
        else if(this.aim < -this.AIM_RANGE * 0.5)
            this.aim = -this.AIM_RANGE * 0.5;
        
        if(aimPrevious != this.aim) {
            const delta = this.aim - aimPrevious;
            
            if(this.beams.length > 0)
                this.beams[this.beams.length - 1].rotate(delta);
        }
    }
}