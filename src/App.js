import { createRef, useEffect, useLayoutEffect, useState } from 'react';
import './App.css';
import Input from './Input';
import FromTopCanvas from './canvas/FromTop';
import FromRightCanvas from './canvas/FromRight';
import Projection from './canvas/Projection';
import GithubCorner from "react-github-corner";

function App() {
  let [c1Size, setC1Size] = useState({ width: 0, height: 0 })
  let [c2Size, setC2Size] = useState({ width: 0, height: 0 })
  let [c3Size, setC3Size] = useState({ width: 0, height: 0 })
  let canvas1 = createRef()
  let canvas2 = createRef()
  let canvas3 = createRef()
  let [tx, setTX] = useState(0)
  let [ty, setTY] = useState(0)
  let [tz, setTZ] = useState(133)
  let [rx, setRx] = useState(0)
  let [ry, setRy] = useState(35)
  let [rz, setRz] = useState(0)
  let [sx, setSx] = useState(31)
  let [sy, setSy] = useState(31)
  let [sz, setSz] = useState(31)
  let [fieldOfView, setFieldOfView] = useState(45)
  let [near, setNear] = useState(50)

  const origin = [
    [new Point(-1, -1, -1), new Point(-1, 1, -1), new Point(1, 1, -1), new Point(1, -1, -1)], //front
    [new Point(-1, -1, 1), new Point(-1, 1, 1), new Point(1, 1, 1), new Point(1, -1, 1)], //front
    [new Point(1, -1, -1), new Point(1, 1, -1), new Point(1, 1, 1), new Point(1, -1, 1)], //right
    [new Point(-1, -1, -1), new Point(-1, 1, -1), new Point(-1, 1, 1), new Point(-1, -1, 1)], //left
    [new Point(-1, 1, -1), new Point(-1, 1, 1), new Point(1, 1, 1), new Point(1, 1, -1)], //top
    [new Point(-1, -1, -1), new Point(-1, -1, 1), new Point(1, -1, 1), new Point(1, -1, -1)], //bottom
  ]

  let [obj, setObj] = useState([...origin])

  useLayoutEffect(() => {
    if (c1Size.width == 0 || c2Size.width == 0) {
      if (canvas1.current) {
        setC1Size([canvas1.current.offsetWidth, canvas1.current.offsetHeight])
      }
      if (canvas2.current) {
        setC2Size([canvas2.current.offsetWidth, canvas2.current.offsetHeight])
      }
      if (canvas3.current) {
        setC3Size([canvas3.current.offsetWidth, canvas3.current.offsetHeight])
      }
      applyTransform()
    }
  })

  const applyTransform = () => {
    let copy = [...origin]
    scaleX(copy, sx)
    scaleY(copy, sy)
    scaleZ(copy, sz)
    rotateX(copy, Math.radians(rx))
    rotateY(copy, Math.radians(ry))
    rotateZ(copy, Math.radians(rz))
    translateX(copy, tx)
    translateY(copy, ty)
    translateZ(copy, tz)
    setObj(copy)
  }

  return (
    <div className='container'>
      <GithubCorner href="https://github.com/mhssn95/3d-website" bannerColor={"#64ceaa"} />
      <div className='col1'>
        <p className='title'>From Top</p>
        <div ref={canvas1} className='canvas'>
          <FromTopCanvas parentSize={c1Size} pov={fieldOfView} near={near} obj={obj} />
        </div>
      </div>
      <div className='col2'>
        <p className='title' >From Right</p>
        <div ref={canvas2} className='from_right canvas'>
          <FromRightCanvas parentSize={c2Size} pov={fieldOfView} near={near} obj={obj} />
        </div>
        <p className='title' >prespective projection</p>
        <div className='prespective canvas'>
          <Projection parentSize={c2Size} pov={fieldOfView} near={near} obj={obj} />
        </div>
      </div>
      <div className='col3'>
        <p className='title' >transformations</p>
        <div className='canvas'>
          <Input title="scale X" value={sx} onChanged={
            (v) => {
              setSx(parseInt(v))
              applyTransform()
            }
          }></Input>
          <Input title="scale Y" value={sy} onChanged={
            (v) => {
              setSy(parseInt(v))
              applyTransform()
            }
          }></Input>
          <Input title="scale Z" value={sz} onChanged={
            (v) => {
              setSz(parseInt(v))
              applyTransform()
            }
          }></Input>
          <Input title="Translate X" value={tx} onChanged={
            (v) => {
              setTX(parseInt(v))
              applyTransform()
            }
          }></Input>
          <Input title="Translate Y" value={ty} onChanged={
            (v) => {
              setTY(parseInt(v))
              applyTransform()
            }
          }></Input>
          <Input title="Translate Z" value={tz} onChanged={
            (v) => {
              setTZ(parseInt(v))
              applyTransform()
            }
          }></Input>
          <Input title="Rotate X" value={rx} onChanged={
            (v) => {
              setRx(parseInt(v))
              console.log(v)
              applyTransform()
            }
          }></Input>
          <Input title="Rotate Y" value={ry} onChanged={
            (v) => {
              setRy(parseInt(v))
              applyTransform()
            }
          }></Input>
          <Input title="Rotate Z" value={rz} onChanged={
            (v) => {
              setRz(parseInt(v))
              applyTransform()
            }
          }></Input>
          <Input title="Field of view" value={fieldOfView} onChanged={
            (v) => {
              setFieldOfView(parseInt(v))
            }
          }></Input>
          <Input title="Near" value={near} onChanged={
            (v) => {
              setNear(parseInt(v))
            }
          }></Input>
        </div>
      </div>
    </div>
  );
}

export default App;

function rotateX(obj, angle) {
  obj.forEach(element => {
    element.forEach(point => {
      let y = point.y * Math.cos(angle) + point.z * -Math.sin(angle)
      let z = point.y * Math.sin(angle) + point.z * Math.cos(angle)
      point.y = y
      point.z = z
    })
  });
}

function rotateY(obj, angle) {
  obj.forEach(element => {
    element.forEach(point => {
      let x = point.x * Math.cos(angle) + point.z * Math.sin(angle)
      let z = point.x * -Math.sin(angle) + point.z * Math.cos(angle)
      point.x = x
      point.z = z
    })
  })
}

function rotateZ(obj, angle) {
  obj.forEach(element => {
    element.forEach(point => {
      let x = point.x * Math.cos(angle) + point.y * -Math.sin(angle)
      let y = point.x * Math.sin(angle) + point.y * Math.cos(angle)
      point.x = x
      point.y = y
    })
  })
}

function scaleX(obj, scale) {
  obj.forEach(element => {
    element.forEach(point => {
      point.x = point.x * scale
    })
  })
}

function scaleY(obj, scale) {
  obj.forEach(element => {
    element.forEach(point => {
      point.y = point.y * scale
    })
  })
}

function scaleZ(obj, scale) {
  obj.forEach(element => {
    element.forEach(point => {
      point.z = point.z * scale
    })
  })
}

function translateX(obj, x) {
  obj.forEach(element => {
    element.forEach(point => {
      point.x += x
    })
  })
}

function translateY(obj, y) {
  obj.forEach(element => {
    element.forEach(point => {
      point.y += y
    })
  })
}

function translateZ(obj, z) {
  obj.forEach(element => {
    element.forEach(point => {
      point.z += z
    })
  });
}

class Point {
  constructor(x, y, z) {
    this.x = x;
    this.y = y;
    this.z = z;
  }
}

function copy(obj) {
  let copy = []
  obj.element.forEach(element => {
    let e = []
    element.forEach(point => {
      e.push(point)
    })
    copy.push(e)
  })
  return copy
}

Math.radians = function (degrees) {
  return degrees * Math.PI / 180;
}