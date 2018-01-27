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
        
    },
    
    isLoaded() {
        return this.width != 0 || this.height != 0;
    }
    
    instantiate() {
        return new SpriteInstance(this);
    }
}

function SpriteInstance(sprite) {
    this.sprite = sprite;
}

SpriteInstance.prototype = {
    draw(x, y, angle) {
        if(!this.sprite.isLoaded())
            return;
    }
}