var gElCanvas
var gCtx
var gCurrShape = 'squares'
var gCurrColor = 'rgb(79, 252, 220)'
var gCurrBorder = '#2727CE'
var isDrawing = false
const TOUCH_EVS = ['touchstart', 'touchmove', 'touchend']

function onInit() {
    gElCanvas = document.querySelector('canvas')
    gCtx = gElCanvas.getContext('2d')

    TOUCH_EVS.forEach(event => {
        gElCanvas.addEventListener(event, onTouchEvent)
    })
    gElCanvas.addEventListener('mousedown', onMouseDown)
    gElCanvas.addEventListener('mousemove', onMouseMove)
    gElCanvas.addEventListener('mouseup', onMouseUp)
}

function onShapeChange(ev) {
    gCurrShape = ev.target.value
}

function onColorChange(ev) {
    gCurrColor = ev.target.value
}

function onBorderChange(ev) {
    gCurrBorder = ev.target.value
}

function onClearCanvas() {
    gCtx.clearRect(0, 0, gElCanvas.width, gElCanvas.height)
}

function onDownloadCanvas() {
    const link = document.createElement('a')
    link.download = 'canvas_image.png'
    link.href = gElCanvas.toDataURL()
    link.click()
}

function onDraw(ev) {
    const { offsetX, offsetY } = ev
    DrawingService.draw(gCtx, gCurrShape, gCurrColor, gCurrBorder, offsetX, offsetY)
}

function onMouseDown(ev) {
    DrawingService.startDrawing(gCtx, ev, gCurrColor, gCurrBorder)
    isDrawing = true
}

function onMouseMove(ev) {
    if (!isDrawing) return
    onDraw(ev)
}

function onMouseUp(ev) {
    isDrawing = false
    gCtx.beginPath()
}

function onTouchEvent(ev) {
    ev.preventDefault()
    if (ev.targetTouches && ev.targetTouches.length > 0) {
        const rect = gElCanvas.getBoundingClientRect()
        const touchX = ev.targetTouches[0].clientX - rect.left
        const touchY = ev.targetTouches[0].clientY - rect.top
        onDraw({ offsetX: touchX, offsetY: touchY })
    }
}

