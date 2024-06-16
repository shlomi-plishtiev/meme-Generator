function onImgInput(ev) {
    loadImageFromInput(ev, renderImg)
}
function loadImageFromInput(ev, onImageReady) {
    const reader = new FileReader()
    reader.onload = function (event) {
        const elImg = new Image()
        elImg.onload = () => {
            onImageReady(elImg)

            const newImg = {
                id: gImgs.length + 1, 
                url: elImg.src,
                keywords: [] 
            }
            addImgToGallery(newImg) 

            setSelectedImg(newImg.id)
            renderMeme() 
            document.querySelector('.canvas-container').style.display = 'block'
        }
        elImg.src = event.target.result
    }
    reader.readAsDataURL(ev.target.files[0])
}
function renderImg(elImg) {
    gCtx.clearRect(0, 0, gElCanvas.width, gElCanvas.height)
    gCtx.drawImage(elImg, 0, 0, gElCanvas.width, gElCanvas.height)
}