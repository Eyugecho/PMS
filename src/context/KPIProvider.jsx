import React, { createContext, useState, useContext } from 'react';

const KPIContext = createContext();

export const KPIProvider = ({ children }) => {
  const [selectedKpi, setSelectedKpi] = useState([]);

  const addOrRemoveKPI = (kpi) => {
    setSelectedKpi((prev) => {
      const isExisting = prev.find((item) => item.id === kpi.id);
      if (isExisting) {
        // Remove existing KPI
        return prev.filter((item) => item.id !== kpi.id);
      } else {
        // Add new KPI
        const newPayload = {
          id: kpi.id,
          name: kpi.name,
          weight: '',
          mu: kpi.measuring_unit?.name,
          total_target: ''
        };
        return [...prev, newPayload];
      }
    });
  };

  const handleUpdatePlan = (kpi) => {
    setSelectedKpi(kpi);
  };

  const updateKPI = (id, updates) => {
    setSelectedKpi((prev) => {
      return prev.map((kpi) => (kpi.id === id ? { ...kpi, ...updates } : kpi));
    });
  };

  const distributeTarget = (value, kpi_id, period_id) => {
    setSelectedKpi((prevSelectedKpi) =>
      prevSelectedKpi.map((kpi) => {
        if (kpi.id === kpi_id) {
          if (kpi.targets) {
            const periodExists = kpi.targets.some((targeted) => targeted.period_id === period_id);
            const newTargetPeriod = periodExists
              ? kpi.targets.map((targeted) => (targeted.period_id === period_id ? { ...targeted, target: value } : targeted))
              : [...kpi.targets, { period_id: period_id, target: value }];
            return { ...kpi, targets: newTargetPeriod };
          } else {
            return { ...kpi, targets: [{ period_id: period_id, target: value }] };
          }
        }
        return kpi;
      })
    );
  };

  return (
    <KPIContext.Provider value={{ selectedKpi, addOrRemoveKPI, handleUpdatePlan, updateKPI, distributeTarget }}>
      {children}
    </KPIContext.Provider>
  );
};

export const useKPI = () => useContext(KPIContext);
