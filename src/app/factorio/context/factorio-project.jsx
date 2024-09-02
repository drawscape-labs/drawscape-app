import React, { createContext, useContext, useState, useEffect } from 'react';
import { useParams, useSearchParams } from 'next/navigation';

const ProjectContext = createContext();

export const FactorioProjectProvider = ({ children }) => {
  const { id: projectId } = useParams();
  const searchParams = useSearchParams();
  const [themeName, setThemeName] = useState(searchParams.get('theme_name') || 'default');
  const [colorScheme, setColorScheme] = useState(searchParams.get('color_scheme') || 'main');

  useEffect(() => {
    setThemeName(searchParams.get('theme_name') || 'default');
    setColorScheme(searchParams.get('color_scheme') || 'main');
  }, [searchParams]);

  return (
    <ProjectContext.Provider value={{ projectId, themeName, colorScheme, setThemeName, setColorScheme }}>
      {children}
    </ProjectContext.Provider>
  );
};

export const useFactorioProject = () => {
  return useContext(ProjectContext);
};