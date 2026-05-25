"use client";

import { Suspense, useEffect, useMemo, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Float, Stars } from "@react-three/drei";
import { EffectComposer, Bloom, Vignette } from "@react-three/postprocessing";
import * as THREE from "three";
import { useRef } from "react";
import ServiceModel, { type ServiceSlug } from "./ServiceModel";

type Variant = "hero" | "service";

type SceneProps = {
  variant: Variant;
  slug?: ServiceSlug;
  scrollProgressRef?: React.MutableRefObject<number>;
};

function Particles({ count = 220 }: { count?: number }) {
  const ref = useRef<THREE.Points>(null);
  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const r = 4 + Math.random() * 6;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      arr[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      arr[i * 3 + 1] = r * Math.cos(phi) * 0.6;
      arr[i * 3 + 2] = r * Math.sin(phi) * Math.sin(theta);
    }
    return arr;
  }, [count]);

  useFrame((_, dt) => {
    if (ref.current) ref.current.rotation.y += dt * 0.02;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.018}
        color="#ffffff"
        sizeAttenuation
        transparent
        opacity={0.7}
        depthWrite={false}
      />
    </points>
  );
}

export default function Scene({ variant, slug, scrollProgressRef }: SceneProps) {
  const isHero = variant === "hero";
  const cameraPos: [number, number, number] = isHero ? [0, 0.2, 6] : [0, 0.4, 3.6];
  const containerRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => setVisible(entry.isIntersecting),
      { rootMargin: "200px 0px", threshold: 0 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div ref={containerRef} className="w-full h-full">
    <Canvas
      frameloop={visible ? "always" : "never"}
      dpr={[1, 1.5]}
      camera={{ position: cameraPos, fov: 38 }}
      gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
    >
      <color attach="background" args={["#0b0f1a"]} />
      <fog attach="fog" args={["#0b0f1a", 6, 18]} />
      <ambientLight intensity={0.35} />
      <directionalLight position={[4, 6, 4]} intensity={1.15} color="#ffffff" />
      <pointLight position={[-4, -2, -3]} intensity={0.5} color="#9aa7c0" />
      <pointLight position={[3, -3, 2]} intensity={0.35} color="#ffffff" />

      <Suspense fallback={null}>
        {isHero ? (
          <>
            <Particles count={150} />
            <Stars radius={50} depth={30} count={600} factor={2} fade speed={0.4} />
            <Float floatIntensity={1.1} rotationIntensity={0.6} speed={1.2}>
              <ServiceModel slug="space-infrastructure" position={[-2.4, 0.6, -1]} scale={0.85} />
            </Float>
            <Float floatIntensity={0.9} rotationIntensity={0.7} speed={1.4}>
              <ServiceModel slug="mission-systems" position={[2.2, -0.4, -0.5]} scale={0.8} />
            </Float>
            <Float floatIntensity={1.2} rotationIntensity={0.5} speed={1}>
              <ServiceModel slug="software-engineering" position={[0, 1.3, -2.5]} scale={0.7} />
            </Float>
            <Float floatIntensity={1} rotationIntensity={0.8} speed={1.6}>
              <ServiceModel slug="enterprise-integration" position={[0.6, -1.4, -1.5]} scale={0.75} />
            </Float>
          </>
        ) : (
          <ServiceModel
            slug={slug ?? "space-infrastructure"}
            interactive
            scale={1.1}
            scrollProgressRef={scrollProgressRef}
          />
        )}
      </Suspense>

      {!isHero && (
        <OrbitControls
          enableZoom={false}
          enablePan={false}
          autoRotate={!scrollProgressRef}
          autoRotateSpeed={0.6}
          minPolarAngle={Math.PI / 2.6}
          maxPolarAngle={Math.PI / 1.8}
        />
      )}

      {isHero && (
        <EffectComposer enableNormalPass={false}>
          <Bloom intensity={0.45} luminanceThreshold={0.82} luminanceSmoothing={0.3} mipmapBlur />
          <Vignette eskil={false} offset={0.3} darkness={0.55} />
        </EffectComposer>
      )}
    </Canvas>
    </div>
  );
}
