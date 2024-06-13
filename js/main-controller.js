
import { getMeme, setLineTxt, getImageById, setSelectedImg, gImgs } from './memeService.js'

var gElCanvas
var gCtx

function renderMeme() {
    gElCanvas = document.querySelector('.myCanvas') 
    gCtx = gElCanvas.getContext('2d')


    const meme = getMeme()
    const img = getImageById(meme.selectedImgId)
  
    const image = new Image()
    image.onload = function () {
        // Clear canvas 
        gCtx.clearRect(0, 0, gElCanvas.width, gElCanvas.height)

        // Draw on canvas
        gCtx.drawImage(image, 0, 0, gElCanvas.width, gElCanvas.height)

        // Draw text 
        meme.lines.forEach(line => {
            gCtx.font = `${line.size}px Arial`
            gCtx.fillStyle = line.color
            gCtx.strokeStyle = 'black'
            gCtx.lineWidth = 2
            gCtx.textAlign = 'center'

            
            const x = gElCanvas.width / 2
            const y = gElCanvas.height / 2 + meme.lines.indexOf(line) * 40

            gCtx.strokeText(line.txt, x, y)
            gCtx.fillText(line.txt, x, y)
        })
    }
    image.src = img.url
}

function onInit() {
    const gallery = document.querySelector('.gallery')

    gImgs.forEach(img => {
        const imgElement = document.createElement('img')
        imgElement.src = img.url
        imgElement.onclick = () => {
            setSelectedImg(img.id)
            renderMeme()
        }
        gallery.appendChild(imgElement)
    })
    renderMeme()
}

function onTextInputChange(event) {
    const newText = event.target.value
    const meme = getMeme()
    const selectedLineIdx = meme.selectedLineIdx

    if (selectedLineIdx !== null && selectedLineIdx < meme.lines.length) {
        setLineTxt(selectedLineIdx, newText)
        renderMeme()
    }
}

document.addEventListener('DOMContentLoaded', onInit)

