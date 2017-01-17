let imageNr = 0 // Serial number of current image
const finished = new Array() // References to img objects which have finished downloading

function createImageLayer() {
    const img = new Image()
    img.style.position = "absolute"
    img.style.zIndex = -1
    img.onload = imageOnload
    img.src = `//192.168.1.150:3200/?action=snapshot&n=${++imageNr}`
    const webcam = document.getElementById("webcam")
    webcam.insertBefore(img, webcam.firstChild)
}

// Two layers are always present (except at the very beginning), to avoid flicker
function imageOnload() {
    this.style.zIndex = imageNr // Image finished, bring to front!
    while (1 < finished.length) {
        const del = finished.shift() // Delete old image(s) from document
        del.parentNode.removeChild(del)
    }
    finished.push(this)
    createImageLayer()
}

// call api methods to move dervos
function tiltPanControl(direction) {
    const xhr = new XMLHttpRequest()
    xhr.open('GET', direction)
    xhr.onload = () => {
        if (xhr.status === 200) {
            console.log(`sweet! ${xhr.responseText}`)
        }
        else {
            console.log(`Request failed... ${xhr.status}`)
        }
    }
    xhr.send()
}

// arrow key control
document.onkeydown = function myFunction() {
    switch (event.keyCode) {
        case 38:
            tiltPanControl("up")
            break
        case 40:
            tiltPanControl("down")
            break
        case 37:
            tiltPanControl("left")
            break
        case 39:
            tiltPanControl("right")
            break
    }
}
