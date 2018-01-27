function playerControllerFactory(gamepad) {
    this.gamepad = gamepad;
    
    gamepad.on('connect', e => {
        if(!this.availableControllerIds.includes(e.index))
        {
            this.availableControllerIds.push(e.index);
        }
    });
}

playerControllerFactory.prototype = {
    availableControllerIds:[],
    gamepad:null,

    getPlayerControllerController()
    {
        if(this.availableControllerIds.length > 0)
        {
            var id = this.availableControllerIds[0];
            this.availableControllerIds.splice(0,1);
            return new PlayerController(id);
        }
        return null;
    },
    
    getPlayerControllerController(id)
    {
        var index = this.availableControllerIds.indexOf(id);
        if(index != -1)
        {
            this.availableControllerIds.splice(index,1);
            return new PlayerController(this.gamepad, id);
        }
        return null;
    },
    
    releaseControllerId(id)
    {
        if(!this.availableControllerIds.includes(id))
            this.availableControllerIds.push(id);
    }
}