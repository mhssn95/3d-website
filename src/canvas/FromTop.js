import React, { useRef, useEffect } from 'react'

export default function FromTopCanvas(props) {
    const canvasRef = useRef(null)
    const width = props.parentSize[0]
    const height = props.parentSize[1]
    const obj = props.obj

    const draw = ctx => {
        let width = ctx.canvas.width
        let height = ctx.canvas.height
        ctx.clearRect(0, 0, width, height)
        ctx.beginPath()
        ctx.fillStyle = '#ECECEC'
        ctx.lineWidth = 0.5
        ctx.moveTo(width / 2, 0)
        ctx.lineTo(width / 2, height)
        ctx.stroke()
        ctx.beginPath()
        ctx.moveTo(0, height/2)
        ctx.lineTo(width, height/2)
        ctx.stroke()
        ctx.font = "15px Comic Sans MS";
        ctx.fillStyle = "#000000"
        ctx.fillText("X", width/2 + 70, height/2 + 20)
        ctx.fillText("Z", width/2 - 20, height/2 - 180)
        ctx.fill()

        props.obj.forEach(element => {
            element.forEach(point => {
                ctx.beginPath()
                ctx.fillStyle = "#FF0000"
                ctx.arc(point.x + width/2, height - 50 - point.z, 2, 0, 2 * Math.PI, false)
                ctx.fill()
                ctx.beginPath()
                ctx.strokeStyle = "#ff0000"
                ctx.lineWidth = 0.2
                ctx.moveTo(point.x + width/2, height - 50 - point.z)
                ctx.lineTo(width / 2, height - 50)
                ctx.stroke()
            })
        });

        ctx.strokeStyle = "#000000"
        props.obj.forEach(element => {
            ctx.beginPath()
            ctx.moveTo(element[0].x + width/2, height - 50 - element[0].z)
            element.slice(1).forEach(point => {
                ctx.lineTo(point.x + width/2, height - 50 - point.z)
            })
            ctx.closePath()
            ctx.stroke()
        })

        ctx.beginPath()
        ctx.strokeStyle = "#7AB45E"
        ctx.lineWidth = 5
        let [x, y] = getLineEnd(0, 0, 1500, Math.radians(-(180 - props.pov) / 2))
        ctx.moveTo(x + width / 2, height - 50 + y)
        ctx.lineTo(width / 2, height - 50)
        ctx.lineTo(-x + width / 2, height - 50 + y)
        ctx.stroke()

        ctx.beginPath()
        ctx.strokeStyle = "#000000"
        ctx.lineWidth = 1
        ctx.moveTo(0, height - 50 - props.near)
        ctx.lineTo(width, height - 50 - props.near)
        ctx.stroke()

        ctx.beginPath()
        ctx.strokeStyle = "#7AB45E"
        ctx.fillStyle = "#ECECEC"
        ctx.lineWidth = 5
        ctx.moveTo(x + width / 2, height - 50 + y)
        ctx.lineTo(width / 2, height - 50)
        ctx.lineTo(-x + width / 2, height - 50 + y)
        ctx.lineTo(0, 0)
        ctx.lineTo(0, height)
        ctx.lineTo(width, height)
        ctx.lineTo(width, 0)
        ctx.fill()
    }

    useEffect(() => {
        const canvas = canvasRef.current
        const context = canvas.getContext('2d')
        draw(context)
    })

    return (
        <canvas ref={canvasRef} width={width} height={height}></canvas>
    )
}

function getLineEnd(x, y, length, angle) {
    return [x + length * Math.cos(angle), y + length * Math.sin(angle)]
}