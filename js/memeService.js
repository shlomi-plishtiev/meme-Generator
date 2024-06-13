
var gImgs = [
    { id: 1, url: 'meme-imgs/meme-imgs (square)/1.jpg', keywords: ['funny', 'cat'] },
    { id: 2, url: 'meme-imgs/meme-imgs (square)/2.jpg', keywords: ['funny', 'dog'] },
    { id: 3, url: 'meme-imgs/meme-imgs (square)/3.jpg', keywords: ['baby', 'happy'] },
    { id: 4, url: 'meme-imgs/meme-imgs (square)/4.jpg', keywords: ['baby', 'happy'] },
    { id: 5, url: 'meme-imgs/meme-imgs (square)/5.jpg', keywords: ['baby', 'happy'] },
    { id: 6, url: 'meme-imgs/meme-imgs (square)/6.jpg', keywords: ['baby', 'happy'] },
    { id: 7, url: 'meme-imgs/meme-imgs (square)/7.jpg', keywords: ['baby', 'happy'] },
    { id: 8, url: 'meme-imgs/meme-imgs (square)/8.jpg', keywords: ['baby', 'happy'] },
    { id: 9, url: 'meme-imgs/meme-imgs (square)/9.jpg', keywords: ['baby', 'happy'] },
    { id: 10, url: 'meme-imgs/meme-imgs (square)/10.jpg', keywords: ['baby', 'happy'] },
    { id: 11, url: 'meme-imgs/meme-imgs (square)/11.jpg', keywords: ['baby', 'happy'] },
    { id: 12, url: 'meme-imgs/meme-imgs (square)/12.jpg', keywords: ['baby', 'happy'] },
    { i: 13, url: 'meme-imgs/meme-imgs (square)/13.jpg', keywords: ['baby', 'happy'] },
    { d: 14, url: 'meme-imgs/meme-imgs (square)/14.jpg', keywords: ['baby', 'happy'] },
    { id: 15, url: 'meme-imgs/meme-imgs (square)/15.jpg', keywords: ['baby', 'happy'] },
]

var gMeme = {
    selectedImgId: null,
    selectedLineIdx: 0,
    lines: [
        { txt: '', size: 20, color: 'black', x: 0, y: 50 },
        { txt: '', size: 20, color: 'blue', x: 0, y: 200 } 

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
    const newLine = { txt: '', size: 20, color: 'black', x: 0, y: 150 }
    gMeme.lines.push(newLine)
    gMeme.selectedLineIdx = gMeme.lines.length - 1
    renderMeme()
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

export { getMeme, setLineTxt, getImageById, setSelectedImg, gImgs, addLine }
