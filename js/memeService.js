var gImgs = [
    { id: 1, url: 'meme-imgs/meme-imgs (square)/1.jpg', keywords: ['funny', 'cat'] },
    { id: 2, url: 'meme-imgs/meme-imgs (square)/2.jpg', keywords: ['funny', 'dog'] },
    { id: 3, url: 'meme-imgs/meme-imgs (square)/3.jpg', keywords: ['baby', 'happy'] },
    { id: 4, url: 'meme-imgs/meme-imgs (square)/4.jpg', keywords: ['cat', 'cute'] },
    { id: 5, url: 'meme-imgs/meme-imgs (square)/5.jpg', keywords: ['baby', 'cute'] },
    { id: 6, url: 'meme-imgs/meme-imgs (square)/6.jpg', keywords: ['funny', 'happy'] },
    { id: 7, url: 'meme-imgs/meme-imgs (square)/7.jpg', keywords: ['baby', 'happy'] },
    { id: 8, url: 'meme-imgs/meme-imgs (square)/8.jpg', keywords: ['baby', 'happy'] },
    { id: 9, url: 'meme-imgs/meme-imgs (square)/9.jpg', keywords: ['funny', 'happy'] },
    { id: 10, url: 'meme-imgs/meme-imgs (square)/10.jpg', keywords: ['baby', 'funny'] },
    { id: 11, url: 'meme-imgs/meme-imgs (square)/11.jpg', keywords: ['funny', 'happy'] },
    { id: 12, url: 'meme-imgs/meme-imgs (square)/12.jpg', keywords: ['serious','dog'] },
    { id: 13, url: 'meme-imgs/meme-imgs (square)/13.jpg', keywords: ['serious', 'happy'] },
    { id: 14, url: 'meme-imgs/meme-imgs (square)/14.jpg', keywords: ['baby', 'happy'] },
    { id: 15, url: 'meme-imgs/meme-imgs (square)/15.jpg', keywords: ['serious', 'sad'] },
    { id: 16, url: 'meme-imgs/meme-imgs (square)/16.jpg', keywords: ['serious', 'happy'] },
    { id: 17, url: 'meme-imgs/meme-imgs (square)/17.jpg', keywords: ['funny', 'happy'] },
    { id: 18, url: 'meme-imgs/meme-imgs (square)/18.jpg', keywords: ['funny', 'happy'] },
    { id: 19, url: 'meme-imgs/meme-imgs (various aspect ratios)/2.jpg', keywords: ['funny', 'happy'] },
    { id: 20, url: 'meme-imgs/meme-imgs (various aspect ratios)/19.jpg', keywords: ['funny', 'dog'] },
    { id: 21, url: 'meme-imgs/meme-imgs (various aspect ratios)/img4.jpg', keywords: ['cat', 'funny'] },
    { id: 22, url: 'meme-imgs/meme-imgs (various aspect ratios)/drevil.jpg', keywords: ['baby', 'happy'] },
    { id: 24, url: 'meme-imgs/meme-imgs (various aspect ratios)/img6.jpg', keywords: ['baby', 'dog'] },
    { id: 25, url: 'meme-imgs/meme-imgs (square)/o4n49.jpg', keywords: ['baby', 'dog'] },
    { id: 26, url: 'meme-imgs/meme-imgs (square)/1heuxv.jpg', keywords: ['baby', 'dog'] },
    { id: 27, url: 'meme-imgs/meme-imgs (square)/ybuzd.jpg', keywords: ['baby', 'dog'] },
    { id: 28, url: 'meme-imgs/meme-imgs (square)/Smart-nibba-meme-9.jpg', keywords: ['baby', 'dog'] },
    { id: 29, url: 'meme-imgs/meme-imgs (square)/Mdc6m5sM_400x400.jpg', keywords: ['baby', 'dog'] },
]
var gMeme = {
    selectedImgId: null,
    selectedLineIdx: 0,
    lines: [
        { txt:'', size: 20, color: 'white', x: 0, y: 130, width: 0, height: 0 },
    ]
}

function getMeme() {
    return gMeme
}

function setLineTxt(lineIdx, newText) {
    if (gMeme.lines[lineIdx]) {
        gMeme.lines[lineIdx].txt = newText
    }
}


function addLine() {
    gMeme.lines.push({ txt: '', size: 20, stroke: 'black', x: 200, y: 150, width: 0, height: 0 })
}

function switchLine() {
    const numLines = gMeme.lines.length
    if (numLines > 1) {
        gMeme.selectedLineIdx = (gMeme.selectedLineIdx + 1) % numLines
        renderMeme()
    }
}

function getImageById(imgId) {
    return gImgs.find(img => img.id === imgId)
}

function setSelectedImg(imgId) {
    gMeme.selectedImgId = imgId
}
function addImgToGallery(newImg) {
    gImgs.push(newImg)
}

