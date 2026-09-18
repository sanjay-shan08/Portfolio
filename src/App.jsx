import React from 'react';
import CanvasContainer from './components/CanvasContainer';
import Loader from './components/Loader';
import { DiveProvider, useDive } from './contexts/DiveContext';

const ProjectOverlay = () => {
  const { diveTarget, activeProject, handleReturn } = useDive();
  return (
    <div style={{
      position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh',
      pointerEvents: diveTarget === null ? 'none' : 'auto',
      opacity: diveTarget === null ? 0 : 1,
      transition: 'opacity 1s ease-in-out',
      transitionDelay: diveTarget === null ? '0s' : '1.5s',
      display: 'flex', justifyContent: 'center', alignItems: 'center',
      background: 'rgba(255, 255, 255, 0.95)',
      backdropFilter: 'blur(20px)',
      color: '#000', zIndex: 1000
    }}>
      {activeProject && (
        <div style={{ textAlign: 'center', padding: '60px', maxWidth: '800px' }}>
          <h1 style={{ fontSize: '5rem', marginBottom: '20px', fontWeight: 900, letterSpacing: '-2px' }}>
            Project {activeProject}
          </h1>
          <p style={{ fontSize: '1.5rem', color: '#555', marginBottom: '50px', lineHeight: 1.6 }}>
            You have seamlessly broken the fourth wall, diving through the 3D laptop screen into a 2D DOM environment.
            This is a flawless example of combining WebGL physics with React UI.
          </p>
          <button
            onClick={handleReturn}
            style={{
              padding: '20px 50px', fontSize: '1.2rem', background: '#000', color: '#fff',
              border: 'none', borderRadius: '40px', cursor: 'pointer', fontWeight: 'bold',
              boxShadow: '0 10px 30px rgba(0,0,0,0.3)', transition: 'transform 0.2s'
            }}
            onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
            onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
          >
            ← Return to Portfolio
          </button>
        </div>
      )}
    </div>
  );
};

function App() {
  return (
    <DiveProvider>
      <Loader />
      <CanvasContainer />
      <ProjectOverlay />
    </DiveProvider>
  );
}

export default App;
