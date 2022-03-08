import { useEffect, useState } from "react"

export default function Input(props) {
    const handleChange = e =>{
        console.log(e.target.value)
        props.onChanged(e.target.value)
    }

    return (
        <div>
            <p style={{
                "marginTop":"8px"
            }}>{props.title}</p>
            <input style={{
                "width":"100%",
                "marginTop":"10px"
            }} value={props.value} onChange={handleChange} type={"number"}/>
        </div>
    )
}