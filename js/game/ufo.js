function Ufo(colors, mover) {
    this.colors = colors;
    this.mover = mover;
    this.finished = false;
    this.sprite = resources.ufo_constant_2.instantiate();
    this.engineSprite = resources.ufo_constant_engine.instantiate();
    this.lightSprite1 = resources.ufo_light.instantiate();
    this.lightSprite2 = resources.ufo_light.instantiate();
    this.setUfoLights(colors[0]);
}

Ufo.prototype = {
    update(timeStep) {
        this.mover.update(timeStep);
        this.sprite.update(timeStep);
        this.engineSprite.update(timeStep);
        this.lightSprite1.update(timeStep);
        this.lightSprite2.update(timeStep);
    },
    
    render(context) {
        context.fillStyle = "white";
        
        var colorTexts = "";
        for(var i = 0; i < this.colors.length; ++i)
            colorTexts += this.colors[i] + " ";
        
        context.fillText(colorTexts, this.mover.position.x + 16, this.mover.position.y);
        
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

        this.lightSprite1.draw(
            context,-9,0,0);
        this.lightSprite2.draw(
            context,7,0,0);

        context.restore();
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
        
        var matches = new Array(this.colors.length);
        
        for(var i = 0; i < this.colors.length; ++i)
            matches[i] = false;
        
        for(var i = 0; i < beams.length; ++i) {
            const index = this.colors.indexOf(beams[i].crystal.essence.getColorName(getDay(beams[i].position)));
            
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
        var self = this;
        
        this.mover.onLeave = function() {
            onLeave(self);
        };
    },

    setUfoLights(color)
    {
        switch(color)
        {
            case "red":
            this.lightSprite1 = resources.ufo_light_red.instantiate();
            this.lightSprite2 = resources.ufo_light_red.instantiate();
            break;
            
            case "yellow":
            this.lightSprite1 = resources.ufo_light_yellow.instantiate();
            this.lightSprite2 = resources.ufo_light_yellow.instantiate();
            break;

            case "blue":
            this.lightSprite1 = resources.ufo_light_blue.instantiate();
            this.lightSprite2 = resources.ufo_light_blue.instantiate();
            break;
            
            case "purple":
            this.lightSprite1 = resources.ufo_light_purple.instantiate();
            this.lightSprite2 = resources.ufo_light_purple.instantiate();
            break;
            
            case "orange":
            this.lightSprite1 = resources.ufo_light_orange.instantiate();
            this.lightSprite2 = resources.ufo_light_orange.instantiate();
            break;

            case "green":
            this.lightSprite1 = resources.ufo_light_green.instantiate();
            this.lightSprite2 = resources.ufo_light_green.instantiate();
            break;
        }
    }
}
