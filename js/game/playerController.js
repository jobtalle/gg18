function PlayerController() {
    document.body.addEventListener("keydown", this.onKeyDown.bind(this));
    document.body.addEventListener("keyup", this.onKeyUp.bind(this));
}

PlayerController.prototype = {
    onLeftPressed: null,
    onLeftReleased: null,
    onRightPressed: null,
    onRightReleased : null,
    onActivatePressed : null,
    onActiveReleased : null,
    onEnterPressed : null,
    onEnterReleased : null,

    onKeyDown(e)
    {
        switch(e.code)
        {
            case "ArrowLeft":
            case "KeyA":
                if(this.onLeftPressed != null)
                    this.onLeftPressed();
                break;
            case "ArrowRight":
            case "KeyD":
            if(this.onRightPressed != null)
                this.onRightPressed();
                break;
            case "Enter":
            case "KeyE":
                if(this.onEnterPressed != null)
                    this.onEnterPressed();
                break;
            case "Escape":
            case "KeyQ":
                if(this.onActivatePressed != null)
                    this.onActivatePressed();
                break;
        }
    },

    onKeyUp(e)
    {
        switch(e.code)
        {
            case "ArrowLeft":
            case "KeyA":
                if(this.onLeftReleased != null)
                    this.onLeftReleased();
                break;
            case "ArrowRight":
            case "KeyD":
            if(this.onRightReleased != null)
                this.onRightReleased();
                break;
            case "Enter":
            case "KeyE":
                if(this.onEnterReleased != null)
                    this.onEnterReleased();
                break;
            case "Escape":
            case "KeyQ":
                if(this.onActivateReleased != null)
                    this.onActivateReleased();
                break;
        }
    }
}