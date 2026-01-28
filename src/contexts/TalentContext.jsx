import { createContext, useContext, useState, useEffect } from 'react';

const TalentContext = createContext();

export function TalentProvider({ children }) {
  // Start completely empty
  const [talents, setTalents] = useState([]);

  // Only save talents AFTER new uploads
  useEffect(() => {
    if (talents.length > 0) {
      localStorage.setItem('talantahub_talents', JSON.stringify(talents));
    }
  }, [talents]);

  // Helper to add a new talent
  const addTalent = (talentObj) =>
    setTalents((prev) => [{ id: Date.now(), ...talentObj }, ...prev]);

  return (
    <TalentContext.Provider value={{ talents, addTalent }}>
      {children}
    </TalentContext.Provider>
  );
}

export function useTalent() {
  return useContext(TalentContext);
}
