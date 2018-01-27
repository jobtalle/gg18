function Player(controller, angle) {
    if(angle == undefined)
        angle = 0;
    
    this.angle = angle;
    this.speed = 0;
    this.speedChange = 0;
    this.state = "walking";
    this.position = new Vector();
    this.controller = controller;
    this.crystal = null;
    
    this.listen(controller);

    this.idleSprite = resources.base_1_idle.instantiate();
    this.walkingSprite = resources.base_1_running.instantiate();
    this.beamingSprite = resources.base_1_shooting.instantiate();
    this.idleArmsSprite = resources.base_1_idle_arms.instantiate();
    this.walkingArmsSprite = resources.base_1_running_arms.instantiate();
    this.xScale = -1;

}

Player.prototype = {
    INDEX: -1,
    COLOR: "#3366ff",
    SPEED: 100,
    ACCELERATION: 900,
    FRICTION: 1000,
    controller: null,
    CARRY_HEIGHT: 12,
    
    rotate(angle) {
        this.angle += angle;
    },
    
    update(timeStep) {
        this.controller.update();
        this.idleSprite.update(timeStep);
        this.walkingSprite.update(timeStep);
        this.idleArmsSprite.update(timeStep);
        this.walkingArmsSprite.update(timeStep);
        this.beamingSprite.update(timeStep);
        
        if(this.state !="beaming")
        {
            if(this.speed != 0)
                this.state = "walking";
            else
                this.state = "standing";
        }

        switch(this.state) {
            case "walking":
            case "standing":
                if(this.speedChange != 0) {
                    const maxFactor = Math.sign(this.speedChange) * this.speedChange;
                    
                    this.speed += Math.sign(this.speedChange) * this.ACCELERATION * timeStep;

                    if(this.speed < -this.SPEED * maxFactor)
                    {
                        this.xScale = -1;
                        this.speed = -this.SPEED * maxFactor;
                    }
                    else if(this.speed > this.SPEED * maxFactor)
                    {
                        this.xScale = 1;
                        this.speed = this.SPEED * maxFactor;
                    }
                }
                else {
                    if(this.speed < 0) {
                        this.speed += this.FRICTION * timeStep;

                        if(this.speed > 0)
                            this.speed = 0;
                    }
                    else if(this.speed > 0) {
                        this.speed -= this.FRICTION * timeStep;

                        if(this.speed < 0)
                            this.speed = 0;
                    }
                }

                if(this.speed != 0)
                    this.angle += this.getRadialSpeed(this.speed) * timeStep;
                
                if(this.crystal != null)
                    this.crystal.carry(this.angle, this.CARRY_HEIGHT);

                break;
        }
        
        this.position.x = Math.cos(this.angle) * Planet.prototype.RADIUS;
        this.position.y = Math.sin(this.angle) * Planet.prototype.RADIUS;
        
        if(this.crystal != null)
            this.crystal.update(timeStep);
    },
    
    render(context) {
        context.save();
        if(this.state == "walking")
        {
            if(this.crystal != null)
            {
                this.walkingArmsSprite.draw(context, this.position.x, this.position.y,this.angle + Math.PI * 0.5, this.xScale);
            }
            else
                this.walkingSprite.draw(context, this.position.x, this.position.y,this.angle + Math.PI * 0.5, this.xScale);
        }
        else if(this.state == "beaming")
        {
            this.beamingSprite.draw(context, this.position.x, this.position.y,this.angle + Math.PI * 0.5, this.xScale);
        }
        else
        {
            if(this.crystal != null)
                this.idleArmsSprite.draw(context, this.position.x, this.position.y,this.angle + Math.PI * 0.5, this.xScale);
            else
                this.idleSprite.draw(context, this.position.x, this.position.y,this.angle + Math.PI * 0.5, this.xScale);
        }
        
        context.restore();
        
        if(this.crystal != null)
            this.crystal.render(context);
    },
    
    pickup(crystal) {
        this.crystal = crystal;
    },
    
    drop() {
        this.crystal.drop(this.angle);
        this.crystal = null;
    },
    
    enterBeamer(beamer, planet) {
        this.beamer = beamer;
        this.state = "beaming";
        this.speed = 0;
        this.angle = beamer.angle;
        
        if(this.crystal != null) {
            this.beamer.putCrystal(this.crystal, planet);
            this.crystal = null;
        }
    },
    
    exitBeamer() {
        this.state = "standing";
    },
    
    listen(controller) {
        controller.onEnterPressed = this.onEnterPressed.bind(this);
        controller.onActivatePressed = this.onActivatePressed.bind(this);
        controller.onActivateReleased = this.onActivateReleased.bind(this);
        controller.onMove = this.onMove.bind(this);
    },
    
    setDay(day) {
        if(this.crystal != null)
            this.crystal.setDay(day);
    },
    
    getRadialSpeed(speed) {
        return speed / Planet.prototype.RADIUS;
    },
    
    onMove(vector) {
        var delta;
        
        if(vector.x == 0 && vector.y == 0)
            delta = 0;
        else
            delta = vector.dot(Vector.prototype.fromAngle(this.angle + this.planet.angle).orthogonal());
        
        this.speedChange = -delta;
        
        switch(this.state) {
            case "beaming":
                if(delta == 0)
                    break;
                
                var aimDir = vector.angle() - this.planet.angle - this.beamer.angle;
                
                while(aimDir > Math.PI)
                    aimDir -= Math.PI * 2;
                while(aimDir < -Math.PI)
                    aimDir += Math.PI * 2;
                
                this.beamer.setAim(aimDir);
                break;
        }
    },
    
    onEnterPressed() {
        switch(this.state) {
            case "walking":
            case "standing":
                if(this.onTryEnter != undefined)
                    this.onTryEnter(this);
                break;
            case "beaming":
                this.exitBeamer();
                break;
        }
    },
    
    onActivatePressed() {
        switch(this.state) {
            case "walking":
            case "standing":
                if(this.onTryPickup != undefined && this.crystal == null)
                    this.onTryPickup(this);
                else if(this.onTryDrop != undefined)
                    this.onTryDrop(this);
                break;
            case "beaming":
                this.beamer.toggle();
                break;
        }
    },
    
    onActivateReleased() {
        
    }
}