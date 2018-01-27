function Resources() {
    this.load();
}

Resources.prototype = {
    load() {
        this.ufo_lander_2 = new Sprite("img/ufo_lander_2.png", 11, 6, 1);
    }
}