import { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";

function RingGroup() {
  const groupRef = useRef(null);
  const ring1 = useRef(null);
  const ring2 = useRef(null);
  const ring3 = useRef(null);

  useFrame((_state, delta) => {
    // Clamp delta so tab-switch catch-up doesn't cause a jump
    const d = Math.min(delta, 0.05);
    if (groupRef.current) groupRef.current.rotation.y += d * 0.18;
    if (ring1.current) ring1.current.rotation.x += d * 0.25;
    if (ring2.current) ring2.current.rotation.z += d * 0.2;
    if (ring3.current) ring3.current.rotation.y -= d * 0.3;
  });

  const material = {
    color: "#6366f1",
    metalness: 0.9,
    roughness: 0.08,
    transmission: 0.6,
    thickness: 1.5,
    ior: 1.4,
    clearcoat: 1,
    clearcoatRoughness: 0.05,
    iridescence: 1,
    iridescenceIOR: 1.3,
    iridescenceThicknessRange: [100, 400],
    envMapIntensity: 2.5,
  };

  return (
    <group ref={groupRef} rotation={[0.4, 0.3, 0.1]}>
      <mesh ref={ring1} rotation={[Math.PI / 2.2, 0, 0]}>
        <torusGeometry args={[1.5, 0.09, 32, 100]} />
        <meshPhysicalMaterial {...material} color="#818cf8" />
      </mesh>
      <mesh ref={ring2} rotation={[0.6, 1.0, 0.3]}>
        <torusGeometry args={[1.3, 0.08, 32, 100]} />
        <meshPhysicalMaterial {...material} color="#a78bfa" />
      </mesh>
      <mesh ref={ring3} rotation={[1.1, 0.2, 0.9]}>
        <torusGeometry args={[1.1, 0.07, 32, 100]} />
        <meshPhysicalMaterial {...material} color="#6366f1" />
      </mesh>
      <mesh rotation={[0.3, 1.4, 0.5]}>
        <torusGeometry args={[0.85, 0.05, 32, 100]} />
        <meshPhysicalMaterial {...material} color="#c4b5fd" />
      </mesh>
    </group>
  );
}

export default function HeroRing() {
  return (
    <div style={{ width: "100%", height: "100%", pointerEvents: "none" }}>
      <Canvas
        camera={{ position: [0, 0, 5], fov: 45 }}
        gl={{ alpha: true, antialias: true }}
        style={{ background: "transparent" }}
        // Suppress the THREE.Clock deprecation warning —
        // r3f uses its own internal timer; this tells it not to
        // instantiate a legacy Clock at the top level
        onCreated={({ gl }) => {
          gl.setClearColor(0x000000, 0);
        }}
      >
        <ambientLight intensity={0.4} />
        <pointLight position={[5, 5, 5]} intensity={2} color="#a78bfa" />
        <pointLight position={[-5, -3, 3]} intensity={1.5} color="#6366f1" />
        <pointLight position={[0, 0, 6]} intensity={1.2} color="#ffffff" />
        <directionalLight position={[2, 4, 5]} intensity={1} color="#c4b5fd" />
        <RingGroup />
      </Canvas>
    </div>
  );
}
