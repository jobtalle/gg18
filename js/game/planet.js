function Planet() {
    this.angle = 0;
    
    this.createScenery();
}

Planet.prototype = {
    COLOR_PLANET: "#c0d0b0",
    COLOR_PLANET_HIGHLIGHT: "#dae4d0",
    COLOR_PLANET_LINES: "#afc0b5",
    RADIUS: 100,
    RADIUS_ORBIT: 150,
    RADIUS_INCOMING: 400,
    ROTATION_SPEED: 0.1,
    SCENERY_AMOUNT: 40,
    ATMOSPHERE_SIZE_MODIFIER: 1.2,
    ATMOSPHERE_COLOR: "rgba(89,133,221,0.66)",
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
        this.renderLines(context);
        
        context.save();
        context.rotate(this.angle);        

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
    },

    renderAtmosphere(context)
    {
        context.save();

        grd=context.createRadialGradient(0,0,this.RADIUS,0,0,130);
        grd.addColorStop(0,"#00000000");
        grd.addColorStop(1, this.ATMOSPHERE_COLOR);

        context.beginPath();
        context.fillStyle = grd;
        context.arc(0,0, this.RADIUS * this.ATMOSPHERE_SIZE_MODIFIER,  this.ATMOSPHERE_START_ANGLE, this.ATMOSPHERE_END_ANGLE);
        context.fill();

        context.restore();
    },

    renderHighlight(context){
        context.save();

        var grd=context.createRadialGradient(-30,-50,100,-30,-50,120);
        grd.addColorStop(0, this.COLOR_PLANET_HIGHLIGHT);
        grd.addColorStop(1,"rgba(0,0,0,0)");

        context.beginPath();
        context.fillStyle ="rgba(0,0,0,0)";
        context.arc(0,0, this.RADIUS,  0, Math.PI * 2);
        context.fill();
        context.clip();

        context.beginPath();
        context.fillStyle = this.COLOR_PLANET_HIGHLIGHT;
        context.arc(-30,-50, this.RADIUS * 1.2,  0, Math.PI * 2);
        context.fill();

        context.restore();
    },

    renderLines(context)
    {
        context.save();

        context.beginPath();
        context.fillStyle ="rgba(0,0,0,0)";
        context.arc(0,0, this.RADIUS,  0, Math.PI * 2);
        context.fill();
        context.clip();

        context.beginPath();
        context.fillStyle = this.COLOR_PLANET_LINES;

        context.rect(20,40,200,2);
        context.rect(40,34,200,2);

        context.rect(80,-20,200,2);
        context.rect(60,-14,30,2);
        
        context.rect(30,-40,200,2);
        context.rect(10,-46,30,2);

        context.rect(-100,46,30,2);

        context.rect(-100,-30,60,2);

        context.fill();

        context.clip();
        context.beginPath();
        context.fillStyle = this.COLOR_PLANET;
        context.arc(-30,-50,this.RADIUS * 1.2, 0, Math.PI * 2);
        context.fill();

        context.restore();
    }
}