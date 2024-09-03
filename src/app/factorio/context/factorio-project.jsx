import React, { createContext, useContext, useState, useEffect } from 'react';
import { useParams, useSearchParams } from 'next/navigation';

const ProjectContext = createContext();

export const FactorioProjectProvider = ({ children }) => {
  const { id: projectId } = useParams();
  const searchParams = useSearchParams();
  const [themeName, setThemeName] = useState(searchParams.get('theme_name') || 'squares');
  const [colorScheme, setColorScheme] = useState(searchParams.get('color_scheme') || 'black');

  useEffect(() => {
    setThemeName(searchParams.get('theme_name') || 'squares');
    setColorScheme(searchParams.get('color_scheme') || 'black');
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