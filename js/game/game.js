function Game(renderer, players) {
    this.renderer = renderer;
    this.space = new Space();
    this.planet = new Planet(players);
    this.dispatcher = new UfoDispatcher(this.planet.dispatch.bind(this.planet));
    this.dispatcher.start();

    this.shakeZoom = 0;
    this.shakeAngle = 0;
    this.shakeAngleSpeed = 0;
}

Game.prototype = {
    SCALE: 4,

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

    shake() {
        this.shakeZoom += 0.1;
        this.shakeAngleSpeed = -this.shakeAngleSpeed + Math.sign(this.shakeAngleSpeed) * 1;
    },

    update(timeStep) {
        this.space.update(timeStep);
        this.dispatcher.update(timeStep);
        this.planet.update(timeStep);

        this.shakeAngle += this.shakeAngleSpeed;
        this.shakeAngle *= 1 - 0.1 * timeStep;
        this.shakeZoom *= 1 - 0.1 * timeStep;
    },

    renderBackground(context) {
        context.restore();

        this.space.render(context);

        context.save();
        context.translate(
            context.canvas.width / 2,
            context.canvas.height / 2);
        context.scale(this.SCALE + this.shakeZoom, this.SCALE + this.shakeZoom);
        context.rotate(this.shakeAngle);
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
