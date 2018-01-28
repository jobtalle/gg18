function Ufo(type, colors, mover) {
    this.colors = colors;
    this.mover = mover;
    this.finished = false;
    this.success = false;
    this.sprite = resources.ufo_constant_2.instantiate();
    this.engineSprite = resources.ufo_constant_engine.instantiate();
    this.type = type;
    
    this.lights = [resources.ufo_light.instantiate(),resources.ufo_light.instantiate(),resources.ufo_light.instantiate()];

    this.setUfoLights(colors);
    this.setUfo(type, colors);

    this.lightPos = [];
    this.setLightPos(type);

    this.leaveAudio = resources.curse3.instantiate();
    this.correctMatch = resources.zap.instantiate();
    this.wrongMatch = resources.zap6a.instantiate();
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
                    context,this.lightPos[0].x,this.lightPos[0].y,0);

                this.lights[1].draw(
                    context,this.lightPos[2].x,this.lightPos[2].y,0);
            }
            else
            {
                this.lights[0].draw(
                    context,this.lightPos[0].x,this.lightPos[0].y,0);

                this.lights[1].draw(
                    context,this.lightPos[1].x,this.lightPos[1].y,0);
                this.lights[2].draw(
                    context,this.lightPos[2].x,this.lightPos[2].y,0);
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
        {
            this.wrongMatch.play();
            return false;
        }
        
        var hitColors = [];
        
        for(var i = 0; i < beams.length; ++i)
            hitColors.push(beams[i].crystal.essence.getColorName(getDay(beams[i].position)));
        
        var matchCount = 0;
        for(var i = 0; i < this.colors.length; ++i)
            if(hitColors.indexOf(this.colors[i]) != -1)
                ++matchCount;
        
        if(matchCount == this.colors.length) {
            this.correctMatch.play();
            
            return true;
        }
        else {
            this.wrongMatch.play();
            
            return false;
        }
    },
    
    getColorCount() {
        var unique = [];
        
        for(var i = 0; i < this.colors.length; ++i)
            if(unique.indexOf(this.colors[i]) == -1)
                unique.push(this.colors[i]);
        
        return unique.length;
    },
    
    getScore() {
        var base;
        
        switch(this.type) {
            case "booster":
                base = 125;
                break;
            case "constant":
                base = 100;
                break;
            case "stealer":
                base = 500;
                break;
            case "gem":
                base = 5;
                break;
        }
        
        return base * this.getColorCount();
    },
    
    leave(planet) {
        this.finished = true;
        this.mover.leave();
        
        this.leaveAudio.play();
        
        const scale = Game.prototype.SCALE;
            const angle = planet.angle;
            const position = new Vector(
                Math.cos(angle) * this.mover.position.x - Math.sin(angle) * this.mover.position.y,
                Math.sin(angle) * this.mover.position.x + Math.cos(angle) * this.mover.position.y,
            );
        
        if (this.success){
            globalScore.addScore(this.getScore());
            new Popup(position.x * scale, position.y * scale, this.getScore());
            
            for (var i = 0; i < 10; i++){
                new Particle(position.x * scale + this.getRandomInt(-50,50), position.y * scale + this.getRandomInt(-50,50), 0);
            }
        }
        else{
            console.log("unsuccesfull leave");
            for (var i = 0; i < 10; i++){
                new Particle(position.x * scale + this.getRandomInt(-50,50), position.y * scale + this.getRandomInt(-50,50), 1);
            }
        }
    },
    
    addLeaveListener(onLeave) {
        var self = this;
        
        this.mover.onLeave = function() {
            onLeave(self);
        };
    },
    
    getRandomInt(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min)) + min;
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
    },
    setLightPos(type)
    {
        switch(type){
        case "booster":
            this.lightPos.push(new Vector(9, -3));
            this.lightPos.push(new Vector(2, -2));
            this.lightPos.push(new Vector(-5, -3));
            break;
        case "constant":
            this.lightPos.push(new Vector(-9, -3));
            this.lightPos.push(new Vector(-1, -3));
            this.lightPos.push(new Vector(7, -3));
            break;
        case "half":
            this.lightPos.push(new Vector(-9, -4));
            this.lightPos.push(new Vector(-1, -4));
            this.lightPos.push(new Vector(7, -4));
            break;
        case "gem":
            this.lightPos.push(new Vector(-9, -4));
            this.lightPos.push(new Vector(-1, -4));
            this.lightPos.push(new Vector(7, -4));
            break;
        case "stealer":
            this.lightPos.push(new Vector(-9, -4));
            this.lightPos.push(new Vector(-1, -4));
            this.lightPos.push(new Vector(7, -4));
            break;
        case "mother":
        this.lightPos.push(new Vector(-9, -4));
        this.lightPos.push(new Vector(-1, -4));
        this.lightPos.push(new Vector(7, -4));
        break;
        }
    }
}
