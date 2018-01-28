function AudioSource(file, looping) {
    this.audio = new Audio(file);
    this.audio.loop = looping;
    this.paused = true;
}   


AudioSource.prototype = {
    play()
    {
        if(!this.paused)
            return;
        this.audio.play();
        this.paused = false;
    },
    setLooping(looping)
    {
        this.audio.loop = looping;
    },
    pause()
    {
        if(this.paused)
            return;
        this.audio.pause();
        this.paused = true;
    },
    stop()
    {
        if(this.paused)
            return;
        this.pause();
        this.audio.currentTime = 0;
    },
    setVolume(volume)
    {
        this.audio.volume = volume;
    }
}