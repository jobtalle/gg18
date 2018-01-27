function CrystalEssence(color) {
    this.color = color;
}

CrystalEssence.prototype = {
    getColor(day) {
        if(day) {
            switch(this.color) {
                default:
                case "red":
                    return "rgb(255, 100, 100)";
                    break;
                case "yellow":
                    return "rgb(255, 255, 100)";
                    break;
                case "blue":
                    return "rgb(100, 100, 255)";
                    break;
            }
        }
        else {
            switch(this.color) {
                default:
                case "red": // Green
                    return "rgb(100, 255, 100)";
                    break;
                case "yellow": // Purple
                    return "rgb(255, 100, 255)";
                    break;
                case "blue": // Orange
                    return "rgb(255, 175, 100)";
                    break;
            }
        }
    }
}