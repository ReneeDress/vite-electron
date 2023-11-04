import { useFrame } from "@react-three/fiber";
import { useRef, useState } from "react";
import { Vector2 } from "three";

const Model = (props: any) => {
    const { points = [new Vector2(0, -0.5), new Vector2(0.5, 0), new Vector2(0, 0.5)] } = props;
    console.log(points);
    // This reference will give us direct access to the mesh
    const meshRef = useRef<any>(null);
    // Set up state for the hovered and active state
    const [hovered, setHover] = useState(false)
    const [active, setActive] = useState(false)
    // Subscribe this component to the render-loop, rotate the mesh every frame
    // useFrame((state, delta) => (meshRef.current.rotation.y += delta))


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
        scale={1}
        // onClick={(event: any) => setActive(!active)}
      >
        <axesHelper args={[500000]} />
        <boxGeometry args={[1, 1, 1]} />
        <latheGeometry args={[points]} />
        <meshStandardMaterial color={hovered ? 'hotpink' : 'orange'} />
      </mesh>
    )
};

export default Model;