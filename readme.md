# Pan and tilt Raspberry Pi camera project template.
- view live stream or recording
- move camera up, down, left, and right with arrow keys, or touch interface
- service communicates with Raspberry Pi hardware


![screenshot](https://github.com/flashtwo/picam180/raw/screenshots/picam-screenshot.jpg "chrome mobile")
![wiring](https://github.com/flashtwo/picam180/raw/screenshots/picam-wiring.jpg "good old cotton swab stick engineering")

___

## RaspiStill, MJPG_streamer, and PiGpio

Project depends on PiGpio, raspistill, and mjpg_streamer

Example commands to get mjpg_streamer and raspistill up and serving a modestly sized stream of jpegs to compliment the bandwidth limitations, raspistill can also be set to rerun automatically after it dies, with a script, cron, etc. -

#### raspistill:
```sh
raspistill -w 640 -h 480 -q 8 -o /tmp/stream/pic.jpg -tl 120 -t 9999999 -th 0:0:0 -n > /dev/null 2>&1&
```
#### mjpg_streamer:
```sh
LD_LIBRARY_PATH=/usr/local/lib mjpg_streamer -i "input_file.so -f /tmp/stream -n pic.jpg" -o "output_http.so -p 3200 -w /usr/local/www" > /dev/null 2>&1&
```

___

## Config

#### Gpio pins
Gpio pins in use, reference the proper schematic for your Raspberry Pi
- panPin
- tiltPin

#### Limits
Pulse width limits, dont exceed your servo's limits!
- minPulseWidth
- midPulseWidth
- maxPulseWidth

#### Movement
Define your pulse width increments/decrements
- pulseIncrement

___

## Static IP is a good thing

Chances are, you're on a Debian derivative and you'll want to edit /etc/network/interfaces, so make a backup and have something like this under the loopback interface:

```sh
auto eth0
# iface eth0 inet dhcp
iface eth0 inet static
address 192.168.1.150
netmask 255.255.255.0
gateway 192.168.1.1
```
___

## Build

$ `gulp build`

## Serve

Without further steps on the OS level, Node will need to run with elevated privileges, ex:

$ `sudo node build/index.js`

___
