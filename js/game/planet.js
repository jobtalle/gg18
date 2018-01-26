function Planet() {
    this.angle = 0;
    
    this.createScenery();
}

Planet.prototype = {
    COLOR_PLANET: "#55FF11",
    RADIUS: 100,
    RADIUS_ORBIT: 150,
    RADIUS_INCOMING: 400,
    ROTATION_SPEED: 0.1,
    SCENERY_AMOUNT: 40,
    
    render(context) {
        context.save();
        context.rotate(this.angle);
        
        context.fillStyle = this.COLOR_PLANET;
        
        context.beginPath();
        context.arc(0, 0, this.RADIUS, 0, Math.PI * 2);
        context.fill();
        
        for(var i = 0; i < this.scenery.length; ++i)
            this.scenery[i].render(context);
        
        context.restore();
    },
    
    getRotationSpeed() {
        return this.ROTATION_SPEED;
    },
    
    update(timeStep) {
        this.angle += this.ROTATION_SPEED * timeStep;
        
        if(this.angle > Math.PI * 2)
            this.angle -= Math.PI * 2;
    },
        
    createScenery() {
        this.scenery = [];
        
        for(var i = 0; i < this.SCENERY_AMOUNT; ++i)
            this.scenery.push(new Scenery(Math.random() * Math.PI * 2));
    }
}