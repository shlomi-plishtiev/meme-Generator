const DrawingService = {
    draw(gCtx, shape, color, border, x, y) {
        gCtx.fillStyle = color
        gCtx.strokeStyle = border

        switch (shape) {
            case 'squares':
                this.drawRect(gCtx, x, y)
                break
            case 'circles':
                this.drawArc(gCtx, x, y)
                break
            case 'pencil':
                this.drawPencil(gCtx, x, y)
                break
        }
    },

    drawRect(gCtx, x, y) {
        gCtx.lineWidth = 2
        gCtx.beginPath()
        gCtx.rect(x, y, 30, 30)
        gCtx.fill()
        gCtx.stroke()
    },

    drawArc(gCtx, x, y) {
        gCtx.beginPath()
        gCtx.arc(x, y, 20, 0, 2 * Math.PI)
        gCtx.fill()
        gCtx.stroke()
    },

    drawPencil(gCtx, x, y) {
        gCtx.beginPath()
        gCtx.arc(x, y, 4, 4, 4 * Math.PI)
        gCtx.fillStyle = gCtx.strokeStyle 
        gCtx.fill()
        gCtx.stroke()
    },

    startDrawing(gCtx, ev, color, border) {
        const { offsetX, offsetY } = ev
        gCtx.beginPath()
        gCtx.fillStyle = color
        gCtx.strokeStyle = border
        gCtx.moveTo(offsetX, offsetY)
    }
}
