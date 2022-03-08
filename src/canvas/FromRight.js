import React, { useRef, useEffect } from 'react'

export default function FromRightCanvas(props) {
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
        ctx.moveTo(0, height/2)
        ctx.lineTo(width, height/2)
        ctx.moveTo(width / 2, 0)
        ctx.lineTo(width / 2, height)
        ctx.stroke()
        ctx.font = "15px Comic Sans MS";
        ctx.fillStyle = "#000000"
        ctx.fillText("Z", width/2 + 200, height/2 + 20)
        ctx.fillText("Y", width/2 - 20, height/2 - 80)
        ctx.fill()

        props.obj.forEach(element => {
            element.forEach(point => {
                ctx.beginPath()
                ctx.fillStyle = "#FF0000"    
                ctx.arc(50 + point.z, height/2 - point.y, 2, 0, 2 * Math.PI, false)
                ctx.fill()
                ctx.beginPath()
                ctx.strokeStyle = "#ff0000"
                ctx.lineWidth = 0.2
                ctx.moveTo(50 + point.z, height/2 - point.y)
                ctx.lineTo(50, height/2)
                ctx.stroke()    
            })
        });

        ctx.strokeStyle = "#000000"
        props.obj.forEach(element => {
            ctx.beginPath()
            ctx.moveTo(50 + element[0].z, height /2 - element[0].y)
            element.slice(1).forEach(point => {
                ctx.lineTo(50 + point.z, height/2 -point.y)
            })
            ctx.closePath()
            ctx.stroke()
        })

        ctx.beginPath()
        ctx.strokeStyle = "#7AB45E"
        ctx.lineWidth = 5
        let [x, y] = getLineEnd(0, 0, 1500, Math.radians(-(props.pov) / 2))
        ctx.moveTo(x + 50,y + height/2)
        ctx.lineTo(50, height/2)
        ctx.lineTo(x + 50, -y + height/2)
        ctx.stroke()

        ctx.beginPath()
        ctx.strokeStyle = "#000000"
        ctx.lineWidth = 1
        ctx.moveTo(0 + 50 + props.near, 0)
        ctx.lineTo(0 + 50 + props.near, height)
        ctx.stroke()

        ctx.beginPath()
        ctx.strokeStyle = "#7AB45E"
        ctx.fillStyle = "#ECECEC"
        ctx.lineWidth = 5
        ctx.moveTo(x + 50,y + height/2)
        ctx.lineTo(50, height/2)
        ctx.lineTo(x + 50, -y + height/2)
        ctx.lineTo(width, height)
        ctx.lineTo(0, height)
        ctx.lineTo(0, 0)
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