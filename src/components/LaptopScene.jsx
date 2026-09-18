import React, { useRef, useState, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import { useScroll, RoundedBox, Text, Svg, Center } from '@react-three/drei';
import * as THREE from 'three';
import { useDive } from '../contexts/DiveContext';

const cardColors = ['#3b82f6', '#8b5cf6', '#ec4899', '#f59e0b', '#10b981'];

const projectData = [
  {
    title: "AssistiveRAG",
    description: "Agentic Retrieval-Augmented Generation pipeline using LangGraph and Groq."
  },
  {
    title: "AgriPixel",
    description: "Hyperlocal weather downscaling and auto-generated agro-advisories for farmers."
  },
  {
    title: "InstaTrack",
    description: "Self-hosted Instagram analytics tracker to monitor profiles and engagement.",
    link: "https://github.com/sanjay-shan08/Insta_Tracker"
  },
  {
    title: "Arbitrage Bot",
    description: "High-performance Java bot for executing triangular arbitrage on crypto exchanges.",
    link: "https://github.com/sanjay-shan08/Crypto_Arb"
  },
  {
    title: "Reddit Analyzer",
    description: "Live Reddit post sentiment analysis dashboard using NLP and Streamlit.",
    link: "https://github.com/sanjay-shan08/Sentiment-Analyzer"
  }
];

const ProjectsContent3D = ({ onProjectClick }) => {
  const [hoveredIndex, setHoveredIndex] = useState(0);
  const cardsRef = useRef([]);

  useFrame((state, delta) => {
    let currentX = -1.9;
    const gap = 0.05;

    cardsRef.current.forEach((card, i) => {
      if (!card) return;

      const isHovered = hoveredIndex === i;
      const targetWidth = isHovered ? 2.0 : 0.4;

      card.currentWidth = THREE.MathUtils.damp(card.currentWidth || targetWidth, targetWidth, 6, delta);

      const targetX = currentX + (card.currentWidth / 2);

      if (card.bg) {
        card.bg.scale.x = card.currentWidth;
        card.bg.position.x = targetX;
      }

      if (card.content) {
        card.content.position.x = targetX;

        const opacity = THREE.MathUtils.clamp((card.currentWidth - 1.2) / 0.8, 0, 1);

        card.content.traverse((child) => {
          if (child.isMesh && child.material) {

            child.material.transparent = true;
            child.material.opacity = opacity;
            child.visible = opacity > 0;
          }
        });
      }

      currentX += card.currentWidth + gap;
    });
  });

  return (
    <group position={[0, 1.35, 0.012]}>
      <Text font="/Orbitron.ttf" position={[0, 0.8, 0]} fontSize={0.18} color="#ffffff" anchorX="center" fontWeight={600} letterSpacing={0.05}>
        FEATURED WORKS
      </Text>

      <group position={[0, 0, 0]}>
        {projectData.map((project, i) => {
          return (
            <group
              key={i}
              ref={(el) => { if (el) cardsRef.current[i] = el; }}
              onPointerOver={(e) => { e.stopPropagation(); setHoveredIndex(i); }}
            >

              <group ref={(el) => { if (cardsRef.current[i]) cardsRef.current[i].bg = el }}>
                <RoundedBox args={[1, 1.2, 0.02]} radius={0.03} smoothness={4}>

                  <meshPhysicalMaterial
                    color={cardColors[i]}
                    transmission={0.8}
                    transparent={true}
                    opacity={0.7}
                    metalness={0.7}
                    roughness={0.2}
                    ior={1.5}
                    thickness={0.1}
                    specularIntensity={1}
                    specularColor="#ffffff"
                  />
                </RoundedBox>
              </group>

              <group ref={(el) => { if (cardsRef.current[i]) cardsRef.current[i].content = el }}>
                <Text font="/Orbitron.ttf" position={[0, 0.35, 0.012]} fontSize={0.14} color="#ffffff" anchorX="center" fontWeight="bold">
                  {project.title}
                </Text>

                <Text font="/Orbitron.ttf" position={[0, 0.05, 0.012]} fontSize={0.06} color="#eeeeee" anchorX="center" maxWidth={1.2} textAlign="center" lineHeight={1.5}>
                  {project.description}
                </Text>

                <group
                  position={[0, -0.35, 0.012]}
                  onClick={(e) => {
                    e.stopPropagation();
                    window.open(project.link || `https://github.com/sanjay-shan08/${project.title.replace(/\s+/g, '')}`, '_blank');
                  }}
                  onPointerOver={(e) => {
                    e.stopPropagation();
                    document.body.style.cursor = 'pointer';
                  }}
                  onPointerOut={(e) => {
                    e.stopPropagation();
                    document.body.style.cursor = 'auto';
                  }}
                >
                  <RoundedBox args={[0.8, 0.16, 0.02]} radius={0.04} smoothness={4}>
                    <meshStandardMaterial color="#ffffff" />
                  </RoundedBox>
                  <Text font="/Orbitron.ttf" position={[0, 0, 0.012]} fontSize={0.06} color="#000000" anchorX="center" anchorY="middle" fontWeight="bold">
                    View Repo
                  </Text>
                </group>
              </group>
            </group>
          );
        })}
      </group>
    </group>
  );
};

const experienceData = [
  {
    company: "ShadowFox",
    role: "AI Engineer Intern",
    date: "Aug 2026 - Present",
    skills: "Generative AI, ML +2"
  },
  {
    company: "Maxwell Trust",
    role: "Technical Consultant",
    date: "Jun 2026 - 1 mo",
    skills: "Web Dev, AWS +4"
  },
  {
    company: "CodeAlpha",
    role: "Frontend Intern",
    date: "Jul 2025 - Aug 2025",
    skills: "Web Dev, HTML +3"
  },
  {
    company: "Prodigy InfoTech",
    role: "Full Stack Intern",
    date: "Jun 2025 - 1 mo",
    skills: "Web Dev, HTML +3"
  }
];

const ExperienceContent3D = () => {
  const [hoveredIndex, setHoveredIndex] = useState(0);
  const cardsRef = useRef([]);

  useFrame((state, delta) => {
    let currentX = -1.9;
    const gap = 0.05;

    cardsRef.current.forEach((card, i) => {
      if (!card) return;
      const isHovered = hoveredIndex === i;
      const targetWidth = isHovered ? 2.15 : 0.5;

      card.currentWidth = THREE.MathUtils.damp(card.currentWidth || targetWidth, targetWidth, 6, delta);
      const targetX = currentX + (card.currentWidth / 2);

      if (card.bg) {
        card.bg.scale.x = card.currentWidth;
        card.bg.position.x = targetX;
      }
      if (card.content) {
        card.content.position.x = targetX;
        const opacity = THREE.MathUtils.clamp((card.currentWidth - 1.3) / 0.85, 0, 1);
        card.content.traverse((child) => {
          if (child.isMesh && child.material) {
            child.material.transparent = true;
            child.material.opacity = opacity;
            child.visible = opacity > 0;
          }
        });
      }
      currentX += card.currentWidth + gap;
    });
  });

  return (
    <group position={[0, 1.35, 0.012]}>
      <Text font="/Orbitron.ttf" position={[0, 0.8, 0]} fontSize={0.18} color="#ffffff" anchorX="center" fontWeight={600} letterSpacing={0.05}>
        EXPERIENCE
      </Text>

      <group position={[0, 0, 0]}>
        {experienceData.map((exp, i) => {
          return (
            <group
              key={i}
              ref={(el) => { if (el) cardsRef.current[i] = el; }}
              onPointerOver={(e) => { e.stopPropagation(); setHoveredIndex(i); }}
            >
              <group ref={(el) => { if (cardsRef.current[i]) cardsRef.current[i].bg = el }}>
                <RoundedBox args={[1, 1.2, 0.02]} radius={0.03} smoothness={4}>
                  <meshPhysicalMaterial
                    color={cardColors[i]}
                    transmission={0.8}
                    transparent={true}
                    opacity={0.7}
                    metalness={0.7}
                    roughness={0.2}
                    ior={1.5}
                    thickness={0.1}
                    specularIntensity={1}
                    specularColor="#ffffff"
                  />
                </RoundedBox>
              </group>

              <group ref={(el) => { if (cardsRef.current[i]) cardsRef.current[i].content = el }}>
                <Text font="/Orbitron.ttf" position={[0, 0.35, 0.012]} fontSize={0.14} color="#ffffff" anchorX="center" fontWeight="bold">
                  {exp.company}
                </Text>

                <Text font="/Orbitron.ttf" position={[0, 0.1, 0.012]} fontSize={0.08} color="#eeeeee" anchorX="center" maxWidth={1.8} textAlign="center">
                  {exp.role}
                </Text>

                <Text font="/Orbitron.ttf" position={[0, -0.1, 0.012]} fontSize={0.06} color="#aaaaaa" anchorX="center" maxWidth={1.8} textAlign="center">
                  {exp.date}
                </Text>

                <group position={[0, -0.35, 0.012]}>
                  <RoundedBox args={[1.2, 0.16, 0.02]} radius={0.04} smoothness={4}>
                    <meshStandardMaterial color="#ffffff" />
                  </RoundedBox>
                  <Text font="/Orbitron.ttf" position={[0, 0, 0.012]} fontSize={0.055} color="#000000" anchorX="center" anchorY="middle" fontWeight="bold">
                    {exp.skills}
                  </Text>
                </group>
              </group>
            </group>
          );
        })}
      </group>
    </group>
  );
};

const ScreenContentRenderer = ({ onProjectClick }) => {
  const [view, setView] = useState('projects');
  const projRef = useRef();
  const expRef = useRef();

  useFrame((state, delta) => {
    if (!projRef.current || !expRef.current) return;

    const targetProjX = view === 'projects' ? 0 : -2;
    const targetProjS = view === 'projects' ? 1 : 0;
    projRef.current.position.x = THREE.MathUtils.damp(projRef.current.position.x, targetProjX, 6, delta);
    projRef.current.scale.setScalar(THREE.MathUtils.damp(projRef.current.scale.x, targetProjS, 6, delta));

    const targetExpX = view === 'experience' ? 0 : 2;
    const targetExpS = view === 'experience' ? 1 : 0;
    expRef.current.position.x = THREE.MathUtils.damp(expRef.current.position.x, targetExpX, 6, delta);
    expRef.current.scale.setScalar(THREE.MathUtils.damp(expRef.current.scale.x, targetExpS, 6, delta));
  });

  return (
    <group>

      <group
        position={[0, 2.55, 0.02]}
        onClick={(e) => { e.stopPropagation(); setView(v => v === 'projects' ? 'experience' : 'projects') }}
        onPointerOver={(e) => { e.stopPropagation(); document.body.style.cursor = 'pointer' }}
        onPointerOut={(e) => { e.stopPropagation(); document.body.style.cursor = 'auto' }}
      >
         <RoundedBox args={[1.2, 0.15, 0.01]} radius={0.05}>
            <meshStandardMaterial color="#222222" roughness={0.5} />
         </RoundedBox>
         <Text font="/Orbitron.ttf" position={[0, 0, 0.01]} fontSize={0.05} color="#88aaff" anchorX="center" anchorY="middle">
            {view === 'projects' ? "VIEW EXPERIENCE ➜" : "VIEW PROJECTS ➜"}
         </Text>
      </group>

      <group>
        <group ref={projRef}>
          <ProjectsContent3D onProjectClick={onProjectClick} />
        </group>

        <group ref={expRef}>
          <ExperienceContent3D />
        </group>
      </group>
    </group>
  );
};

const KeyboardKeys = () => {
  const meshRef = useRef();
  const [iconPositions, setIconPositions] = useState([]);
  const iconGroupsRef = useRef([]);
  const scroll = useScroll();

  const layout = [
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1.5, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1.5],
    [2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2],
    [2.5, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2.5],
    [3, 1, 1, 1, 1, 1, 1, 1, 1, 3],
    [1.5, 1.5, 1.5, 6, 1.5, 1.5, 1.5]
  ];

  const iconData = [
    { row: 3, col: 3, label: "in", link: "https://www.linkedin.com/in/sanjay-shan", color: "#0077b5", iconUrl: "/icons/linkedin.svg" },
    { row: 3, col: 4, label: "gh", link: "https://github.com/sanjay-shan08", color: "#ffffff", iconUrl: "/icons/github.svg" },
    { row: 3, col: 5, label: "lc", link: "https://leetcode.com/u/sanjay_shan/", color: "#ffa116", iconUrl: "/icons/leetcode.svg" },
    { row: 3, col: 6, label: "@", link: "mailto:sanjayshanmuganandan@gmail.com", color: "#ea4335", iconUrl: "/icons/email.svg" },
    { row: 3, col: 7, label: "wa", link: "https://wa.me/919342780509?text=Hey%20Sanjay!%20Let's%20Connect", color: "#25D366", iconUrl: "/icons/whatsapp.svg" }
  ];

  const totalKeys = layout.reduce((acc, row) => acc + row.length, 0);

  React.useEffect(() => {
    if (!meshRef.current) return;
    const dummy = new THREE.Object3D();
    let i = 0;

    const keyDepth = 0.18;
    const baseKeyWidth = 0.21;
    const gap = 0.03;
    const startZ = -0.74;

    const foundIcons = [];

    layout.forEach((row, rowIndex) => {

      const TOTAL_WIDTH = 14 * baseKeyWidth + 13 * gap;

      const rawKeysWidth = row.reduce((acc, w) => acc + (w * baseKeyWidth), 0);
      const targetKeysWidth = TOTAL_WIDTH - ((row.length - 1) * gap);
      const scaleFactor = targetKeysWidth / rawKeysWidth;

      let startX = -TOTAL_WIDTH / 2;
      const z = startZ + rowIndex * (keyDepth + gap);

      row.forEach((keyWidthFactor, colIndex) => {
        const w = (keyWidthFactor * baseKeyWidth) * scaleFactor;
        dummy.position.set(startX + w / 2, 0.005, z);
        dummy.scale.set(w, 0.015, keyDepth);
        dummy.updateMatrix();
        meshRef.current.setMatrixAt(i++, dummy.matrix);

        const targetIcon = iconData.find(d => d.row === rowIndex && d.col === colIndex);
        if (targetIcon) {
          foundIcons.push({ ...targetIcon, x: startX + w / 2, y: 0.015, z: z });
        }

        startX += w + gap;
      });
    });
    meshRef.current.instanceMatrix.needsUpdate = true;
    setIconPositions(foundIcons);
  }, []);

  useFrame((state, delta) => {
    if (!scroll) return;

    iconGroupsRef.current.forEach((group, i) => {
      if (!group || !iconPositions[i]) return;

      const triggerThreshold = 0.82 + (i * 0.02);
      const isActive = scroll.offset > triggerThreshold;
      const t = state.clock.elapsedTime;

      const baseTargetScale = isActive ? 1 : 0;
      let finalScale = THREE.MathUtils.damp(group.scale.x, baseTargetScale, 8, delta);

      if (isActive && finalScale > 0.95) {
        const pulse = Math.sin(t * 4 + i) * 0.05;
        finalScale = 1 + pulse;
      }
      group.scale.setScalar(finalScale);

      const targetY = isActive ? iconPositions[i].y + 0.015 : iconPositions[i].y;
      group.position.y = THREE.MathUtils.damp(group.position.y, targetY, 6, delta);

      const targetRotX = isActive ? 0 : Math.PI;
      group.rotation.x = THREE.MathUtils.damp(group.rotation.x, targetRotX, 8, delta);
    });
  });

  return (
    <group>
      <instancedMesh ref={meshRef} args={[null, null, totalKeys]}>
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial color="#1a1a1a" roughness={0.9} />
      </instancedMesh>

      {iconPositions.map((icon, i) => (
        <group
          key={i}
          ref={(el) => (iconGroupsRef.current[i] = el)}
          position={[icon.x, icon.y, icon.z]}
          scale={0}
          rotation={[Math.PI, 0, 0]}
          onClick={(e) => {
            e.stopPropagation();
            window.open(icon.link, '_blank');
          }}
          onPointerOver={(e) => {
            e.stopPropagation();
            document.body.style.cursor = 'pointer';
          }}
          onPointerOut={(e) => {
            e.stopPropagation();
            document.body.style.cursor = 'auto';
          }}
        >

          <mesh position={[0, -0.002, 0]}>
            <boxGeometry args={[0.19, 0.002, 0.16]} />
            <meshBasicMaterial color={icon.color} />
          </mesh>

          {icon.iconUrl ? (
            <Center position={[0, 0.001, 0]} rotation={[-Math.PI / 2, 0, 0]}>
              <Svg
                src={icon.iconUrl}
                scale={0.0035}
                fillMaterial={{ color: icon.label === 'gh' ? '#000000' : '#ffffff' }}
              />
            </Center>
          ) : (
            <Text
              position={[0, 0.001, 0]}
              rotation={[-Math.PI / 2, 0, 0]}
              fontSize={0.08}
              color={icon.label === 'gh' ? '#000000' : '#ffffff'}
              anchorX="center"
              anchorY="middle"
              outlineWidth={0.005}
              outlineColor={icon.label === 'gh' ? '#000000' : '#ffffff'}
            >
              {icon.label}
            </Text>
          )}
        </group>
      ))}
    </group>
  );
};

const LetsConnectText = () => {
  const scroll = useScroll();
  const textGroupRef = useRef();

  useFrame((state, delta) => {
    if (!scroll || !textGroupRef.current) return;

    const isActive = scroll.offset > 0.8;

    const targetScale = isActive ? 1 : 0;
    textGroupRef.current.scale.setScalar(THREE.MathUtils.damp(textGroupRef.current.scale.x, targetScale, 6, delta));
  });

  return (
    <group ref={textGroupRef} position={[0, 0.45, 0.02]}>
      <Text font="/Orbitron.ttf" position={[0, 0, 0]} fontSize={0.15} color="#ffffff" anchorX="center" anchorY="middle" letterSpacing={0.1} fontWeight={600}>
        LET'S CONNECT
      </Text>
      <Text font="/Orbitron.ttf" position={[0, -0.15, 0]} fontSize={0.06} color="#88aaff" anchorX="center" anchorY="middle" letterSpacing={0.05}>
        PRESS A KEY BELOW
      </Text>
    </group>
  );
};

export default function LaptopScene() {
  const scroll = useScroll();
  const groupRef = useRef();
  const screenRef = useRef();
  const { diveTarget, handleDive } = useDive();

  useFrame((state, delta) => {
    if (!groupRef.current) return;

    if (diveTarget !== null) {

      groupRef.current.position.x = THREE.MathUtils.damp(groupRef.current.position.x, 0, 2, delta);
      groupRef.current.position.y = THREE.MathUtils.damp(groupRef.current.position.y, -1.35, 2, delta);
      groupRef.current.position.z = THREE.MathUtils.damp(groupRef.current.position.z, 8.2, 2, delta);

      groupRef.current.rotation.x = THREE.MathUtils.damp(groupRef.current.rotation.x, 0, 2, delta);
      groupRef.current.rotation.y = THREE.MathUtils.damp(groupRef.current.rotation.y, 0, 2, delta);
      groupRef.current.rotation.z = THREE.MathUtils.damp(groupRef.current.rotation.z, 0, 2, delta);

      if (screenRef.current) {
        screenRef.current.rotation.x = THREE.MathUtils.damp(screenRef.current.rotation.x, 0, 2, delta);
      }
      return;
    }

    const r1 = scroll.range(0, 0.2);
    groupRef.current.scale.set(r1, r1, r1);

    groupRef.current.rotation.x = THREE.MathUtils.lerp(Math.PI / 2, 0, r1);
    groupRef.current.rotation.y = THREE.MathUtils.lerp(Math.PI, 0, r1);

    const r2 = scroll.range(0.2, 0.15);
    if (screenRef.current) {
      screenRef.current.rotation.x = THREE.MathUtils.lerp(Math.PI / 2, -0.15, r2);
    }

    const r3 = scroll.range(0.35, 0.25);
    const baseY = THREE.MathUtils.lerp(-0.5, -1.2, r3);
    const baseZ = THREE.MathUtils.lerp(0, 4.5, r3);
    const baseRotX = THREE.MathUtils.lerp(0, 0.15, r3);

    const rTilt = scroll.range(0.8, 0.1);
    groupRef.current.rotation.x = THREE.MathUtils.lerp(baseRotX, 1.05, rTilt);

    const tiltY = THREE.MathUtils.lerp(baseY, -1.0, rTilt);
    const tiltZ = THREE.MathUtils.lerp(baseZ, 3.8, rTilt);

    const rZoom = scroll.range(0.9, 0.1);
    groupRef.current.position.y = THREE.MathUtils.lerp(tiltY, -0.85, rZoom);
    groupRef.current.position.z = THREE.MathUtils.lerp(tiltZ, 4.3, rZoom);
  });

  return (
    <group ref={groupRef} position={[0, -0.5, 0]}>

      <RoundedBox args={[4.2, 0.08, 2.8]} radius={0.04} smoothness={4} position={[0, -0.04, 0]}>
        <meshStandardMaterial color="#888c94" metalness={0.9} roughness={0.15} />
      </RoundedBox>

      <mesh position={[0, 0.001, -0.2]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[3.6, 1.3]} />
        <meshStandardMaterial color="#050505" roughness={0.8} />
      </mesh>

      <KeyboardKeys />

      <mesh position={[0, 0.001, 0.85]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[1.4, 0.7]} />
        <meshStandardMaterial color="#757880" roughness={0.3} />
      </mesh>

      <group ref={screenRef} position={[0, 0, -1.35]}>

        <RoundedBox args={[4.2, 2.7, 0.04]} radius={0.04} smoothness={4} position={[0, 1.35, -0.02]}>
          <meshStandardMaterial color="#888c94" metalness={0.9} roughness={0.15} />
        </RoundedBox>

        <mesh position={[0, 1.35, 0.01]}>
          <planeGeometry args={[4.1, 2.6]} />
          <meshStandardMaterial color="#000000" roughness={0.1} metalness={0.8} />
        </mesh>

        <ScreenContentRenderer onProjectClick={handleDive} />

        <LetsConnectText />

      </group>
    </group>
  );
}
