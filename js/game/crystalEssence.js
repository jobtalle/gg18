function CrystalEssence(color) {
    this.color = color;
}

CrystalEssence.prototype = {
    getColor(day) {
        switch(this.getColorName(day)) {
            case "red":
                return "rgb(255, 100, 100)";
            case "yellow":
                return "rgb(255, 255, 100)";
            case "blue":
                return "rgb(100, 100, 255)";
            case "green":
                return "rgb(100, 255, 100)";
            case "purple":
                return "rgb(255, 100, 255)";
            case "orange":
                return "rgb(255, 175, 100)";
        }
    },
    
    getColorName(day) {
        if(day) {
            return this.color;
        }
        else {
            switch(this.color) {
                default:
                case "red":
                    return "green";
                case "yellow":
                    return "purple";
                case "blue":
                    return "orange";
            }
        }
    }
}