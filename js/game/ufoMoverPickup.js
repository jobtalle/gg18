function UfoMoverPickup(angle, speed) {
    this.position = new Vector();
    this.angle = angle;
    this.radius = Planet.prototype.RADIUS_INCOMING;
    this.state = "landing";
    this.speed = speed;
    this.wait = 0;
}

UfoMoverPickup.prototype = {
    WAIT_TIME: 1,
    
    update(timeStep) {
        switch(this.state) {
            case "landing":
                this.radius -= timeStep * this.speed;
                
                if(this.radius < Planet.prototype.RADIUS) {
                    this.radius = Planet.prototype.RADIUS;
                    this.state = "waiting";
                }
                break;
            case "waiting":
                this.wait += timeStep;
                
                if(this.wait > this.WAIT_TIME)
                    this.state = "leaving";
                break;
            case "leaving":
                this.radius += timeStep * this.speed;
                break;
        }
        
        this.position.x = Math.cos(this.angle) * this.radius;
        this.position.y = Math.sin(this.angle) * this.radius;
    },
    
    leave() {
        this.state = "leaving";
    },
    
    getAngle() {
        return this.angle;
    }
}