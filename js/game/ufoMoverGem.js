function UfoMoverGem(angle, speed) {
    this.position = new Vector();
    this.angle = angle;
    this.radius = Planet.prototype.RADIUS_INCOMING;
    this.state = "landing";
    this.speed = speed;
    this.wait = 0;
    this.angleSign = Math.random() > 0.5?1:-1;
    this.blessingAudio = resources.blessing.instantiate();
}

UfoMoverGem.prototype = {
    WAIT_TIME: 1,
    LEAVE_SPEED_FACTOR: 2,
    
    update(timeStep, planet) {
        switch(this.state) {
            case "landing":
                this.radius -= timeStep * this.speed;
                this.angle += timeStep * this.getRadialSpeed(this.speed) * this.angleSign;
                
                if(this.radius < Planet.prototype.RADIUS) {
                    this.radius = Planet.prototype.RADIUS;
                    this.state = "waiting";
                    
                    this.blessingAudio.play();
                    this.addGem(planet);
                }
                break;
            case "waiting":
                this.wait += timeStep;
                
                if(this.wait > this.WAIT_TIME)
                    this.state = "leaving";
                break;
            case "leaving":
                this.radius += timeStep * this.speed * this.LEAVE_SPEED_FACTOR;
                break;
        }
        
        this.position.x = Math.cos(this.angle) * this.radius;
        this.position.y = Math.sin(this.angle) * this.radius;
    },
    
    addGem(planet) {
        planet.addGem(this.angle);
    },
    
    leave() {
        this.state = "leaving";
    },
    
    getAngle() {
        return this.angle;
    },
    
    getRadialSpeed(speed) {
        return speed / this.radius;
    }
}