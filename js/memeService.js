
var gImgs = [
    { id: 1, url: 'meme-imgs/meme-imgs (square)/1.jpg', keywords: ['funny', 'cat'] },
    { id: 2, url: 'meme-imgs/meme-imgs (square)/2.jpg', keywords: ['funny', 'dog'] },
    { id: 3, url: 'meme-imgs/meme-imgs (square)/3.jpg', keywords: ['baby', 'happy'] },
    { id: 4, url: 'meme-imgs/meme-imgs (square)/4.jpg', keywords: ['baby', 'happy'] },
]

var gMeme = {
    selectedImgId: null, 
    selectedLineIdx: 0, 
    lines: [
        {
            txt: 'I sometimes eat Falafel',
            size: 20,
            color: 'red'
        }
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

function getImageById(imgId) {
    return gImgs.find(img => img.id === imgId)
}

function setSelectedImg(imgId) {
    gMeme.selectedImgId = imgId
}
export { getMeme, setLineTxt, getImageById, setSelectedImg, gImgs }
