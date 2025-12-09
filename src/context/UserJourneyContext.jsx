import React, { createContext, useContext, useState, useEffect } from 'react';

const UserJourneyContext = createContext();

export const useUserJourney = () => useContext(UserJourneyContext);

export const UserJourneyProvider = ({ children }) => {
  const [journey, setJourney] = useState(() => {
    const saved = localStorage.getItem('userJourney');
    return saved ? JSON.parse(saved) : null;
  });

  const [showWizard, setShowWizard] = useState(false);

  useEffect(() => {
    // If no journey is saved, show the wizard after a short delay
    if (!journey) {
      const timer = setTimeout(() => {
        setShowWizard(true);
      }, 1500); // 1.5s delay for initial impression
      return () => clearTimeout(timer);
    }
  }, [journey]);

  const saveJourney = (data) => {
    setJourney(data);
    localStorage.setItem('userJourney', JSON.stringify(data));
    setShowWizard(false);
  };

  const resetJourney = () => {
    setJourney(null);
    localStorage.removeItem('userJourney');
    setShowWizard(true);
  };

  return (
    <UserJourneyContext.Provider value={{ journey, saveJourney, resetJourney, showWizard, setShowWizard }}>
      {children}
    </UserJourneyContext.Provider>
  );
};
