function Interface() {
    this.showStartScreen();
}

Interface.prototype = {
    showStartScreen() {
        new CharSelect();
    }
}