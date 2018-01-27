function Crystal(angle, essence) {
    this.angle = angle;
    this.essence = essence;
    this.life = this.LIFETIME;
    this.day = true;
    this.crystalSprite = resources.gems_blue.instantiate();
    this.setCrystalSprite();
    this.interacting = false;

    this.bounce = Math.random() * 8;

    this.position = new Vector(
        Math.cos(angle) * Planet.prototype.RADIUS,
        Math.sin(angle) * Planet.prototype.RADIUS);
}

Crystal.prototype = {
    LIFETIME: 4,

    update(timeStep) {
        this.crystalSprite.update(timeStep);

        if (!this.interacting) {
            this.position.x = Math.cos(this.angle) * (Planet.prototype.RADIUS + Math.sin(this.bounce * 2) + 1);
            this.position.y = Math.sin(this.angle) * (Planet.prototype.RADIUS + Math.sin(this.bounce * 2) + 1);
        }

        this.bounce += timeStep;
    },

    setDay(day) {
        this.day = day;
        this.setCrystalSprite();
    },

    drain(timeStep) {
        this.life -= timeStep;

        if(this.life < 0)
            this.life = 0;
    },

    getStrength() {
        return Math.sqrt(this.life / this.LIFETIME);
    },

    getColor() {
        return this.essence.getColor(this.day);
    },

    carry(angle, height) {
        this.interacting = true;
        this.angle = angle;
        this.position.x = Math.cos(angle) * (Planet.prototype.RADIUS + height);
        this.position.y = Math.sin(angle) * (Planet.prototype.RADIUS + height);
    },

    drop(angle) {
        this.interacting = false;
        this.position.x = Math.cos(angle) * Planet.prototype.RADIUS;
        this.position.y = Math.sin(angle) * Planet.prototype.RADIUS;
    },

    render(context) {
        context.save();


        // context.translate(this.position.x, this.position.y);
        // context.rotate(this.angle + Math.PI * 0.5);
        context.globalAlpha = this.getStrength();
        this.crystalSprite.draw(context, this.position.x, this.position.y, this.angle + Math.PI * 0.5);

        // context.fillStyle = this.getColor();
        // context.beginPath();
        // context.moveTo(0, 0);
        // context.lineTo(-5, -5);
        // context.lineTo(0, -10);
        // context.lineTo(5, -5);
        // context.closePath();


        // context.fill();

        context.restore();
    },

    setCrystalSprite()
    {
        if(this.day)
        {
            switch( this.essence.color)
            {
                case "red":
                this.crystalSprite = resources.gems_red.instantiate();
                break;

                case "yellow":
                this.crystalSprite = resources.gems_yellow.instantiate();
                break;

                case "blue":
                this.crystalSprite = resources.gems_blue.instantiate();
                break;
            }
        }
        else
        {
            switch( this.essence.color)
            {
                case "red":
                this.crystalSprite = resources.gems_green.instantiate();
                break;

                case "yellow":
                this.crystalSprite = resources.gems_purple.instantiate();
                break;

                case "blue":
                this.crystalSprite = resources.gems_orange.instantiate();
                break;
            }
        }
    }
}
