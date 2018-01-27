function PlayerController(controllerId)
{
    this.controllerId = controllerId;
    this.vector = new Vector();
    this.movedStick = false;
    this.onActivatePressed = null;
    this.onActiveReleased = null;
    this.onEnterPressed = null;
    this.onEnterReleased = null;
    this.onMove = null;
}

PlayerController.prototype = {
    ZERO_VECTOR: new Vector(),
    
    leftKey: "KeyA",
    rightKey: "KeyD",
    upKey: "KeyW",
    downKey: "KeyS",
    enterKey: "KeyE",
    escapeKey: "KeyQ",
    
    onPressButton1() {
        if(this.onActivatePressed != null)
            this.onActivatePressed();
    },
    
    onReleaseButton1() {
        if(this.onActivateReleased != null)
            this.onActivateReleased();
    },

    onPressButton2() {
        if(this.onEnterPressed != null)
            this.onEnterPressed();
    },
    
    onReleaseButton2() {
        if(this.onEnterReleased != null)
            this.onEnterReleased();
    },

    onMoveStickLeft(vector) {
        this.vector.x = vector.x;
        this.vector.y = vector.y;
        this.movedStick = true;
    },
    
    update() {
        if(this.onMove != null) {
            if(this.movedStick) {
                this.onMove(this.vector);

                this.movedStick = false;
            }
            else
                this.onMove(this.ZERO_VECTOR);
        }
    }
}