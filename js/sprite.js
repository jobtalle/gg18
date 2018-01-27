function Sprite(file, xOrigin, yOrigin, frames, fps) {
    this.xOrigin = xOrigin;
    this.yOrigin = yOrigin;
    this.frames = frames;
    this.fps = fps;
    this.width = 0;
    this.height = 0;
    
    this.load(file);
}

Sprite.prototype = {
    load(file) {
        this.image = new Image();
        this.image.src = file;
        this.image.onload = this.loaded.bind(this);
    },
    
    loaded() {
        this.width = this.image.width / this.frames;
        this.height = this.image.height;
    },
    
    isLoaded() {
        return this.width != 0 || this.height != 0;
    },
    
    instantiate() {
        return new SpriteInstance(this);
    }
}

function SpriteInstance(sprite) {
    this.sprite = sprite;
    this.frame = 0;
}

SpriteInstance.prototype = {
    update(timeStep) {
        if(this.sprite.frames == 1)
            return;
        
        this.frame += timeStep * this.sprite.fps;
        
        if(this.frame >= this.sprite.frames)
            this.frame -= this.sprite.frames;
    },
    
    setFrame(frame) {
        this.frame = frame;
    },
    
    draw(context, x, y, angle, xScale) {
        if(!this.sprite.isLoaded())
            return;
        
        context.save();
        context.translate(x, y);
        context.rotate(angle);
        if(xScale == undefined)
        {
            context.scale(1, 1);
        }
        else
        {
            context.scale(xScale, 1);
        }
        
        context.drawImage(
            this.sprite.image,
            this.sprite.width * Math.trunc(this.frame),
            0,
            this.sprite.width,
            this.sprite.height,
            -this.sprite.xOrigin,
            -this.sprite.yOrigin,
            this.sprite.width,
            this.sprite.height);
        
        context.restore();
    }
}