module.exports = {
    // Gpio pins in use, reference the proper schematic for your Raspberry Pi
    panPin: 10,
    tiltPin: 17,
    // pulse width limits, dont exceed your servo's limits!
    minPulseWidth: 1300,
    midPulseWidth: 1600,
    maxPulseWidth: 1900,
    // define your pulse width increments/decrements
    pulseIncrement: 50,
    // define port for server
    port: 8080
}
