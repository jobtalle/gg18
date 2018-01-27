function Beamer(angle) {
    this.angle = angle;
    this.aim = 0;
    this.aimDir = 0;
    this.beams = [];
    this.crystal = null;
    
    this.place(angle);
    this.beamerBase = resources.biemer_base.instantiate();
    this.beamerDish = resources.biemer_empty.instantiate();
    this.beamerSparks = null;
}

Beamer.prototype = {
    COLOR: "#0056bb",
    COLOR_DISH: "white",
    DISH_HEIGHT: 7,
    AIM_RANGE: 3,
    AIM_SPEED: 5,
    CRYSTAL_SCATTER_RANGE: 16,
    
    update(timeStep) {
        this.turn(timeStep);
        this.beamerBase.update(timeStep);
        this.beamerDish.update(timeStep);
        
        if(this.sparks != undefined)
            this.sparks.update(timeStep);
        
        for(var i = this.beams.length; i-- > 0;) {
            const beam = this.beams[i];
            
            beam.update(timeStep);
            
            if(beam.isInvisible())
                this.beams.splice(this.beams.indexOf(beam), 1);
        }
        
        if(this.crystal != null) {
            this.crystal.update(timeStep);
            
            if(this.beams.length > 0 && !this.beams[this.beams.length - 1].cut) {
                this.crystal.drain(timeStep);
                               
                if(this.crystal.life == 0) {
                    this.beamerDish = resources.biemer_empty.instantiate();
                    this.crystal = null;
                    
                    if(this.beams.length > 0 && !this.beams[this.beams.length - 1].cut) {
                        this.spark();
                        this.beams[this.beams.length - 1].stop();
                    }
                }
            }
        }
    },
    
    render(context) {
        for(var i = 0; i < this.beams.length; ++i)
            this.beams[i].render(context);
        
        context.save();
        
        context.translate(this.position.x, this.position.y);
        context.rotate(this.angle + Math.PI * 0.5);
        this.beamerBase.draw(context,0,0,0);

        context.translate(0, -this.DISH_HEIGHT);
        context.rotate(this.aim);
        
        if(this.crystal == null)
            context.fillStyle = this.COLOR_DISH;
        else
            context.fillStyle = this.crystal.getColor();
        
        this.beamerDish.draw(context,0,0,0);
        if(this.sparks != undefined)
            this.sparks.draw(context, 0, 0, 0);

        context.restore();
    },
    
    setDay(day) {
        if(this.crystal != null)
        {
            this.crystal.setDay(day);
            this.setBiemerColor();
        }
    },

    setBiemerColor()
    {
        if(this.crystal.day)
        {
            switch( this.crystal.essence.color)
            {
                case "red":
                this.beamerDish = resources.biemer_red.instantiate();
                break;
                
                case "yellow":
                this.beamerDish = resources.biemer_yellow.instantiate();
                break;

                case "blue":
                this.beamerDish = resources.biemer_blue.instantiate();
                break;
            }
        }
        else
        {
            switch( this.crystal.essence.color)
            {
                case "red":
                this.beamerDish = resources.biemer_green.instantiate();
                break;
                
                case "yellow":
                this.beamerDish = resources.biemer_purple.instantiate();
                break;

                case "blue":
                this.beamerDish = resources.biemer_orange.instantiate();
                break;
            }
        }
    },
    
    place(angle) {
        this.position = new Vector(
            Math.cos(angle) * Planet.prototype.RADIUS,
            Math.sin(angle) * Planet.prototype.RADIUS);
        this.positionNormalized = this.position.normalize();
    },
    
    spark() {
        if(this.sparks == undefined) {
            this.sparks = resources.biemer_spark.instantiate();
            this.sparks.onEnd = this.stopSpark.bind(this);
        }
    },
    
    stopSpark() {
        this.sparks = undefined;
    },
    
    toggle() {
        if(this.crystal == null)
            return;
        
        if(this.beams.length > 0 && !this.beams[this.beams.length - 1].cut) {
            this.spark();
            this.beams[this.beams.length - 1].stop();
        } else {
            this.beams.push(new Beam(
                this.angle,
                this.aim,
                this.crystal,
                Planet.prototype.RADIUS + this.DISH_HEIGHT));
        }
    },
    
    setAim(aimDir) {
        this.aimDir = aimDir;
    },
    
    turn(timeStep) {
        const aimPrevious = this.aim;
        var delta = this.aimDir - this.aim;
        
        if(Math.abs(delta) > this.AIM_SPEED * timeStep)
            delta = Math.sign(delta) * this.AIM_SPEED * timeStep;
        
        this.aim += delta;
        
        if(this.aim > this.AIM_RANGE * 0.5)
            this.aim = this.AIM_RANGE * 0.5;
        else if(this.aim < -this.AIM_RANGE * 0.5)
            this.aim = -this.AIM_RANGE * 0.5;
        
        if(aimPrevious != this.aim) {
            const delta = this.aim - aimPrevious;
            
            if(this.beams.length > 0 && !this.beams[this.beams.length - 1].cut)
                this.beams[this.beams.length - 1].rotate(delta);
        }
    },
    
    putCrystal(crystal, planet) {
        if(this.crystal != null) {
            const scatterRadians = this.CRYSTAL_SCATTER_RANGE / Planet.prototype.RADIUS;
            
            planet.crystals.push(this.crystal);
            this.crystal.drop(
                this.angle - scatterRadians * 0.5 +
                scatterRadians * Math.random());
        }
        
        this.crystal = crystal;
        this.setBiemerColor();
        
        if(this.beams.length > 0 && !this.beams[this.beams.length - 1].cut)
            this.beams[this.beams.length - 1].setCrystal(this.crystal);
    },
    
    dropCrystal() {
        if(this.beams.length > 0 && !this.beams[this.beams.length - 1].cut)
            this.beams[this.beams.length - 1].stop();
        
        this.beamerDish = resources.biemer_empty.instantiate();
        this.crystal = null;
    }
}