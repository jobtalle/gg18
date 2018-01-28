function Game(renderer, players) {
    this.renderer = renderer;
    this.space = new Space();
    this.planet = new Planet(players);
    this.dispatcher = new UfoDispatcher(this.planet.dispatch.bind(this.planet));
    this.dispatcher.start();

    shake = this.shakeFunc.bind(this);
    
    this.shake = 0;
}

Game.prototype = {
    SCALE: 4,
    SHAKE_INCREASE: 1,
    SHAKE_DECREASE: 3,
    SHAKE_ZOOM: 0.05,
    SHAKE_SHIFT: 5,

    start() {
        this.lastDate = new Date();
        this.animate();
        resources.interlude.play();
    },

    restart() {
        document.location.reload();
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

    shakeFunc() {
        this.shake += this.SHAKE_INCREASE;
    },

    update(timeStep) {
        if(getRandomInt(0, 20) == 1)
        {
            new Star(-1,-1,-1);
        }
        this.space.update(timeStep);
        this.dispatcher.update(timeStep);
        this.planet.update(timeStep);

        this.shake *= 1 - this.SHAKE_DECREASE * timeStep;
    },

    renderBackground(context) {
        context.restore();

        this.space.render(context);
        
        var extraZoom = this.shake * this.SHAKE_ZOOM * Math.random();
        var shift = this.SHAKE_SHIFT * this.shake;
        
        context.save();
        context.translate(
            context.canvas.width / 2 - shift * 0.5 + Math.random() * shift,
            context.canvas.height / 2 - shift * 0.5 + Math.random() * shift);
        context.scale(this.SCALE + extraZoom, this.SCALE + extraZoom);
    },

    translateContext(context, offset) {
        context.save();

        context.translate(
            offset.x,
            offset.y
        );

        context.restore();
    },

    renderGame(context) {
        this.planet.render(context);
    },

    render(context) {
        this.renderBackground(context);
        this.renderGame(context);
    }
}
