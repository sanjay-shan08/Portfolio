import React, { useEffect, useRef } from 'react';
import anime from 'animejs';

export default function HeroUI() {
  const panelRef = useRef(null);

  useEffect(() => {
    anime({
      targets: panelRef.current,
      opacity: [0, 1],
      translateY: [30, 0],
      duration: 1000,
      easing: 'easeOutExpo',
      delay: 200
    });
  }, []);

  return (
    <div style={{
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100vw',
      height: '100vh',
      display: 'flex',
      alignItems: 'center',
      paddingLeft: '10%',
      pointerEvents: 'none', // Let clicks pass through
      zIndex: 10
    }}>
      <div 
        ref={panelRef}
        className="glass-panel"
        style={{
          padding: '50px',
          maxWidth: '500px',
          pointerEvents: 'auto',
          opacity: 0 // initial state before anime.js takes over
        }}
      >
        <h1>SANJAY S</h1>
        <p>AI Engineer & Full Stack Developer specializing in intelligent systems, high-performance applications, and immersive data-driven experiences. Building the bridge between cutting-edge Machine Learning and highly polished web interfaces.</p>
        
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
  );
}
