function Player(controller, angle) {
    if(angle == undefined)
        angle = 0;
    
    this.angle = angle;
    this.speed = 0;
    this.speedChange = 0;
    this.state = "walking";
    this.position = new Vector();
    
    this.listen(controller);
}

Player.prototype = {
    COLOR: "#3366ff",
    SPEED: 140,
    ACCELERATION: 900,
    FRICTION: 1000,
    
    rotate(angle) {
        this.angle += angle;
    },
    
    update(timeStep) {
        switch(this.state) {
            case "walking":
            if(this.speedChange != 0) {
                this.speed += this.speedChange * this.ACCELERATION * timeStep;

                if(this.speed < -this.SPEED)
                    this.speed = -this.SPEED;
                else if(this.speed > this.SPEED)
                    this.speed = this.SPEED;
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
                break;
            case "beaming":
                if(this.speedChange != 0)
                    this.beamer.turn(this.speedChange, timeStep);
                break;
        }
        
        this.position.x = Math.cos(this.angle) * Planet.prototype.RADIUS;
        this.position.y = Math.sin(this.angle) * Planet.prototype.RADIUS;
    },
    
    render(context) {
        context.save();
        context.translate(this.position.x, this.position.y);
        context.rotate(this.angle + Math.PI * 0.5);
        
        if(this.state == "beaming")
            context.rotate(Math.PI);
        
        context.fillStyle = this.COLOR;
        context.beginPath();
        context.moveTo(0, 0);
        context.lineTo(-3, -10);
        context.lineTo(3, -10);
        context.fill();
        
        context.restore();
    },
    
    enterBeamer(beamer) {
        this.beamer = beamer;
        this.state = "beaming";
        this.speed = 0;
        this.angle = beamer.angle;
    },
    
    exitBeamer() {
        this.state = "walking";
    },
    
    listen(controller) {
        controller.onLeftPressed = this.onLeftPressed.bind(this);
        controller.onLeftReleased = this.onLeftReleased.bind(this);
        controller.onRightPressed = this.onRightPressed.bind(this);
        controller.onRightReleased = this.onRightReleased.bind(this);
        controller.onEnterPressed = this.onEnterPressed.bind(this);
        controller.onActivatePressed = this.onActivatePressed.bind(this);
        controller.onActivateReleased = this.onActivateReleased.bind(this);
    },
    
    getRadialSpeed(speed) {
        return speed / Planet.prototype.RADIUS;
    },
    
    onLeftPressed() {
        this.speedChange = -1;
    },
    
    onLeftReleased() {
        this.speedChange = 0;
    },
    
    onRightPressed() {
        this.speedChange = 1;
    },
    
    onRightReleased() {
        this.speedChange = 0;
    },
    
    onEnterPressed() {
        switch(this.state) {
            case "walking":
                this.onTryEnter(this);
                break;
            case "beaming":
                this.exitBeamer();
                break;
        }
    },
    
    onActivatePressed() {
        switch(this.state) {
            case "beaming":
                this.beamer.toggle();
                break;
        }
    },
    
    onActivateReleased() {
        switch(this.state) {
            case "beaming":
                
                break;
        }
    }
}