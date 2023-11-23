import { useEffect, useState } from "react";
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import Model from '/@/components/ThreeJS/Model';
import { getPoints } from '/@/components/ThreeJS/apis';
import { Vector3 } from 'three';
// import { useControls } from 'leva';

const ThreeJsCanvas = () => {
    // const { position } = useControls("Camera", { position: { x: 0, y: 0, z: 0 } });
    // const { color } = useControls("Mesh", { color: '#ffffff' });
    const [color, setColor] = '#ffffff';
    // red green blue
    const [cameraPosition, setCameraPosition] = useState<number[]>([0, 0, 12000]);
    const [points, setPoints] = useState<any>({});

    const fetchData = async () => {
        const pointsFull = await getPoints();
        setPoints({
            ...points,
            0: pointsFull,
        });
    }

    useEffect(() => {
        fetchData();
    }, []);
    
    return (
        <div>
            {/* <InputNumber defaultValue={cameraPosition[0]} onChange={(value) => {setCameraPosition([value ?? 0, cameraPosition[1], cameraPosition[2]])}} />
            <InputNumber defaultValue={cameraPosition[1]} onChange={(value) => {setCameraPosition([cameraPosition[0], value ?? 0, cameraPosition[2]])}} />
            <InputNumber defaultValue={cameraPosition[2]} onChange={(value) => {setCameraPosition([cameraPosition[0], cameraPosition[1], value ?? 0])}} /> */}
            {/* {JSON.stringify(position)} */}
            <Canvas
                style={{ width: '100%', height: '30rem' }}
                camera={{ 
                    fov: 90, 
                    near: 0.1, 
                    far: 100000, 
                    position: new Vector3(...cameraPosition), 
                    // position: new Vector3(position?.x ?? 0, position?.y ?? 0, position?.z ?? 12000), 
                    // left: -6000,
                    // right: 6000,
                    // top: 6000,
                    // bottom: -6000,
                    // zoom: 1,
                }}
                // orthographic
            >
                
                    <ambientLight />
                    <directionalLight position={[10000, 10000, 10000]} />
                    {/* <pointLight position={new Vector3(...cameraPosition)} /> */}
                    {/* <Box position={[-1.2, 0, 0]} /> */}
                    {/* <Box position={[1.2, 0, 0]} /> */}
                    <OrbitControls makeDefault />
                    <Model position={[0, 0, 0]} points={points['0']} color={color} scale={1.25} />
                
            </Canvas>
        </div>
    )
};

export default ThreeJsCanvas;