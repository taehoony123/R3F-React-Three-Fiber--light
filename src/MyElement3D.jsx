import { OrbitControls, useHelper} from "@react-three/drei"
import { useFrame, useThree } from "@react-three/fiber"
import { useEffect, useRef } from "react"
import * as THREE from "three"


const torusGeometry = new THREE.TorusGeometry(0.4,0.1,32,32)
const torusMaterial = new THREE.MeshStandardMaterial({
    color: "#9b59b6",
    roughness: 0.5,
    metalness: 0.9
})

function MyElement3D() {
    useFrame(() => {
        const time = state.clock.elapsedTime
        const smallSpherePivot = state.scene.getObjectByName("smallSpherePivot")
        smallSpherePivot.rotation.y = THREE.MathUtils.degToRad(time * 50)
        smallSpherePivot.children[0].getWorldPosition(light.current.target)
    })

    const light = useRef()

    useHelper(light, THREE.DirectionalLightHelper)

    const { scene } = useThree()

    useEffect(() => {
        scene.add(light.current.target)
        return () => {
            scene.remove(light.current.target)
        }
    }, [light])


    //<ambientLight color="#ffffff" intensity={5} />
    //<hemisphereLight args = {["#00f", "#f00",2]} />
    //<directionalLight color={0xfffff} intensity ={1} position{[0,5,0]}
    return (
        <>
            <OrbitControls />

            <directionalLight
                ref={light}
                color={0xfffff}
                intensity ={1}
                position={[0,5,0]}
                target-position={[1,0,0]}
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