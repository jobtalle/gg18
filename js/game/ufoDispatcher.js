function UfoDispatcher(callback) {
    this.callback = callback;

    for (let i = 0; i < this.csvData.length; i++) {
        const line = this.csvData[i];
        var splitNewLines = line.split('\r\n');

        for (let j = 0; j < splitNewLines.length; j++) 
        {
            if(splitNewLines[0] == '#')
                continue;
            
            this.sequence.push([]);

            const splitComma = splitNewLines[j].split(',');
            for (let k = 0; k < splitComma.length; k++) {
                const element = splitComma[k];
                this.sequence[j].push(element); 
            }
        }
    }
}

UfoDispatcher.prototype = {
    csvData: ["a1,r,,2,a2,r,g,2\r\na1,r,g,2,a2,r,b,2"],
    sequence: [],
    timer: 0.0,
    maxTime: 0.0,
    sequenceIndex: 0,

    update(deltaTime)
    {
        this.timer += deltaTime;
        if(this.timer >= this.maxTime)
        {
            if(this.sequenceIndex < this.sequence.length && this.sequence[this.sequenceIndex].length == 0)
                this.sequenceIndex++;

            if(this.sequenceIndex == this.sequence.length)
            {
                console.log("win");
                return;
            }

            type =  this.sequence[this.sequenceIndex].shift();
            color =  this.sequence[this.sequenceIndex].shift();
            secondaryColor =  this.sequence[this.sequenceIndex].shift();
            timer =  this.sequence[this.sequenceIndex].shift();
            
            if(this.callback != undefined)
                this.callback(type, color, secondaryColor, timer);

            this.maxTime = timer;
            this.timer = 0;
        }
    }
} 