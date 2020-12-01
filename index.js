const express = require('express')
const app = express()
const port = process.env.PORT || 80
const host = '0.0.0.0'

const five = require('johnny-five')
const serialPort = "COM3"
const board = new five.Board({
    port: serialPort,
    repl: false,
    debug: false
})

app.use(express.static(__dirname + '/public/'))
app.use(express.json())
app.set('view engine', 'ejs');

app.get('/', (_req, res) => {
    res.render('pages/index')
})
app.get('/driver', (_req, res) => {
    res.render('pages/driver')
})
app.get('/pad-driver', (_req, res) => {
    res.render('pages/pad-driver')
})

board.on('ready', () => {
    console.log(`board connected on port ${serialPort}`)
    const xServo = new five.Servo({ pin: 7, invert: true })
    const yServo = new five.Servo({ pin: 8 })
    const led = new five.Led(13)

    app.post('/api', (req, res) => {
        console.log(`${req.ip}) x:${req.body.x}, y:${req.body.y}, led:${req.body.led}`)
        xServo.to(req.body.x)
        yServo.to(req.body.y)
        if (req.body.led) {
            led.on()
        } else {
            led.off()
        }
        res.end()
    })
})

app.listen(port, host, () => {
    console.log("server listening on port " + port)
})