import {Canvas} from "@react-three/fiber";
import {OrbitControls} from "@react-three/drei";
import {useEffect, useRef, useState} from "react";
import {ApiHistory, history} from "@buerli.io/headless";
import {BrepElemType, init, SocketIOClient} from "@buerli.io/classcad";
import * as THREE from "three";
import styled from "styled-components";

const StyledDiv = styled.div`
  width: 100vw;
  height: 100vh;

  display: flex;
  flex-direction: column;
`

init((id) => new SocketIOClient('ws://localhost:8081', id))
const cad = new history()

function App() {
    const [api, setApi] = useState<ApiHistory>()
    const [part, setPart] = useState<number | null>()

    const scene=useRef<THREE.Scene>(new THREE.Scene())
    useEffect(() => {
        cad.init(async api => {
            const part = await api.createPart('part')
            await api.box(part, [], 1, 1, 1)
            const createdScene = await api.createScene(part)
            scene.current.copy(createdScene.scene)
            setApi(api)
            setPart(part)
        })
    }, [])

    function do_find() {
        if (!api || !part) {
            return
        }
        console.log("find on part", part)
        api.findOrSelect(part, BrepElemType.EDGE, 1, null).finally(() => {
            console.log("find done")
        })
    }

    return (
        <StyledDiv>
            <div className="controls">
                <button onClick={do_find}>Find</button>
            </div>
            <Canvas>
                <ambientLight/>
                <OrbitControls makeDefault/>

                <primitive object={scene.current}/>
            </Canvas>
        </StyledDiv>
    )
}

export default App
