function Planet(players) {
    this.players = players;
    this.angle = 0;
    
    this.listenToPlayers(players);
    
    this.createScenery();
    this.createBeamers();
    this.createCrystals();
    this.createUfos();
    this.calculateInteractionRadius();
}

Planet.prototype = {
    COLOR_PLANET: "#c0d0b0",
    COLOR_PLANET_HIGHLIGHT: "#dae4d0",
    COLOR_PLANET_LINES: "#afc0b5",
    RADIUS: 100,
    RADIUS_ORBIT: 150,
    RADIUS_INCOMING: 400,
    ROTATION_SPEED: 0.1,
    SCENERY_AMOUNT: 40,
    BEAMER_COUNT: 6,
    ATMOSPHERE_SIZE_MODIFIER: 1.2,
    ATMOSPHERE_COLOR: "rgba(89,133,221,0.66)",
    ATMOSPHERE_START_ANGLE: 2.35619449019,
    ATMOSPHERE_END_ANGLE: -0.78539816339,
    INTERACTION_DISTANCE: 16,
    CRYSTAL_COUNT: 12,
    
    update(timeStep) {
        this.angle += this.ROTATION_SPEED * timeStep;
        
        if(this.angle > Math.PI * 2)
            this.angle -= Math.PI * 2;
        
        for(var i = 0; i < this.ufos.length; ++i)
            this.ufos[i].update(timeStep);
        
        for(var i = 0; i < this.crystals.length; ++i)
            this.crystals[i].update(timeStep);
        
        for(var i = 0; i < this.players.length; ++i)
            this.players[i].update(timeStep);
        
        for(var i = 0; i < this.beamers.length; ++i)
            this.beamers[i].update(timeStep);
        
        this.checkUfos();
    },
    
    render(context) {
        this.renderAtmosphere(context);

        context.save();
        context.rotate(this.angle);
        
        context.fillStyle = this.COLOR_PLANET;
        
        context.beginPath();
        context.arc(0, 0, this.RADIUS, 0, Math.PI * 2);
        context.fill();
        
        context.restore();

        this.renderHighlight(context);
        this.renderLines(context);
        
        context.save();
        context.rotate(this.angle);        

        for(var i = 0; i < this.scenery.length; ++i)
            this.scenery[i].render(context);
        
        for(var i = 0; i < this.beamers.length; ++i)
            this.beamers[i].render(context);
        
        for(var i = 0; i < this.crystals.length; ++i)
            this.crystals[i].render(context);
        
        for(var i = 0; i < this.players.length; ++i)
            this.players[i].render(context);
        
        for(var i = 0; i < this.ufos.length; ++i)
            this.ufos[i].render(context);
        
        context.restore();
    },
    
    getBeams() {
        var beams = [];
        
        for(var i = 0; i < this.beamers.length; ++i)
            for(var j = 0; j < this.beamers[i].beams.length; ++j)
                beams.push(this.beamers[i].beams[j]);
        
        return beams;
    },
    
    checkUfos() {
        const beams = this.getBeams();
        
        for(var i = 0; i < this.ufos.length; ++i) {
            const ufo = this.ufos[i];
            
            if(ufo.finished)
                continue;
            
            const hitBeams = ufo.findBeams(beams);
            
            if(ufo.match(hitBeams))
                ufo.leave();
        }
    },
    
    calculateInteractionRadius() {
        this.interactionRadius = this.INTERACTION_DISTANCE / this.RADIUS;
    },
    
    listenToPlayers(players) {
        for(var i = 0; i < players.length; ++i) {
            const player = players[i];
            
            player.onTryEnter = this.tryEnter.bind(this);
            player.onTryPickup = this.tryPickup.bind(this);
            player.onTryDrop = this.tryDrop.bind(this);
            player.planet = this;
        }
    },
    
    tryEnter(player) {
        const playerPositionNormalized = player.position.normalize();
        
        for(var i = 0; i < this.beamers.length; ++i) {
            const beamer = this.beamers[i];
            
            if(Math.acos(beamer.positionNormalized.dot(playerPositionNormalized)) < this.interactionRadius) {
                player.enterBeamer(beamer, this);
                
                break;
            }
        }
    },
    
    tryPickup(player) {
        var nearestCrystal = this.findNearestCrystal(player.position);
        
        if(nearestCrystal != null) {
            player.pickup(nearestCrystal);
            this.crystals.splice(this.crystals.indexOf(nearestCrystal), 1);
        }
        else {
            const beamer = this.findNearestBeamer(player.position);
            
            if(beamer != null && beamer.crystal != null) {
                player.pickup(beamer.crystal);
                beamer.dropCrystal();
            }
        }
    },
    
    tryDrop(player) {
        const beamer = this.findNearestBeamer(player.position);
        
        if(beamer == null)
            this.crystals.push(player.crystal);
        else
            beamer.putCrystal(player.crystal, this);
        
        player.drop();
    },
    
    findNearestCrystal(vector) {
        const normalized = vector.normalize();
        var crystalAngle = 1;
        var nearestCrystal = null;
        
        for(var i = 0; i < this.crystals.length; ++i) {
            const crystal = this.crystals[i];
            const angle = Math.acos(crystal.position.normalize().dot(normalized));
            
            if(angle < this.interactionRadius && angle < crystalAngle) {
                crystalAngle = angle;
                nearestCrystal = crystal;
            }
        }
        
        return nearestCrystal;
    },
    
    findNearestBeamer(vector) {
        const normalized = vector.normalize();
        
        for(var i = 0; i < this.beamers.length; ++i)
            if(Math.acos(this.beamers[i].positionNormalized.dot(normalized)) < this.interactionRadius)
                return this.beamers[i];
            
        return null;
    },
    
    createScenery() {
        this.scenery = [];
        
        for(var i = 0; i < this.SCENERY_AMOUNT; ++i)
            this.scenery.push(new Scenery(Math.random() * Math.PI * 2));
    },
    
    createBeamers() {
        this.beamers = [];
        
        for(var i = 0; i < this.BEAMER_COUNT; ++i)
            this.beamers.push(new Beamer((Math.PI / 3) * i));
    },
    
    createCrystals() {
        this.crystals = [];
        
        for(var i = 0; i < this.CRYSTAL_COUNT; ++i) {
            var color;
            
            switch(i % 3) {
                case 0:
                    color = "red";
                    break;
                case 1:
                    color = "yellow";
                    break;
                case 2:
                    color = "blue";
                    break;
            }
            
            this.crystals.push(new Crystal(Math.random() * 2 * Math.PI, new CrystalEssence(color)));
        }
    },
    
    dispatch(ufoObject) {
        console.log("Spawning:");
        console.log(ufoObject);
    },
    
    createUfos() {
        this.ufos = [];
        this.addUfo(new Ufo([new CrystalEssence("red")], new UfoMoverOrbit(2, this.RADIUS_ORBIT)));
    },
    
    addUfo(ufo) {
        ufo.addLeaveListener(this.removeUfo.bind(this));
        
        this.ufos.push(ufo);
    },
    
    removeUfo(ufo) {
        this.ufos.splice(this.ufos.indexOf(ufo), 1);
    },

    renderAtmosphere(context)
    {
        context.save();

        grd=context.createRadialGradient(0,0,this.RADIUS+10,0,0,140);
        grd.addColorStop(0,"#00000000");
        grd.addColorStop(1, this.ATMOSPHERE_COLOR);

        context.beginPath();
        context.fillStyle = grd;
        context.arc(0,0, this.RADIUS * this.ATMOSPHERE_SIZE_MODIFIER,  this.ATMOSPHERE_START_ANGLE, this.ATMOSPHERE_END_ANGLE);
        
        context.shadowBlur = 100;
        context.shadowColor = this.ATMOSPHERE_COLOR;
        
        context.fill();
        context.restore();
    },

    renderHighlight(context){
        context.save();

        var grd=context.createRadialGradient(-30,-50,100,-30,-50,120);
        grd.addColorStop(0, this.COLOR_PLANET_HIGHLIGHT);
        grd.addColorStop(1,"rgba(0,0,0,0)");

        context.beginPath();
        context.fillStyle ="rgba(0,0,0,0)";
        context.arc(0,0, this.RADIUS,  0, Math.PI * 2);
        context.fill();
        context.clip();

        context.beginPath();
        context.fillStyle = this.COLOR_PLANET_HIGHLIGHT;
        context.arc(-30,-50, this.RADIUS * 1.2,  0, Math.PI * 2);
        context.fill();

        context.restore();
    },

    renderLines(context)
    {
        context.save();

        context.beginPath();
        context.fillStyle ="rgba(0,0,0,0)";
        context.arc(0,0, this.RADIUS,  0, Math.PI * 2);
        context.fill();
        context.clip();

        context.beginPath();
        context.fillStyle = this.COLOR_PLANET_LINES;

        context.rect(20,40,200,2);
        context.rect(40,34,200,2);

        context.rect(80,-20,200,2);
        context.rect(60,-14,30,2);
        
        context.rect(30,-40,200,2);
        context.rect(10,-46,30,2);

        context.rect(-100,46,30,2);

        context.rect(-100,-30,60,2);

        context.fill();

        context.clip();
        context.beginPath();
        context.fillStyle = this.COLOR_PLANET;
        context.arc(-30,-50,this.RADIUS * 1.2, 0, Math.PI * 2);
        context.fill();

        context.restore();
    }
}