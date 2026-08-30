import React, { createContext, useState, useContext } from 'react';

const DiveContext = createContext();

export const DiveProvider = ({ children }) => {
  const [diveTarget, setDiveTarget] = useState(null);
  const [activeProject, setActiveProject] = useState(null);

  const handleDive = (id) => {
    setActiveProject(id);
    setDiveTarget(id);
  };

  const handleReturn = () => {
    setDiveTarget(null);
  };

  return (
    <DiveContext.Provider value={{ diveTarget, activeProject, handleDive, handleReturn }}>
      {children}
    </DiveContext.Provider>
  );
};

export const useDive = () => useContext(DiveContext);
