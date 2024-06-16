
function renderGallery(images) {
    const gallerySection = document.querySelector('.gallery')
    gallerySection.innerHTML = ''

    images.forEach(img => {
        const imgElement = document.createElement('img')
        imgElement.src = img.url
        imgElement.alt = img.id
        imgElement.addEventListener('click', () => onImgSelect(img.id))
        gallerySection.appendChild(imgElement)
    })
}

function onImgSelect(imgId) {
    setSelectedImg(imgId)
    renderMeme()
    document.querySelector('.canvas-container').style.display = 'block'
}

