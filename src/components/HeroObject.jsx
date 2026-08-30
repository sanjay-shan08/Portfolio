import { useRef, useEffect, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Float, useScroll } from '@react-three/drei';
import * as THREE from 'three';
import anime from 'animejs';

export default function HeroObject() {
  const scrollGroupRef = useRef();
  const groupRef = useRef();
  const meshRef = useRef();
  const packetRef = useRef();
  
  const scroll = useScroll(); // Access scroll data

  const COUNT = 150; // Increased nodes slightly for a denser network
  const PACKET_COUNT = 40; // Number of data packets traversing the net

  // Generate nodes, connections, and initial data packets
  const { nodes, linePositions, adjacency, initialPackets } = useMemo(() => {
    const tempNodes = [];
    for (let i = 0; i < COUNT; i++) {
      const t = Math.random() * Math.PI * 2;
      const p = Math.acos((Math.random() * 2) - 1);
      const radius = Math.random() * 2.5; 
      
      const x = radius * Math.sin(p) * Math.cos(t) * 1.8; 
      const y = radius * Math.sin(p) * Math.sin(t) * 1.5;
      const z = radius * Math.cos(p) * 1.8;
      
      tempNodes.push(new THREE.Vector3(x, y, z));
    }

    const points = [];
    const adj = Array.from({ length: COUNT }, () => []);
    
    // Helper function to add a bi-directional edge and line segment
    const addEdge = (a, b) => {
      if (!adj[a].includes(b)) {
        adj[a].push(b);
        adj[b].push(a);
        points.push(tempNodes[a].x, tempNodes[a].y, tempNodes[a].z);
        points.push(tempNodes[b].x, tempNodes[b].y, tempNodes[b].z);
      }
    };

    // 1. Minimum Spanning Tree: Ensure ALL nodes are connected into a single global network
    const connected = [0];
    const unconnected = Array.from({ length: COUNT - 1 }, (_, i) => i + 1);

    while (unconnected.length > 0) {
      let minDist = Infinity;
      let bestConnected = -1;
      let bestUnconnectedIdx = -1;

      for (let i = 0; i < unconnected.length; i++) {
        const uNode = unconnected[i];
        for (let j = 0; j < connected.length; j++) {
          const cNode = connected[j];
          const dist = tempNodes[uNode].distanceTo(tempNodes[cNode]);
          if (dist < minDist) {
            minDist = dist;
            bestConnected = cNode;
            bestUnconnectedIdx = i;
          }
        }
      }

      const newlyConnected = unconnected[bestUnconnectedIdx];
      addEdge(bestConnected, newlyConnected);
      
      connected.push(newlyConnected);
      unconnected.splice(bestUnconnectedIdx, 1);
    }
    
    // 2. Webbing: Add additional local connections so it looks like a complex web rather than a sparse tree
    for (let i = 0; i < tempNodes.length; i++) {
      const distances = [];
      for (let j = 0; j < tempNodes.length; j++) {
        if (i !== j) {
          distances.push({ index: j, dist: tempNodes[i].distanceTo(tempNodes[j]) });
        }
      }
      distances.sort((a, b) => a.dist - b.dist);
      for (let k = 0; k < 2; k++) { // Connect to 2 closest neighbors for density
        addEdge(i, distances[k].index);
      }
    }

    // Generate initial packets
    const packets = Array.from({ length: PACKET_COUNT }, () => {
      const start = Math.floor(Math.random() * COUNT);
      const end = adj[start][Math.floor(Math.random() * adj[start].length)];
      return {
        start,
        end,
        progress: Math.random(), 
        speed: 0.5 + Math.random() * 1.0 
      };
    });

    return { 
      nodes: tempNodes, 
      linePositions: new Float32Array(points),
      adjacency: adj,
      initialPackets: packets
    };
  }, []);

  const packetsData = useRef(initialPackets);
  const dummy = useMemo(() => new THREE.Object3D(), []);

  useEffect(() => {
    if (meshRef.current) {
      nodes.forEach((node, i) => {
        dummy.position.copy(node);
        dummy.updateMatrix();
        meshRef.current.setMatrixAt(i, dummy.matrix);
      });
      meshRef.current.instanceMatrix.needsUpdate = true;
    }

    if (groupRef.current) {
      groupRef.current.scale.set(0.01, 0.01, 0.01);
      groupRef.current.position.set(5, 0, -5); 
      
      anime({
        targets: groupRef.current.scale,
        x: 1.3, y: 1.3, z: 1.3, 
        duration: 3500,
        easing: 'easeOutElastic(1, .6)', 
        delay: 200
      });

      anime({
        targets: groupRef.current.position,
        x: 2.5, y: 0, z: 0,
        duration: 2500,
        easing: 'easeOutExpo',
        delay: 200
      });
      
      anime({
        targets: groupRef.current.rotation,
        x: [Math.PI, 0],
        y: [Math.PI * 2, 0],
        duration: 4000,
        easing: 'easeOutExpo',
        delay: 200
      });
    }
  }, [nodes]);

  useFrame((state, delta) => {
    const time = state.clock.elapsedTime;

    // --- SCROLL LOGIC ---
    if (scrollGroupRef.current) {
      // scroll.range(0, 0.25) goes from 0 to 1 as user scrolls first 25% of the page
      const r1 = scroll.range(0, 0.25);
      
      // Move Neural Network to center (from 0 to -2.5 offset)
      scrollGroupRef.current.position.x = -r1 * 2.5; 
      
      // Shrink to 0
      const scale = 1 - r1; 
      scrollGroupRef.current.scale.set(scale, scale, scale);
    }
    
    // --- ANIMATION LOGIC ---
    if (groupRef.current) {
      const baseY = time * 0.15;
      const baseZ = Math.sin(time * 0.5) * 0.1;

      const targetX = (state.pointer.y * Math.PI) / 6; 
      const targetY = baseY + (state.pointer.x * Math.PI) / 4; 

      groupRef.current.rotation.x = THREE.MathUtils.lerp(groupRef.current.rotation.x, targetX, 0.05);
      groupRef.current.rotation.y = THREE.MathUtils.lerp(groupRef.current.rotation.y, targetY, 0.05);
      groupRef.current.rotation.z = THREE.MathUtils.lerp(groupRef.current.rotation.z, baseZ, 0.05);
    }

    if (packetRef.current) {
      packetsData.current.forEach((packet, i) => {
        packet.progress += delta * packet.speed;
        
        if (packet.progress >= 1.0) {
          packet.progress = 0;
          packet.start = packet.end;
          
          const neighbors = adjacency[packet.start];
          packet.end = neighbors[Math.floor(Math.random() * neighbors.length)];
        }
        
        const startPos = nodes[packet.start];
        const endPos = nodes[packet.end];
        
        dummy.position.lerpVectors(startPos, endPos, packet.progress);
        dummy.scale.set(1, 1, 1);
        dummy.updateMatrix();
        packetRef.current.setMatrixAt(i, dummy.matrix);
      });
      
      packetRef.current.instanceMatrix.needsUpdate = true;
    }
  });

  return (
    <group ref={scrollGroupRef}>
      <Float speed={1} rotationIntensity={0.1} floatIntensity={0.5}>
        <group ref={groupRef}>
          
          <instancedMesh ref={meshRef} args={[null, null, COUNT]}>
            <sphereGeometry args={[0.04, 16, 16]} />
            <meshStandardMaterial 
              color="#00ffff" 
              emissive="#0088ff"
              emissiveIntensity={1.5}
              roughness={0.2}
            />
          </instancedMesh>

          <instancedMesh ref={packetRef} args={[null, null, PACKET_COUNT]}>
            <sphereGeometry args={[0.06, 16, 16]} />
            <meshStandardMaterial 
              color="#ffffff" 
              emissive="#ffffff"
              emissiveIntensity={4}
            />
          </instancedMesh>

          <lineSegments>
            <bufferGeometry>
              <bufferAttribute
                attach="attributes-position"
                count={linePositions.length / 3}
                array={linePositions}
                itemSize={3}
              />
            </bufferGeometry>
            <lineBasicMaterial color="#00aaff" transparent opacity={0.2} />
          </lineSegments>

        </group>
      </Float>
    </group>
  );
}
