import { useFrame } from "@react-three/fiber";
import { useCubeTexture } from '@react-three/drei';
import { useRef, useState } from "react";
import { Vector2, SplineCurve } from "three";

const Model = (props: any) => {
    const { points = [new Vector2(0, -0.5), new Vector2(0.5, 0), new Vector2(0, 0.5)], color = '#ffffff', scale = 1, } = props;
    console.log(points, new SplineCurve(points));
    const curve = new SplineCurve(points);
    const newPoints = curve.getPoints(12000);
    const texture = useCubeTexture(
      ['px.png', 'nx.png', 'py.png', 'ny.png', 'pz.png', 'nz.png'],
      { path: 'Standard-Cube-Map/' }
    );
    // This reference will give us direct access to the mesh
    const meshRef = useRef<any>(null);
    // Set up state for the hovered and active state
    const [hovered, setHover] = useState(false)
    const [active, setActive] = useState(false)
    // Subscribe this component to the render-loop, rotate the mesh every frame
    useFrame((state, delta) => {
      console.log(state);
      meshRef.current.rotation.x += delta / 30
      meshRef.current.rotation.y += delta / 10
      meshRef.current.rotation.z += delta / 5
    })


    // const points: Vector2[] = [];
    // // const points: Vector2[] = [new Vector2(0, -0.5), new Vector2(0.5, 0), new Vector2(0, 0.5)];
    // for ( let i = 0; i < 10; i ++ ) {
    //     points.push(new Vector2(Math.sin( i * 0.2 ) * 10 + 5, ( i - 5 ) * 2));
    // }

    // Return view, these are regular three.js elements expressed in JSX
    return (
      <mesh
        {...props}
        ref={meshRef}
        scale={scale}
        // onClick={(event: any) => setActive(!active)}
        // onPointerOver={(event) => setHover(true)}
        // onPointerOut={(event) => setHover(false)}
      >
        <axesHelper args={[10000]} />
        
        {/* <boxGeometry args={[1, 1, 1]} /> */}
        <fog />
        <latheGeometry args={[newPoints, 60, 0, Math.PI * 2]} />
        <meshBasicMaterial color={color} envMap={texture} />
      </mesh>
    )
};

export default Model;