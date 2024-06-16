function getRandomColor() {
    var letters = '0123456789ABCDEF'
    var color = '#'
    for (var i = 0; i < 6 ;i++) {
      color += letters[Math.floor(Math.random() * 16)]
    }
    return color
  }
  function createRandomString(length) {
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789"
    let result = ""
    const randomArray = new Uint8Array(length)
    crypto.getRandomValues(randomArray)
    randomArray.forEach((number) => {
      result += chars[number % chars.length]
    })
    return result
  }
  function getRandomInt(min, max) {
    const minCeiled = Math.ceil(min)
    const maxFloored = Math.floor(max)
    return Math.floor(Math.random() * (maxFloored - minCeiled) + minCeiled)
  }
const availableFonts = ['Arial', 'Helvetica', 'Times New Roman', 'Courier New', 'Verdana', 'Impact', 'Comic Sans MS']

function getRandomFont() {
    const randomIndex = Math.floor(Math.random() * availableFonts.length)
    return availableFonts[randomIndex]
}
function getRandomPosition(canvasWidth, canvasHeight) {
    const x = Math.random() * canvasWidth
    const y = Math.random() * canvasHeight
    return { x, y }
}

// ///shere in facebook///////

function onUploadImg() {
    if (!gElCanvas) {
        console.error('gElCanvas is not defined or accessible')
        return
    }

    const imgDataUrl = gElCanvas.toDataURL('image/jpeg')

    function onSuccess(uploadedImgUrl) {
        const url = encodeURIComponent(uploadedImgUrl)
        window.open(`https://www.facebook.com/sharer/sharer.php?u=${url}&t=${url}`)
    }

    doUploadImg(imgDataUrl, onSuccess)
}

function doUploadImg(imgDataUrl, onSuccess) {
    const formData = new FormData()
    formData.append('img', imgDataUrl)

    const XHR = new XMLHttpRequest()
    XHR.onreadystatechange = () => {
        if (XHR.readyState !== XMLHttpRequest.DONE) return
        if (XHR.status !== 200) return console.error('Error uploading image')
        const { responseText: url } = XHR

        console.log('Got back live url:', url)
        onSuccess(url)
    }
    XHR.onerror = (req, ev) => {
        console.error('Error connecting to server with request:', req, '\nGot response data:', ev)
    }
    XHR.open('POST', '//ca-upload.com/here/upload.php')
    XHR.send(formData)
}
