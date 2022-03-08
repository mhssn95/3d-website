import { useRef, useEffect } from "react"
export default function Projection(props) {
    const width = props.parentSize[0]
    const height = props.parentSize[1]
    const pov = Math.radians(props.pov / 2)
    const near = props.near
    const obj = props.obj
    const a = width/height

    const canvasRef = useRef(null)
    const draw = ctx => {
        let width = ctx.canvas.width
        let height = ctx.canvas.height
        ctx.clearRect(0, 0, width, height)
        ctx.beginPath()
        ctx.strokeStyle = "#000000"
        obj.forEach(face => {
            let first = face[0]
            ctx.moveTo(a* near * first.x / first.z * (1/Math.tan(pov)) + width / 2, a * near * first.y / first.z * (1/Math.tan(pov)) + height / 2)
            face.slice(1).forEach(point => {
                ctx.lineTo(a*near * point.x / point.z * (1/Math.tan(pov)) + width / 2, a * near * point.y / point.z * (1/Math.tan(pov)) + height / 2)
            })
            ctx.closePath()
            ctx.stroke()
        });
    }

    useEffect(() => {
        const canvas = canvasRef.current
        const context = canvas.getContext('2d')
        draw(context)
    })

    return (<canvas ref={canvasRef} width={width} height={height}></canvas>)
}

Math.radians = function (degrees) {
    return degrees * Math.PI / 180;
}