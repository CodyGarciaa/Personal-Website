import { Html, useMask } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import DL_bio from "./DL_bio";


export default function DL_helper( ...props ) {
    
    const stencil = useMask(1);
    const group = useRef();

    return(
        <>
            <mesh>
                <planeGeometry>
                    <Html>
                        <DL_bio />
                    </Html>
                </planeGeometry>
                <meshNormalMaterial { ...stencil } />
            </mesh>
        </>
    );
};