function Ufo(type, colors, mover) {
    this.colors = colors;
    this.mover = mover;
    this.finished = false;
    this.success = false;
    this.sprite = resources.ufo_constant_2.instantiate();
    this.engineSprite = resources.ufo_constant_engine.instantiate();

    this.lights = [resources.ufo_light.instantiate(),resources.ufo_light.instantiate(),resources.ufo_light.instantiate()];

    this.setUfoLights(colors);
    this.setUfo(type, colors);
}

Ufo.prototype = {
    update(timeStep, planet) {
        this.mover.update(timeStep, planet);
        this.engineSprite.update(timeStep);
        this.sprite.update(timeStep);
        
        for (let i = 0; i < this.lights.length; i++) {
            const light =this.lights[i];
            light.update(timeStep);
        }
    },
    
    render(context) {
        context.save();

        context.translate(
            this.mover.position.x,
            this.mover.position.y);
        context.rotate(this.mover.getAngle() + Math.PI * 0.5);

        this.sprite.draw(
            context,0,0,
            0);

        this.engineSprite.draw(
            context, 0,0,0);

            if(this.colors.length == 1)
            {

            }
            else if(this.colors.length == 2)
            {
                this.lights[0].draw(
                    context,-9,-4,0);

                this.lights[1].draw(
                    context,7,-4,0);
            }
            else
            {
                this.lights[0].draw(
                    context,-9,-4,0);

                this.lights[1].draw(
                    context,-1,-4,0);
                this.lights[2].draw(
                    context,7,-4,0);
            }

        context.restore();
    },
    
    getPosition() {
        return this.mover.position;
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
    
    match(beams, getDay) {
        if(beams.length == 0)
            return false;
        
        var hitColors = [];
        
        for(var i = 0; i < beams.length; ++i)
            hitColors.push(beams[i].crystal.essence.getColorName(getDay(beams[i].position)));
        
        for(var i = 0; i < this.colors.length; ++i)
            if(this.colors[i].indexOf(hitColors) == -1)
                return false;
        
        return true;
    },
    
    getScore() {
        return 1000;
    },
    
    leave(planet) {
        this.finished = true;
        this.mover.leave();
        
        if (this.success){
            const scale = Game.prototype.SCALE;
            const position = new Vector(
                Math.cos(planet.angle) * this.mover.position.x - Math.sin(planet.angle) * this.mover.position.x,
                Math.sin(planet.angle) * this.mover.position.y + Math.cos(planet.angle) * this.mover.position.y,
            );
            console.log(position);
            new Popup(position.x * scale, position.y * scale, this.getScore());
        }
    },
    
    addLeaveListener(onLeave) {
        var self = this;
        
        this.mover.onLeave = function() {
            onLeave(self);
        };
    },

    setUfoLights(colors)
    {
        for (let i = 0; i < colors.length; i++) {
            const color = colors[i];
            switch(color.trim())
            {
                case "red":
                this.lights[i] = resources.ufo_light_red.instantiate();
                break;
                
                case "yellow":
                this.lights[i] = resources.ufo_light_yellow.instantiate();
                break;
    
                case "blue":
                this.lights[i] = resources.ufo_light_blue.instantiate();
                break;
                
                case "purple":
                this.lights[i] = resources.ufo_light_purple.instantiate();
                break;
                
                case "orange":
                this.lights[i] = resources.ufo_light_orange.instantiate();
                break;
    
                case "green":
                this.lights[i] = resources.ufo_light_green.instantiate();
                break;
            }
        }
    },

    setUfo(type, colors)
    {
        switch(type)
        {
            case "booster":
                if(colors.length >2)
                    this.sprite = resources.ufo_booster_3.instantiate();
                else
                    this.sprite = resources.ufo_booster_2.instantiate();
                    this.engineSprite = resources.ufo_booster_engine.instantiate();
                break;
            case "constant":
                if(colors.length >2)
                    this.sprite = resources.ufo_constant_3.instantiate();
                else
                    this.sprite = resources.ufo_constant_2.instantiate();
                    this.engineSprite = resources.ufo_constant_engine.instantiate();
                break;
            case "half":
                if(colors.length >2)
                    this.sprite = resources.ufo_half_3.instantiate();
                else
                    this.sprite = resources.ufo_half_2.instantiate();
                    this.engineSprite = resources.ufo_half_engine.instantiate();
                break;
            case "gem":
                if(colors.length >2)
                    this.sprite = resources.ufo_lander_3.instantiate();
                else
                    this.sprite = resources.ufo_lander_2.instantiate();
                    this.engineSprite = resources.ufo_lander_engine.instantiate();
                break;
            case "stealer":
                if(colors.length >2)
                    this.sprite = resources.ufo_stealer_3.instantiate();
                else
                    this.sprite = resources.ufo_stealer_2.instantiate();
                    this.engineSprite = resources.ufo_lander_engine.instantiate();
                break;
            case "mother":
                this.sprite = resources.ufo_mother.instantiate();
                this.engineSprite = resources.ufo_mother_engine.instantiate();
                break;
        }
    }
}
