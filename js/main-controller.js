import { getMeme, setLineTxt, addLine, getImageById  } from './memeService.js'
import { renderGallery } from './galleryController.js'

let gElCanvas
let gCtx
function onInit() {
    renderGallery()
    document.querySelector('.canvas-container').style.display = 'none'
    renderMeme()
}
function renderMeme() {
    gElCanvas = document.querySelector('.myCanvas')
    gCtx = gElCanvas.getContext('2d')

    const meme = getMeme()
    const img = getImageById(meme.selectedImgId)

    const image = new Image()
    image.onload = function () {
        gCtx.clearRect(0, 0, gElCanvas.width, gElCanvas.height)
        gCtx.drawImage(image, 0, 0, gElCanvas.width, gElCanvas.height)

        meme.lines.forEach((line, idx) => {
            renderTextLine(line, gElCanvas.width / 2, line.y)

            if (idx === meme.selectedLineIdx) {
                drawFrame(gElCanvas.width / 2, line.y, line.txt)
            }
        })
    }

    if (img) {
        image.src = img.url
    }
}

function drawFrame(x, y, text) {
    const metrics = gCtx.measureText(text)
    const framePadding = 5 

    const frameWidth = metrics.width + framePadding * 2
    const frameHeight = parseInt(gCtx.font, 10) + framePadding * 2

    gCtx.beginPath()
    gCtx.rect(x - frameWidth / 2, y - frameHeight / 2, frameWidth, frameHeight)
    gCtx.strokeStyle = 'black'
    gCtx.stroke()
}

function renderTextLine(line, x, y) {
    gCtx.font = `${line.size}px Arial`
    gCtx.fillStyle = line.color
    gCtx.strokeStyle = 'black'
    gCtx.lineWidth = 2
    gCtx.textAlign = 'center'
    gCtx.strokeText(line.txt, x, y)
    gCtx.fillText(line.txt, x, y)
}

export { renderMeme }


function onTextInputChange(event) {
    const newText = event.target.value
    const meme = getMeme()
    const selectedLineIdx = meme.selectedLineIdx

    if (selectedLineIdx !== null && selectedLineIdx < meme.lines.length) {
        setLineTxt(selectedLineIdx, newText)
        renderMeme()
    }
}

function onColorChange(event) {
    const newColor = event.target.value
    const meme = getMeme()
    const selectedLineIdx = meme.selectedLineIdx

    if (selectedLineIdx !== null && selectedLineIdx < meme.lines.length) {
        meme.lines[selectedLineIdx].color = newColor
        renderMeme()
    }
}

function onIncreaseFont() {
    const meme = getMeme()
    const selectedLineIdx = meme.selectedLineIdx

    if (selectedLineIdx !== null && selectedLineIdx < meme.lines.length) {
        meme.lines[selectedLineIdx].size += 2
        renderMeme()
    }
}

function onDecreaseFont() {
    const meme = getMeme()
    const selectedLineIdx = meme.selectedLineIdx

    if (selectedLineIdx !== null && selectedLineIdx < meme.lines.length) {
        meme.lines[selectedLineIdx].size -= 2
        renderMeme()
    }
}

function addLineHandler() {
    addLine()
    renderMeme() 
}
function switchLineHandler() {
    switchLine()
}
window.onTextInputChange = onTextInputChange
window.onColorChange = onColorChange
window.onIncreaseFont = onIncreaseFont
window.onDecreaseFont = onDecreaseFont
window.addLineHandler = addLineHandler
window.switchLineHandler = switchLineHandler

document.addEventListener('DOMContentLoaded', () => {
    // Other initialization code
})
document.addEventListener('DOMContentLoaded', onInit)
