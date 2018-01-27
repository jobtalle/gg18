function Scenery(angle) {
    this.angle = angle;
    this.position = new Vector(
        Math.cos(angle) * Planet.prototype.RADIUS,
        Math.sin(angle) * Planet.prototype.RADIUS);

    this.SCENERY_OBJECTS = [resources.building_1, resources.building_2, resources.building_3, resources.building_4, resources.building_5, resources.building_6, resources.bush, resources.oak,resources.pine];
    this.sprite = this.SCENERY_OBJECTS[getRandomInt(0,this.SCENERY_OBJECTS.length)].instantiate();
}

Scenery.prototype = {
    SCENERY_OBJECTS: [],
    LIT_FRAME: 1,
    UNLIT_FRAME: 0,


    render(context) {
        // context.save();

        this.sprite.draw(context, this.position.x, this.position.y, this.angle);
        // context.rotate(this.angle);
        
        // context.fillStyle = this.COLOR;
        
        // context.beginPath();
        // context.arc(this.position.x, this.position.y, 1, 0, Math.PI * 2);
        // context.fill();
        
        // context.restore();
    },

    setDay(day)
    {
        if(day)
        {
            this.sprite.setFrame(this.UNLIT_FRAME);
        }
        else
        {
            this.sprite.setFrame(this.LIT_FRAME);
        }
    }
}