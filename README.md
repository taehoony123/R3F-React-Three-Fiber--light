# R3F-React-Three-Fiber--light


#추가적으로

import { Environment, OrbitControls, useHelper} from "@react-three/drei"
import { useFrame, useThree } from "@react-three/fiber"
import { useEffect, useRef } from "react"
import * as THREE from "three"
import { RectAreaLightUniformLib } from "three/examples/jsm/lights/RectAreaLightUniformsLib"
import { RectAreaLightHelper } from "three/examples/jsm/helpers/RectAreaLightHelper"


const torusGeometry = new THREE.TorusGeometry(0.4,0.1,32,32)
const torusMaterial = new THREE.MeshStandardMaterial({
    color: "#9b59b6",
    roughness: 0.5,
    metalness: 0.9
})



function MyElement3D() {
    useFrame((state) => {
        const time = state.clock.elapsedTime
        const smallSpherePivot = state.scene.getObjectByName("smallSpherePivot")
        smallSpherePivot.rotation.y = THREE.MathUtils.degToRad(time * 50)
        
    })


    //<ambientLight color="#ffffff" intensity={5} />
    //<hemisphereLight args = {["#00f", "#f00",2]} />
    //<directionalLight color={0xfffff} intensity ={1} position{[0,5,0]}
    return (
        <>
            <OrbitControls />

            <Environment
                background
                files = {"./images/citrus_orchard_4k.hdr"}
            />
            <mesh rotation-x = {THREE.MathUtils.degToRad(-90)}>
                <PlaneGeometry arg= {[10,10]} />
                <meshStandardMaterial
                    color="#2c3e50"
                    roughness={0.5}
                    metalness={0.5}
                    side={THREE.DoubleSide}
                />
            </mesh>

            <mesh rotation-x = {THREE.MathUtils.degToRad(-90)}>
                <sphereGeometry args = {[1.5, 64,64,0,Math.PI]} />
                <meshStandardMaterial
                    color="#ffffff"
                    roughness={0.1}
                    metalness={0.2}
                />
            </mesh>

            {new Array(8).fill().map((item,index)=> {
                return (
                    <group key={index} rotation-y = {THREE.MathUtils.degToRad(45 * index)}>
                        <mesh
                            geometry={torusGeometry}
                            material={torusMaterial}
                            position={[3,0.5,0]}
                        />
                    </group>
                )
            })}

            <group name = "smallSpherePivot">
                <mesh position={[3,0.5,0]}>
                    <sphereGeometry args = {[0.3,32,32]}/>
                    <meshStandardMaterial
                        color="#e74c3c"
                        roughness={0.2}
                        metalness={0.5}
                    />
                </mesh>
            </group>
            

        </>
    )
}

export default MyElement3D
