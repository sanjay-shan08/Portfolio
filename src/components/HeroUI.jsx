import React, { useEffect, useRef } from 'react';
import anime from 'animejs';
import { useFrame } from '@react-three/fiber';
import { useScroll } from '@react-three/drei';

export default function HeroUI() {
  const bioRef = useRef(null);
  const skillsRef = useRef(null);
  const scroll = useScroll();

  useEffect(() => {
    anime({
      targets: bioRef.current,
      opacity: [0, 1], 
      translateY: [30, 0],
      duration: 1000,
      easing: 'easeOutExpo',
      delay: 200
    });
  }, []);

  useFrame(() => {
    const offset = scroll.offset;

    // Fade out Bio early as we scroll down
    if (bioRef.current && offset > 0.01) {
      const bioOpacity = 1 - ((offset - 0.01) / 0.05);
      bioRef.current.style.opacity = Math.max(0, Math.min(1, bioOpacity));
    }

    // Skills Panel Fade Logic (centered perfectly at offset ~0.125 with top: 75vh)
    if (skillsRef.current) {
      let skillsOpacity = 0;
      if (offset >= 0.03 && offset <= 0.09) {
        // Fade in
        skillsOpacity = (offset - 0.03) / 0.06;
      } else if (offset > 0.09 && offset <= 0.18) {
        // Hold completely visible
        skillsOpacity = 1;
      } else if (offset > 0.18 && offset <= 0.24) {
        // Fade out
        skillsOpacity = 1 - ((offset - 0.18) / 0.06);
      }
      skillsRef.current.style.opacity = Math.max(0, Math.min(1, skillsOpacity));
    }
  });

  return (
    <>
      {/* PAGE 1: BIO PANEL */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        display: 'flex',
        alignItems: 'center',
        paddingLeft: '8%',
        boxSizing: 'border-box',
        pointerEvents: 'none', 
        zIndex: 10
      }}>
        <div 
          ref={bioRef}
          className="glass-panel"
          style={{
            padding: '50px',
            maxWidth: '500px',
            pointerEvents: 'auto',
            opacity: 0 // controlled by anime.js and then useFrame
          }}
        >
          <h1>SANJAY S</h1>
          <p style={{ fontSize: '1.15rem', lineHeight: '1.6', color: '#e2e8f0', marginBottom: '15px' }}>
            AI Engineer & Full Stack Developer specializing in intelligent systems, high-performance applications, and immersive data-driven experiences. 
          </p>
          <p style={{ fontSize: '1rem', lineHeight: '1.6', color: '#94a3b8', marginBottom: '25px' }}>
            Bridging the gap between cutting-edge Machine Learning and highly polished web interfaces. Passionate about transforming complex problems into elegant, scalable solutions.
          </p>
          
          <a 
            href="/resume.pdf" 
            target="_blank"
            rel="noreferrer"
            style={{
              display: 'inline-block',
              marginTop: '25px',
              padding: '12px 24px',
              background: 'rgba(255,255,255,0.1)',
              color: '#fff',
              border: '1px solid rgba(255,255,255,0.2)',
              borderRadius: '30px',
              textDecoration: 'none',
              fontWeight: '600',
              fontSize: '0.9rem',
              backdropFilter: 'blur(5px)',
              transition: 'background 0.3s'
            }}
            onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.2)'}
            onMouseLeave={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.1)'}
          >
            View Resume
          </a>
        </div>
      </div>

      {/* PAGE 2: SKILLS PANEL */}
      <div style={{
        position: 'absolute',
        top: '75vh', // Custom requested top offset
        left: 0,
        width: '100vw',
        height: '100vh',
        display: 'flex',
        justifyContent: 'flex-end', 
        alignItems: 'center',
        paddingRight: '8%', 
        boxSizing: 'border-box',
        pointerEvents: 'none', 
        zIndex: 10
      }}>
        <div 
          ref={skillsRef}
          className="glass-panel"
          style={{
            padding: '40px',
            maxWidth: '450px',
            pointerEvents: 'auto',
            opacity: 0 // controlled by useFrame
          }}
        >
          <h2 style={{ fontSize: '1.8rem', fontWeight: '700', marginBottom: '25px', letterSpacing: '2px', borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '10px' }}>
            SKILLS
          </h2>

          <div style={{ marginBottom: '15px' }}>
            <h4 style={{ margin: '0 0 5px 0', color: '#88aaff', fontSize: '0.95rem', letterSpacing: '1px' }}>LANGUAGES</h4>
            <p style={{ margin: 0, color: '#e2e8f0', fontSize: '0.95rem', lineHeight: '1.4' }}>Python, C++, C, Java, SQL, JavaScript</p>
          </div>

          <div style={{ marginBottom: '15px' }}>
            <h4 style={{ margin: '0 0 5px 0', color: '#88aaff', fontSize: '0.95rem', letterSpacing: '1px' }}>AI & MACHINE LEARNING</h4>
            <p style={{ margin: 0, color: '#e2e8f0', fontSize: '0.95rem', lineHeight: '1.4' }}>PyTorch, scikit-learn, LangGraph, FAISS, Hugging Face, RAG, Vector Embeddings</p>
          </div>

          <div style={{ marginBottom: '15px' }}>
            <h4 style={{ margin: '0 0 5px 0', color: '#88aaff', fontSize: '0.95rem', letterSpacing: '1px' }}>BACKEND & TOOLS</h4>
            <p style={{ margin: 0, color: '#e2e8f0', fontSize: '0.95rem', lineHeight: '1.4' }}>FastAPI, Flask, Docker, AWS DynamoDB, REST APIs, Git, MySQL, SQLite, Streamlit</p>
          </div>

          <div>
            <h4 style={{ margin: '0 0 5px 0', color: '#88aaff', fontSize: '0.95rem', letterSpacing: '1px' }}>DEVELOPER CONCEPTS</h4>
            <p style={{ margin: 0, color: '#e2e8f0', fontSize: '0.95rem', lineHeight: '1.4' }}>Agentic Workflows, CI/CD, Containerization, Model Inference Optimization, Data Pipelines</p>
          </div>
        </div>
      </div>
    </>
  );
}
