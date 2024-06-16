let gElCanvas
let gCtx
let selectedLineIdx = -1
let isDragging = false
let dragStartX, dragStartYs
let gFilteredImgs = []
let generatedMeme
const TOUCH_EVS = ['touchstart', 'touchmove', 'touchend']

function onInit() {
    gElCanvas = document.querySelector('.myCanvas')
    gCtx = gElCanvas.getContext('2d')
    gFilteredImgs = gImgs
    renderGallery(gFilteredImgs)
    renderMeme()
    renderKeywords()

    TOUCH_EVS.forEach(ev => {
        gElCanvas.addEventListener(ev, onTouchEvent)
    })

    gElCanvas.addEventListener('mousedown', handleMouseDown)
    gElCanvas.addEventListener('mousemove', handleMouseMove)
    gElCanvas.addEventListener('mouseup', handleMouseUp)
}
function onTouchEvent(ev) {
    ev.preventDefault()
    if (ev.targetTouches && ev.targetTouches.length > 0) {
        const rect = gElCanvas.getBoundingClientRect()
        const touchX = ev.targetTouches[0].clientX - rect.left
        const touchY = ev.targetTouches[0].clientY - rect.top

        switch (ev.type) {
            case 'touchstart':
                onTouchStart(touchX, touchY)
                break
            case 'touchmove':
                onTouchMove(touchX, touchY)
                break
            case 'touchend':
                onTouchEnd()
                break
        }
    }
}
function onTouchStart(x, y) {
    const meme = getMeme()
    meme.lines.forEach((line, idx) => {
        if (isPointInTextBounds(x, y, line)) {
            selectedLineIdx = idx
            isDragging = true
            dragStartX = x
            dragStartYs = y
        }
    })
    renderMeme()
}
function onTouchMove(x, y) {
    if (isDragging && selectedLineIdx !== -1) {
        const meme = getMeme()
        const selectedLine = meme.lines[selectedLineIdx]
        const deltaX = x - dragStartX
        const deltaY = y - dragStartYs

        selectedLine.x += deltaX
        selectedLine.y += deltaY

        dragStartX = x
        dragStartYs = y

        renderMeme()
    }
}
function onTouchEnd() {
    isDragging = false
}
function renderMeme() {
    gCtx.clearRect(0, 0, gElCanvas.width, gElCanvas.height)

    const meme = getMeme()
    const img = getImageById(meme.selectedImgId)

    if (img) {
        const image = new Image()
        image.onload = function () {
            gCtx.drawImage(image, 0, 0, gElCanvas.width, gElCanvas.height)

            meme.lines.forEach((line, idx) => {
                renderTextLine(line, idx === selectedLineIdx)
            })
        }
        image.src = img.url
    }
}
function renderTextLine(line, isSelected) {
    gCtx.font = `${line.size}px ${line.fontFamily}, Impact`
    gCtx.fillStyle = line.color
    gCtx.lineWidth = 2

    let x = line.x
    const textWidth = gCtx.measureText(line.txt).width


    if (line.align === 'left') {
        gCtx.textAlign = 'left'
        x = Math.max(0, line.x)
    } else if (line.align === 'right') {
        gCtx.textAlign = 'right'
        x = Math.min(gElCanvas.width, line.x)
    } else {
        gCtx.textAlign = 'center'
        if (x - textWidth / 2 < 0) x = textWidth / 2
        if (x + textWidth / 2 > gElCanvas.width) x = gElCanvas.width - textWidth / 2
    }

        gCtx.fillText(line.txt, x, line.y)
    
        

    if (isSelected) {
        const textHeight = line.size
        const framePadding = 5

        gCtx.strokeStyle = 'black'
        gCtx.beginPath()
        gCtx.rect(
            line.x - textWidth / 2 - framePadding,
            line.y - textHeight / 2 - framePadding,
            textWidth + framePadding * 2,
            textHeight + framePadding * 2
        )
        gCtx.stroke()
    }
}
function isPointInTextBounds(x, y, line) {
    gCtx.font = `${line.size}px ${line.fontFamily || 'Impact'}`
    const textWidth = gCtx.measureText(line.txt).width
    const textHeight = line.size
    const textX = line.x - textWidth / 2
    const textY = line.y - textHeight / 2

    return (
        x >= textX && x <= textX + textWidth &&
        y >= textY && y <= textY + textHeight
    )
}
function handleCanvasClick(event) {
    const canvasRect = gElCanvas.getBoundingClientRect()
    const mouseX = event.clientX - canvasRect.left
    const mouseY = event.clientY - canvasRect.top

    const meme = getMeme()
    meme.lines.forEach((line, idx) => {
        const textWidth = gCtx.measureText(line.txt).width
        const textHeight = line.size

        const textX = line.x - textWidth / 2
        const textY = line.y - textHeight / 2

        if (
            mouseX >= textX && mouseX <= textX + textWidth &&
            mouseY >= textY && mouseY <= textY + textHeight
        ) {
            meme.selectedLineIdx = idx
            renderMeme()
        }
    })
}
function handleMouseDown(event) {
    const mouseX = event.offsetX
    const mouseY = event.offsetY

    const meme = getMeme()
    const line = meme.lines.find((line, idx) => {
        const isWithinBounds = isPointInTextBounds(mouseX, mouseY, line)
        if (isWithinBounds) {
            selectedLineIdx = idx
            isDragging = true
            dragStartX = mouseX
            dragStartYs = mouseY
        }
        return isWithinBounds
    })

    if (!line) {
        selectedLineIdx = -1
        isDragging = false
    }
}
function handleMouseMove(event) {
    if (isDragging && selectedLineIdx !== -1) {
        const mouseX = event.offsetX
        const mouseY = event.offsetY

        const meme = getMeme()
        const selectedLine = meme.lines[selectedLineIdx]

        const deltaX = mouseX - dragStartX
        const deltaY = mouseY - dragStartYs

        selectedLine.x += deltaX
        selectedLine.y += deltaY

        dragStartX = mouseX
        dragStartYs = mouseY

        renderMeme()
    }
}
function handleMouseUp() {
    isDragging = false
}
function onTextInputChange(event) {
    const newText = event.target.value
    const meme = getMeme()

    if (selectedLineIdx !== -1 && selectedLineIdx < meme.lines.length) {
        setLineTxt(selectedLineIdx, newText)
        renderMeme()
    }
}
function onColorChange(event) {
    const newColor = event.target.value
    const meme = getMeme()

    if (selectedLineIdx !== -1 && selectedLineIdx < meme.lines.length) {
        meme.lines[selectedLineIdx].color = newColor
        renderMeme()
    }
}
function onIncreaseFont() {
    const meme = getMeme()
    if (selectedLineIdx !== -1 && selectedLineIdx < meme.lines.length) {
        meme.lines[selectedLineIdx].size += 2
        renderMeme()
    }
}
function onDecreaseFont() {
    const meme = getMeme()
    if (selectedLineIdx !== -1 && selectedLineIdx < meme.lines.length) {
        meme.lines[selectedLineIdx].size -= 2
        renderMeme()
    }
}
function addLineHandler() {
    addLine()
    selectedLineIdx = getMeme().lines.length - 1
    document.querySelectorAll('.text-input').forEach(input => input.value = '')
    renderMeme()
}
function switchLineHandler() {
    const meme = getMeme()
    if (meme.lines.length === 0) return

    selectedLineIdx++
    if (selectedLineIdx >= meme.lines.length) {
        selectedLineIdx = 0
    }
    
    renderMeme()
}
function onTextAlignment(alignment) {
    const meme = getMeme()

    if (selectedLineIdx !== -1 && selectedLineIdx < meme.lines.length) {
        meme.lines[selectedLineIdx].align = alignment
        renderMeme()
    }
}
function onFontFamilyChange() {
    const selectedFont = document.querySelector(".fontFamilySelect").value
    const meme = getMeme()

    if (selectedLineIdx !== -1 && selectedLineIdx < meme.lines.length) {
        meme.lines[selectedLineIdx].fontFamily = selectedFont


        gCtx.font = `${meme.lines[selectedLineIdx].size}px ${meme.lines[selectedLineIdx].fontFamily}, Impact`

        renderMeme()
    }
}
function onDownloadCanvas() {
    const link = document.createElement('a')
    link.download = 'canvas_image.png'
    link.href = gElCanvas.toDataURL('image/png')
    link.click()
}
function onDeleteLine() {
    const meme = getMeme()
    const selectedLineIdx = meme.selectedLineIdx
    if (selectedLineIdx >= 0 && selectedLineIdx < meme.lines.length) {
        meme.lines.splice(selectedLineIdx, 1)
        meme.selectedLineIdx = 0

        renderMeme()
    }
}
function onSearchIMG() {
    const searchTerm = document.getElementById('quicksearch').value.toLowerCase()
    handleGalleryFilter(searchTerm)
    renderGallery(gFilteredImgs)
}
function handleGalleryFilter(searchTerm) {
    gFilteredImgs = gImgs.filter(img =>
        img.keywords.some(keyword => keyword.toLowerCase().includes(searchTerm))
    )
}
function renderKeywords() {
    const datalist = document.getElementById('imgKeywords')
    if (!datalist) {
        console.error('Datalist element not found!')
        return
    }

    const uniqueKeywords = new Set()

    gImgs.forEach(img => {
        img.keywords.forEach(keyword => uniqueKeywords.add(keyword))
    })

    datalist.innerHTML = ''
    uniqueKeywords.forEach(keyword => {
        const option = document.createElement('option')
        option.value = keyword
        datalist.appendChild(option)
    })
}
function clearFilter() {
    document.getElementById('quicksearch').value = ''
    gFilteredImgs = [...gImgs]
    renderGallery(gFilteredImgs)
}
function closeCanvasContainer() {
    const gElCanvas = document.querySelector('.myCanvas')
    const gCtx = gElCanvas.getContext('2d')
    gCtx.clearRect(0, 0, gElCanvas.width, gElCanvas.height)
    const meme = getMeme()
    meme.lines = []
    meme.selectedLineIdx = -1
    renderMeme()
    document.querySelectorAll('.text-input').forEach(input => input.value = '')
    const canvasContainer = document.querySelector('.canvas-container')
    canvasContainer.style.display = 'none'
}
function generateRandomMeme() {
    const randomImgIdx = Math.floor(Math.random() * gImgs.length)
    const randomImgId = gImgs[randomImgIdx].id

    setSelectedImg(randomImgId)

    const meme = getMeme()
    meme.lines = [{
        txt:  createRandomString(getRandomInt(3, 12)),
        size: getRandomInt(20, 40),
        color: getRandomColor(),
        fontFamily: getRandomFont(),
        x: gElCanvas.width / 2,
        y: gElCanvas.height / 2,
        ...getRandomPosition(gElCanvas.width, gElCanvas.height)
    }]

    renderMeme()
    document.querySelector('.canvas-container').style.display = 'block'
    generatedMeme = meme

}
function onSaveMeme() {
    const meme = getMeme()
    if (meme && meme.selectedImgId) {
        const memeKey = `meme-${meme.selectedImgId}`
    }
}
function saveToStorage(key, value) {
    const valueStr = JSON.stringify(value)
    localStorage.setItem(key, valueStr)
}
function loadFromStorage(key) {
    const valueStr = localStorage.getItem(key)
    if (valueStr) {
        return JSON.parse(valueStr)
    }
    return null
}
function addEmojiSticker(emoji) {
    const meme = getMeme()
    const newSticker = {
        txt: emoji,
        size: 30,
        x: gElCanvas.width / 2,
        y: gElCanvas.height / 2,
    }
    meme.lines.push(newSticker)
    renderMeme()
}



