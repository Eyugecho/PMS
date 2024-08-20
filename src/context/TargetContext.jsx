import React, { createContext, useContext, useState } from 'react';

const TargetContext = createContext();

export const TargetProvider = ({ children }) => {
  const [unitPayload, setUnitPayload] = useState([]);
  const [employeePayload, setEmployeePayload] = useState([]);

  const addUnit = (addedUnit, total) => {
    if (addedUnit) {
      const newPayload = {
        unit_id: addedUnit.id,
        unit_name: addedUnit.name,
        total_target: total,
        unit_targets: []
      };
      setUnitPayload((prevPayload) => [...prevPayload, newPayload]);
    }
  };

  const removeUnit = (removedUnit) => {
    if (removedUnit) {
      const updatedPayload = unitPayload.filter((payload) => payload.unit_id != removedUnit.id);
      setUnitPayload(updatedPayload);
    }
  };

  const addEmployee = (addedEmployee, total) => {
    if (addedEmployee) {
      const newPayload = {
        unit_id: addedEmployee.id,
        unit_name: addedEmployee.user?.name,
        total_target: total,
        unit_targets: []
      };
      setEmployeePayload((prevPayload) => [...prevPayload, newPayload]);
    }
  };

  const removeEmployee = (removedEmployee) => {
    if (removedEmployee) {
      const updatedPayload = employeePayload.filter((payload) => payload.unit_id !== removedEmployee.id);
      setEmployeePayload(updatedPayload);
    }
  };

  return (
    <TargetContext.Provider value={{ unitPayload, addUnit, removeUnit, employeePayload, addEmployee, removeEmployee }}>
      {children}
    </TargetContext.Provider>
  );
};

export const useTarget = () => useContext(TargetContext);
