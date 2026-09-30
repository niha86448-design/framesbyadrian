'use client';

import React, { useRef, useMemo, useEffect, useState, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

function GlossyBokehParticles() {
  const meshRef = useRef<THREE.InstancedMesh>(null!);
  const [count, setCount] = useState(90);
  const explosionRef = useRef(0);
  const mouseRef = useRef({ x: 0, y: 0, targetX: 0, targetY: 0 });

  useEffect(() => {
    const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;
    setCount(isMobile ? 30 : 90);

    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current.targetX = (e.clientX / window.innerWidth - 0.5) * 2;
      mouseRef.current.targetY = (e.clientY / window.innerHeight - 0.5) * 2;
    };

    const handleClick = () => {
      explosionRef.current = 1.0;
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('click', handleClick);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('click', handleClick);
    };
  }, []);

  const particles = useMemo(() => {
    const temp = [];
    for (let i = 0; i < 110; i++) {
      const radius = 2.5 + Math.random() * 9;
      const angle = Math.random() * Math.PI * 2;
      const z = (Math.random() - 0.5) * 12;
      const orbitSpeed = (0.0015 + Math.random() * 0.003) * (Math.random() > 0.5 ? 1 : -1);
      const scale = 0.02 + Math.random() * 0.06;
      const phase = Math.random() * Math.PI * 2;
      temp.push({
        radius,
        angle,
        z,
        orbitSpeed,
        scale,
        phase,
      });
    }
    return temp;
  }, []);

  const dummy = useMemo(() => new THREE.Object3D(), []);

  useFrame((state, delta) => {
    if (!meshRef.current) return;

    mouseRef.current.x += (mouseRef.current.targetX - mouseRef.current.x) * 0.05;
    mouseRef.current.y += (mouseRef.current.targetY - mouseRef.current.y) * 0.05;

    meshRef.current.position.x = -mouseRef.current.x * 0.9;
    meshRef.current.position.y = mouseRef.current.y * 0.9;

    const time = state.clock.getElapsedTime();

    if (explosionRef.current > 0) {
      explosionRef.current = Math.max(0, explosionRef.current - delta * 0.6);
    }

    const exp = explosionRef.current;

    for (let i = 0; i < count; i++) {
      const p = particles[i];

      p.angle += p.orbitSpeed;

      const radialDisplacement = exp * 3.5 * Math.sin((i / count) * Math.PI);
      const r = p.radius + radialDisplacement;

      const x = Math.cos(p.angle) * r;
      const y = Math.sin(p.angle) * r;

      const pulse = 1 + Math.sin(time * 2.5 + p.phase) * 0.35;
      const currentScale = p.scale * pulse * (1 + exp * 0.5);

      dummy.position.set(x, y, p.z);
      dummy.scale.set(currentScale, currentScale, currentScale);
      dummy.updateMatrix();

      meshRef.current.setMatrixAt(i, dummy.matrix);
    }
    meshRef.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh ref={meshRef} args={[undefined, undefined, count]}>
      <sphereGeometry args={[1, 16, 16]} />
      <meshBasicMaterial
        color="#00D4FF"
        transparent={true}
        opacity={0.4}
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </instancedMesh>
  );
}

export default function BokehScene() {
  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      <Canvas
        camera={{ position: [0, 0, 10], fov: 60 }}
        gl={{ alpha: true, antialias: true }}
        style={{ pointerEvents: 'none' }}
        dpr={[1, 1.5]}
      >
        <Suspense fallback={null}>
          <GlossyBokehParticles />
        </Suspense>
      </Canvas>
    </div>
  );
}
