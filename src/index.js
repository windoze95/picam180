import config from './config'
import http from 'http'
import fs from 'fs'
import finalhandler from 'finalhandler'
import * as servo from './service/servo.service'

const Router = require('router')
const opts = { mergeParams: true }

const router = Router(opts)
const server = http.createServer((req, res) => {
    router(req, res, finalhandler(req, res))
})

function render(path, contentType, fn) {
    fs.readFile(`${__dirname}/${path}`, 'utf-8', function (err, str) {
        fn(err, str, contentType);
    });
}

// reset servos positions
servo.resetServos()

router.get('/', (req, res) => {
    function httpHandler (err, str, contentType) {
        if (err) {
            res.writeHead(500, { 'Content-Type': 'text/plain' });
            res.end(`An error has occured: ${err.message}`);
        } else {
            res.writeHead(200, { 'Content-Type': contentType });
            res.end(str);
        }
    }
    render('client/index.html', 'text/html', httpHandler)
})

router.get('/assets/:path', (req, res) => {
    const path = req.params.path
    const img = fs.readFileSync(`${__dirname}/client/glyphicons-601-chevron-up.png`)

    function httpHandler (err, str, contentType) {
        if (err) {
            res.writeHead(500, { 'Content-Type': 'text/plain' })
            res.end(`An error has occured: ${err.message}`)
        } else {
            res.writeHead(200, { 'Content-Type': contentType })
            res.end(str)
        }
    }

    if (path === 'controller.js')
        render(`client/${path}`, 'application/javascript', httpHandler)
    else if (path === 'glyphicons-601-chevron-up.png') {
        res.writeHead(200, {'Content-Type': 'image/png'})
        res.end(img, 'binary')
    } else
        httpHandler({message: 'not a valid asset route'}, null, null)
})

// make another router
const handler = Router(opts)
// mount second router to a route that accepts a param
router.use('/:path', handler)

handler.get('/', (req, res, next) => {
    const path = req.params.path
    // pass request to servo.service
    servo.control(path)
    // getting error 500, but it works for now ^-^
    next(res.statusCode = 200)
})

server.listen(config.port)
