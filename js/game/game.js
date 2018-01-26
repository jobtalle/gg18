function Game(renderer) {
    this.renderer = renderer;
    this.space = new Space();
    this.planet = new Planet();
}

Game.prototype = {
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
    },
    
    render(context) {
        this.space.render(context);
        this.planet.render(context);
    }
}