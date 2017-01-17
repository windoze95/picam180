import config from '../config'
import piGpio from 'pigpio'

const Gpio = piGpio.Gpio
// set pins to be used from config
const panServo = new Gpio(config.panPin, {mode: Gpio.OUTPUT})
const tiltServo = new Gpio(config.tiltPin, {mode: Gpio.OUTPUT})

// limits set from config
const min = config.minPulseWidth
const mid = config.midPulseWidth
const max = config.maxPulseWidth
const increment = config.pulseIncrement

// keep track of your servo posistions
var pan = {
    position: mid
}
var tilt = {
    position: mid
}

export function resetServos() {
    // reset position markers
    pan.position = mid
    tilt.position = mid
    // reset servos
    panServo.servoWrite(pan.position)
    tiltServo.servoWrite(tilt.position)

    return {pan: pan.position, tilt: tilt.position}
}

export function control(path) {
    const direction = path

    switch(direction) {
        case 'right':
            if(pan.position >= min + increment) {
                pan.position -= increment
                panServo.servoWrite(pan.position)
                return 0, pan.position
            } else {
                return 0, pan.position
            }
            break

        case 'left':
            if(pan.position <= max - increment) {
                pan.position += increment
                panServo.servoWrite(pan.position)
                return 0, pan.position
            } else {
                return 0, pan.position
            }
            break

        case 'up':
            if(tilt.position <= max - increment) {
                tilt.position += increment
                tiltServo.servoWrite(tilt.position)
                return 0, tilt.position
            } else {
                return 0, tilt.position
            }
            break

        case 'down':
            if(tilt.position >= min + increment) {
                tilt.position -= increment
                tiltServo.servoWrite(tilt.position)
                return 0, tilt.position
            } else {
                return 0, tilt.position
            }
            break

        default:
            console.log("nope, sorry")
    }
    return 0
}
