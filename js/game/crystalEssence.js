function CrystalEssence(color) {
    this.color = color;
}

CrystalEssence.prototype = {
    getColor() {
        switch(this.color) {
            default:
            case "red":
                return "rgb(255, 100, 100)";
                break;
            case "green":
                return "rgb(100, 255, 100)";
                break;
            case "blue":
                return "rgb(100, 100, 255)";
                break;
        }
    }
}