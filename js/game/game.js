function Game(renderer) {
    this.renderer = renderer;
    this.space = new Space();
    this.planet = new Planet();
    
    this.ufos = [];
    this.ufos.push(new Ufo());
}

Game.prototype = {
    SCALE: 2, 
    
    start() {
        this.lastDate = new Date();
        this.animate();
    },
    
    animate() {
        requestAnimationFrame(this.animate.bind(this));
        
        this.update(this.getTimeStep());
        this.render(this.renderer.getContext());
    },
    
    getTimeStep() {
        var date = new Date();
        var timeStep = (date - this.lastDate) / 1000;
        
        if(timeStep < 0)
            timeStep += 1.0;
        
        this.lastDate = date;
        
        return timeStep;
    },
    
    update(timeStep) {
        this.space.update(timeStep);
        this.planet.update(timeStep);
        
        for(var i = 0; i < this.ufos.length; ++i)
            this.ufos[i].update(timeStep);
    },
    
    renderBackground(context) {
        context.restore();
        
        this.space.render(context);
        
        context.save();
        context.translate(
            -context.canvas.width / 2,
            -context.canvas.height / 2);
        context.scale(this.SCALE, this.SCALE);
        context.translate(
            context.canvas.width / 2,
            context.canvas.height / 2);
    },
    
    renderGame(context) {
        this.planet.render(context);
        
        for(var i = 0; i < this.ufos.length; ++i)
            this.ufos[i].render(context);
    },
    
    render(context) {
        this.renderBackground(context);
        this.renderGame(context);
    }
}