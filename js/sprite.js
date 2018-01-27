function Sprite(file, xOrigin, yOrigin, frames) {
    this.xOrigin = xOrigin;
    this.yOrigin = yOrigin;
    this.frames = frames;
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
        this.width = this.image.width;
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
}

SpriteInstance.prototype = {
    draw(context, x, y, angle) {
        if(!this.sprite.isLoaded())
            return;
        
        context.save();
        context.translate(x, y);
        context.rotate(angle);
        
        context.drawImage(this.sprite.image, -this.sprite.xOrigin, -this.sprite.yOrigin);
        
        context.restore();
    }
}