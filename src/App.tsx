import {Canvas} from "@react-three/fiber";
import {OrbitControls} from "@react-three/drei";
import {useEffect, useState} from "react";
import {ApiHistory, history} from "@buerli.io/headless";
import {BrepElemType, init, SocketIOClient} from "@buerli.io/classcad";
import styled from "styled-components";
import {BuerliGeometry, useBuerli} from "@buerli.io/react";

const StyledDiv = styled.div`
  width: 100vw;
  height: 100vh;

  display: flex;
  flex-direction: column;
`

init((id) => new SocketIOClient('ws://localhost:8081', id), {
    config: {geometry: {points: {hidden: true}, edges: {color: 'black'}}},
})
const cad = new history()

function App() {
    const [api, setApi] = useState<ApiHistory>()
    const [part, setPart] = useState<number | null>()
    const drawingId = useBuerli(state => state.drawing.active)

    // const scene=useRef<THREE.Scene>(new THREE.Scene())
    useEffect(() => {
        cad.init(async api => {
            const buffer=await fetch("/Ventil.stp").then(r=>r.arrayBuffer())
            const importedIds = await api.load(buffer, "stp")

            setApi(api)
            setPart(importedIds![0])
        })
    }, [])

    async function do_find() {
        if (!api || !part) {
            return
        }
        console.log("find on part", part)
        const ids=await api.findOrSelect(part, BrepElemType.EDGE, 1, null)
        const item=await api.getAssemblyNode(ids![0])
        console.log("after find", ids, item)
    }

    return (
        <StyledDiv>
            <div className="controls">
                <button onClick={do_find}>Find</button>
            </div>
            <Canvas>
                <ambientLight/>
                <OrbitControls makeDefault/>
                <group>{drawingId && <BuerliGeometry drawingId={drawingId}/>}</group>
                {/* <primitive object={scene.current}/> */}
            </Canvas>
        </StyledDiv>
    )
}

export default App
