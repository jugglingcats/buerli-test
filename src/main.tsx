import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import "./main.css"
// @ts-ignore
import {BrepElemType, init, SocketIOClient} from '@buerli.io/classcad'
import {solid, history} from "@buerli.io/headless";
import * as THREE from "three"

// Set up threejs
// const scene = new THREE.Scene()
// const camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 0.1, 1000)
// camera.position.z = 10
//
// const renderer = new THREE.WebGLRenderer()
// renderer.setSize(window.innerWidth, window.innerHeight)
// document.body.appendChild(renderer.domElement)
//
// // Set up buerli, the URL is specific to how you configure the ClassCAD Server
// init((id) => new SocketIOClient('ws://localhost:8182', id))
// const cad = new history()
//
// cad.init(async api => {
//     const part = await api.createPart('part')
//     await api.box(part, [], 1, 1, 1)
//     const geoms = await api.createBufferGeometry(part)
//     const meshes = geoms!.map(
//         geom =>
//             new THREE.Mesh(
//                 geom,
//                 new THREE.MeshNormalMaterial()),
//     )
//     scene.add(...meshes)
//     renderer.render(scene, camera)
//
//     api.findOrSelect(part, BrepElemType.FACE, 0, null).finally(() => {
//         console.log("find done")
//     })
// })

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
