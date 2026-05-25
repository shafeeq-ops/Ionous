"use client";

import { useRef, useMemo, useState, useEffect } from "react";
import { useFrame } from "@react-three/fiber";
import { useGLTF } from "@react-three/drei";
import gsap from "gsap";
import * as THREE from "three";

export type ServiceSlug =
  | "space-infrastructure"
  | "mission-systems"
  | "software-engineering"
  | "enterprise-integration";

type Props = {
  slug: ServiceSlug;
  position?: [number, number, number];
  scale?: number;
  interactive?: boolean;
  scrollProgressRef?: React.MutableRefObject<number>;
};

useGLTF.preload("/models/mission-systems.glb", true, true);

function hasModel(slug: ServiceSlug): boolean {
  if (typeof window === "undefined") return false;
  const cache = (globalThis as unknown as { __ionousModelCache?: Record<string, boolean> }).__ionousModelCache;
  if (cache && slug in cache) return cache[slug];
  return false;
}

function setModelCache(slug: ServiceSlug, exists: boolean) {
  const g = globalThis as unknown as { __ionousModelCache?: Record<string, boolean> };
  g.__ionousModelCache = g.__ionousModelCache || {};
  g.__ionousModelCache[slug] = exists;
}

function GLTFModel({ slug }: { slug: ServiceSlug }) {
  const { scene } = useGLTF(`/models/${slug}.glb`, true, true);
  const cloned = useMemo(() => scene.clone(true), [scene]);
  useEffect(() => {
    const box = new THREE.Box3().setFromObject(cloned);
    const size = new THREE.Vector3();
    const center = new THREE.Vector3();
    box.getSize(size);
    box.getCenter(center);
    const longestAxis = Math.max(size.x, size.y, size.z);
    const targetSize = 2;
    const fit = longestAxis > 0 ? targetSize / longestAxis : 1;
    cloned.position.sub(center).multiplyScalar(fit);
    cloned.scale.setScalar(fit);
    cloned.traverse((obj) => {
      if ((obj as THREE.Mesh).isMesh) {
        const mesh = obj as THREE.Mesh;
        if (mesh.material instanceof THREE.MeshStandardMaterial) {
          mesh.material.metalness = 0.55;
          mesh.material.roughness = 0.35;
        }
      }
    });
  }, [cloned]);
  return <primitive object={cloned} />;
}

function ProceduralModel({ slug }: { slug: ServiceSlug }) {
  const group = useRef<THREE.Group>(null);

  const geom = useMemo(() => {
    switch (slug) {
      case "space-infrastructure": {
        const g = new THREE.IcosahedronGeometry(1.1, 1);
        return g;
      }
      case "mission-systems": {
        const g = new THREE.OctahedronGeometry(1.15, 0);
        return g;
      }
      case "software-engineering": {
        const g = new THREE.TorusKnotGeometry(0.75, 0.22, 128, 16, 2, 3);
        return g;
      }
      case "enterprise-integration": {
        const g = new THREE.TorusGeometry(1, 0.18, 16, 64);
        return g;
      }
    }
  }, [slug]);

  useFrame((_, dt) => {
    if (!group.current) return;
    group.current.rotation.y += dt * 0.25;
    group.current.rotation.x += dt * 0.08;
  });

  return (
    <group ref={group}>
      <mesh geometry={geom}>
        <meshStandardMaterial
          color="#e8eaf0"
          metalness={0.65}
          roughness={0.32}
          emissive="#1a1a22"
          emissiveIntensity={0.6}
        />
      </mesh>
      <mesh geometry={geom} scale={1.015}>
        <meshBasicMaterial
          color="#ffffff"
          wireframe
          transparent
          opacity={0.18}
          blending={THREE.AdditiveBlending}
        />
      </mesh>
      {slug === "software-engineering" && <OrbitalNodes />}
      {slug === "enterprise-integration" && (
        <mesh rotation={[Math.PI / 2.5, 0, 0]} scale={0.7}>
          <torusGeometry args={[1.4, 0.04, 8, 64]} />
          <meshBasicMaterial color="#ffffff" transparent opacity={0.25} />
        </mesh>
      )}
    </group>
  );
}

function OrbitalNodes() {
  const points = useMemo(() => {
    const arr: THREE.Vector3[] = [];
    for (let i = 0; i < 18; i++) {
      const a = (i / 18) * Math.PI * 2;
      arr.push(new THREE.Vector3(Math.cos(a) * 1.55, Math.sin(a * 2) * 0.25, Math.sin(a) * 1.55));
    }
    return arr;
  }, []);
  return (
    <>
      {points.map((p, i) => (
        <mesh key={i} position={p} scale={0.04}>
          <sphereGeometry args={[1, 8, 8]} />
          <meshBasicMaterial color="#ffffff" />
        </mesh>
      ))}
    </>
  );
}

export default function ServiceModel({ slug, position = [0, 0, 0], scale = 1, interactive = false, scrollProgressRef }: Props) {
  const wrap = useRef<THREE.Group>(null);
  const [modelExists, setModelExists] = useState<boolean | null>(() =>
    hasModel(slug) ? true : null,
  );
  const [hovered, setHovered] = useState(false);

  useEffect(() => {
    if (modelExists !== null) return;
    let cancelled = false;
    fetch(`/models/${slug}.glb`, { method: "HEAD" })
      .then((r) => {
        if (cancelled) return;
        const exists = r.ok;
        setModelCache(slug, exists);
        setModelExists(exists);
      })
      .catch(() => {
        if (cancelled) return;
        setModelCache(slug, false);
        setModelExists(false);
      });
    return () => {
      cancelled = true;
    };
  }, [slug, modelExists]);

  useEffect(() => {
    if (!interactive || !wrap.current) return;
    const target = wrap.current;
    const tl = gsap.to(target.scale, {
      x: hovered ? scale * 1.06 : scale,
      y: hovered ? scale * 1.06 : scale,
      z: hovered ? scale * 1.06 : scale,
      duration: 0.45,
      ease: "power2.out",
      overwrite: true,
    });
    return () => {
      tl.kill();
    };
  }, [hovered, scale, interactive]);

  useFrame((_, dt) => {
    if (!wrap.current) return;
    if (interactive && scrollProgressRef) {
      wrap.current.rotation.y = scrollProgressRef.current * Math.PI * 2;
      return;
    }
    const speed = hovered && interactive ? 1.2 : 0.3;
    wrap.current.rotation.y += dt * speed;
  });

  return (
    <group
      ref={wrap}
      position={position}
      scale={scale}
      onPointerOver={() => interactive && setHovered(true)}
      onPointerOut={() => interactive && setHovered(false)}
    >
      {modelExists ? <GLTFModel slug={slug} /> : <ProceduralModel slug={slug} />}
    </group>
  );
}
