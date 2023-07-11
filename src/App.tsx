import {Canvas} from "@react-three/fiber";
import {OrbitControls, PerspectiveCamera} from "@react-three/drei";
import {useEffect, useState} from "react";
import {ApiHistory, history, } from "@buerli.io/headless";
import {init, SocketIOClient} from "@buerli.io/classcad";
import styled from "styled-components";
import {BuerliGeometry, useBuerli} from "@buerli.io/react";
import { GraphicType } from "@buerli.io/core"

const StyledDiv = styled.div`
  width: 100vw;
  height: 100vh;

  display: flex;
  flex-direction: column;
`

init((id) => new SocketIOClient('ws://localhost:8081', id), {
    config: {geometry: {points: {hidden: true}, edges: {color: 'black'}}},
})

// noinspection JSPotentiallyInvalidConstructorUsage
const cad = new history()

function App() {
    const [api, setApi] = useState<ApiHistory>()
    const drawing = useBuerli(state => state.drawing)

    useEffect(() => {
        cad.init(async api => {
            // const buffer=await fetch("/RobotCellAssembly.ofb").then(r=>r.arrayBuffer())
            const buffer=await fetch("/Ventil.stp").then(r=>r.arrayBuffer())
            await api.load(buffer, "stp")

            setApi(api)
        })
    }, [])

    async function do_find() {
        const info = await api!.selectGeometry([GraphicType.POINT, GraphicType.PLANE])
        console.log("info", info)
    }

    if ( !drawing.active ) {
        return null
    }

    return (
        <StyledDiv>
            <div className="controls">
                <button onClick={do_find}>Find</button>
            </div>
            <Canvas>
                <ambientLight/>
                <PerspectiveCamera makeDefault position={[50,-200,100]} />
                <OrbitControls makeDefault/>
                <BuerliGeometry drawingId={drawing.active}/>
            </Canvas>
        </StyledDiv>
    )
}

export default App
