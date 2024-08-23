import { createContext, useCallback, useContext, useState } from 'react';

const FiscalYearContext = createContext();

const FiscalYearProvider = ({ children }) => {
  const [fiscalYears, setFiscalYears] = useState([]);
  const [selectedFiscalYear, setSelectedFiscalYear] = useState(null);

  const handleFiscalYear = useCallback((data) => {
    setFiscalYears(data);
  }, []);

  const handleFiscalYearSelection = useCallback((fiscalYear) => {
    setSelectedFiscalYear(fiscalYear);
  }, []);

  return (
    <FiscalYearContext.Provider value={{ fiscalYears, selectedFiscalYear, handleFiscalYear, handleFiscalYearSelection }}>
      {children}
    </FiscalYearContext.Provider>
  );
};

export const useFiscalYear = () => useContext(FiscalYearContext);
export default FiscalYearProvider;
