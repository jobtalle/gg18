function Planet(players) {
    this.players = players;
    this.angle = 0;
    
    this.createScenery();
    this.createBeamers();
}

Planet.prototype = {
    COLOR_PLANET: "#55FF11",
    RADIUS: 100,
    RADIUS_ORBIT: 150,
    RADIUS_INCOMING: 400,
    ROTATION_SPEED: 0.1,
    SCENERY_AMOUNT: 40,
    BEAMER_COUNT: 6,
    
    render(context) {
        context.save();
        context.rotate(this.angle);
        
        context.fillStyle = this.COLOR_PLANET;
        
        context.beginPath();
        context.arc(0, 0, this.RADIUS, 0, Math.PI * 2);
        context.fill();
        
        for(var i = 0; i < this.scenery.length; ++i)
            this.scenery[i].render(context);
        
        for(var i = 0; i < this.beamers.length; ++i)
            this.beamers[i].render(context);
        
        for(var i = 0; i < this.players.length; ++i)
            this.players[i].render(context);
        
        context.restore();
    },
    
    update(timeStep) {
        this.angle += this.ROTATION_SPEED * timeStep;
        
        if(this.angle > Math.PI * 2)
            this.angle -= Math.PI * 2;
        
        for(var i = 0; i < this.players.length; ++i)
            this.players[i].update(timeStep);
        
        for(var i = 0; i < this.beamers.length; ++i)
            this.beamers[i].update(timeStep);
    },
        
    createScenery() {
        this.scenery = [];
        
        for(var i = 0; i < this.SCENERY_AMOUNT; ++i)
            this.scenery.push(new Scenery(Math.random() * Math.PI * 2));
    },
    
    createBeamers() {
        this.beamers = [];
        
        for(var i = 0; i < this.BEAMER_COUNT; ++i)
            this.beamers.push(new Beamer((Math.PI / 3) * i));
    },
}