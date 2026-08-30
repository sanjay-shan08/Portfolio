import React, { useState, useEffect } from 'react';
import { useProgress } from '@react-three/drei';

export default function Loader() {
  const { active, progress, errors, item, loaded, total } = useProgress();
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    if (progress === 100) {
      // Small delay to let the fade out animation play before removing from DOM
      const timer = setTimeout(() => setVisible(false), 800);
      return () => clearTimeout(timer);
    }
  }, [progress]);

  if (!visible) return null;

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100vw',
      height: '100vh',
      backgroundColor: '#050505',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      zIndex: 9999,
      color: '#fff',
      fontFamily: 'monospace',
      transition: 'opacity 0.6s cubic-bezier(0.87, 0, 0.13, 1)',
      opacity: progress === 100 ? 0 : 1,
      pointerEvents: 'none'
    }}>
      <div style={{ width: '400px', textAlign: 'left' }}>
        <p style={{ margin: '0 0 15px 0', color: '#88aaff', fontSize: '1.2rem', fontWeight: 'bold', letterSpacing: '4px' }}>
          SYSTEM BOOT
        </p>
        <p style={{ margin: '0 0 20px 0', color: '#666', fontSize: '0.8rem', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
          {item ? `Loading: ${item.split('/').pop()}` : 'Initializing core WebGL engine...'}
        </p>
        
        {/* Progress Bar Container */}
        <div style={{ width: '100%', height: '2px', backgroundColor: '#222', position: 'relative' }}>
          {/* Progress Fill */}
          <div style={{
            position: 'absolute',
            top: 0,
            left: 0,
            height: '100%',
            backgroundColor: '#88aaff',
            width: `${progress}%`,
            transition: 'width 0.2s ease-out',
            boxShadow: '0 0 15px #88aaff'
          }} />
        </div>
        
        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '10px' }}>
          <p style={{ margin: 0, color: '#444', fontSize: '0.8rem' }}>
            {loaded} / {total || '??'} assets
          </p>
          <p style={{ margin: 0, color: '#88aaff', fontWeight: 'bold', letterSpacing: '2px' }}>
            {Math.floor(progress)}%
          </p>
        </div>
      </div>
    </div>
  );
}
