function deltaAngle(current, target)
{
    num = this.repeat(target - current, 360);
    if (num > 180)
    {
        num -= 360;
    }
    return num;
}

function repeat(time, length)
{
    return this.clamp(time - Math.floor(time / length) * length, 0, length);
}

function clamp(value, min, max)
{
    if (value < min)
    {
        value = min;
    }
    else if (value > max)
    {
        value = max;
    }
    return value;
}

function toDegrees (radians)
{
    return radians * (180 / Math.PI);
}