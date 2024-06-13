// galleryController.js

import { setSelectedImg, gImgs } from './memeService.js'
import { renderMeme } from './main-controller.js'

function renderGallery() {
    const gallery = document.querySelector('.gallery')
    gallery.innerHTML = ''

    gImgs.forEach(img => {
        const imgElement = document.createElement('img')
        imgElement.src = img.url
        imgElement.classList.add('gallery-img')
        imgElement.onclick = () => onImgSelect(img.id)
        gallery.appendChild(imgElement)
    })
}

function onImgSelect(imgId) {
    setSelectedImg(imgId)
    renderMeme()
    document.querySelector('.canvas-container').style.display = 'block'
}

export { renderGallery }
