function Planet(players) {
    this.players = players;
    this.angle = 0;
    
    this.createScenery();
    this.createBeamers();
}

Planet.prototype = {
    COLOR_PLANET: "#399e11",
    COLOR_PLANET_HIGHLIGHT: "#55FF11",
    RADIUS: 100,
    RADIUS_ORBIT: 150,
    RADIUS_INCOMING: 400,
    ROTATION_SPEED: 0.1,
    SCENERY_AMOUNT: 40,
    BEAMER_COUNT: 6,
    ATMOSPHERE_SIZE_MODIFIER: 1.2,
    ATMOSPHERE_COLOR: "#16d6e0",
    ATMOSPHERE_START_ANGLE: 2.35619449019,
    ATMOSPHERE_END_ANGLE: -0.78539816339,
    
    render(context) {
        this.renderAtmosphere(context);

        context.save();
        context.rotate(this.angle);
        
        context.fillStyle = this.COLOR_PLANET;
        
        context.beginPath();
        context.arc(0, 0, this.RADIUS, 0, Math.PI * 2);
        context.fill();
        
        context.restore();

        this.renderHighlight(context);
        
        context.save();
        context.rotate(this.angle);        

        for(var i = 0; i < this.scenery.length; ++i)
            this.scenery[i].render(context);
        
        for(var i = 0; i < this.beamers.length; ++i)
            this.beamers[i].render(context);
        
        for(var i = 0; i < this.players.length; ++i)
            this.players[i].render(context);
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

    renderAtmosphere(context)
    {
        grd = context.createRadialGradient(0, 0, this.RADIUS - 10, 0, 0, 130);
        grd.addColorStop(0, this.ATMOSPHERE_COLOR);
        grd.addColorStop(1, "#00000000");

        context.beginPath();
        context.fillStyle = grd;
        context.arc(0,0, this.RADIUS * this.ATMOSPHERE_SIZE_MODIFIER,  this.ATMOSPHERE_START_ANGLE, this.ATMOSPHERE_END_ANGLE);
        context.fill();
    },

    renderHighlight(context){
        context.save();

        var grd = context.createRadialGradient(-30, -50, 100, -30, -50, 300);
        grd.addColorStop(0, this.COLOR_PLANET_HIGHLIGHT);
        grd.addColorStop(1, "#00000000");

        context.beginPath();
        context.fillStyle = "#00000000";
        context.arc(0, 0, this.RADIUS, 0, Math.PI * 2);
        context.fill();
        context.clip();

        context.beginPath();
        context.fillStyle = grd;
        context.arc(0, 0, this.RADIUS, 0, Math.PI * 2);
        context.fill();

        context.restore();
    }
}