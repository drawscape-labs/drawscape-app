import React, { createContext, useContext } from 'react';
import { useParams } from 'next/navigation';

const ProjectContext = createContext();

export const FactorioProjectProvider = ({ children }) => {
  const { id: projectId } = useParams();

  return (
    <ProjectContext.Provider value={{ projectId }}>
      {children}
    </ProjectContext.Provider>
  );
};

export const useFactorioProject = () => {
  return useContext(ProjectContext);
};