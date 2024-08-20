export const firstSlideUnit = (payload, id) => {
  const errors = [];
  let valid = true;

  if (payload.length === 0) {
    valid = false;
    errors.push('Please select the unit first');
  }

  payload.forEach((unit) => {
    if (unit.child_weight == 0) {
      valid = false;
      errors.push(`The ${unit.unit_name} Unit weight is required.`);
    } else if (isNaN(unit.child_weight)) {
      valid = false;
      errors.push(`The ${unit.unit_name} Unit weight must be a number.`);
    } else if (unit.child_weight < 0) {
      valid = false;
      errors.push(`The ${unit.unit_name} Unit weight cannot be negative.`);
    } else if (unit.child_weight > 100) {
      valid = false;
      errors.push(`The ${unit.unit_name} Unit weight exceeded 100%`);
    }
    if (unit.unit_targets.length === 0) {
      valid = false;
      errors.push(`Enter the units target`);
    } else if (unit.unit_targets.length > 0) {
      unit.unit_targets.forEach((target) => {
        if (target.parent_id === id && target.target == 0) {
          valid = false;
          errors.push(`Please enter ${unit.unit_name} unit target`);
        } else if (isNaN(target.target)) {
          valid = false;
          errors.push(`The ${unit.unit_name} target must be a number.`);
        } else if (target.target < 0) {
          valid = false;
          errors.push(`The ${unit.unit_name} target cannot be negative.`);
        }
      });
    }
  });
  return { valid, errors };
};

export const unitTargetValidation = (payload, id) => {
  const errors = [];
  let valid = true;

  payload.forEach((unit) => {
    const targetExist = unit?.unit_targets.find((target) => target.parent_id === id);

    if (!targetExist) {
      valid = false;
      errors.push(`Please enter ${unit.unit_name} target`);
    }

    unit.unit_targets.forEach((target) => {
      if (target.parent_id === id && target.target == 0) {
        valid = false;
        errors.push(`Please enter ${unit.unit_name} target`);
      } else if (isNaN(target.target)) {
        valid = false;
        errors.push(`The ${unit.unit_name} target must be a number.`);
      } else if (target.target < 0) {
        valid = false;
        errors.push(`The ${unit.unit_name} target cannot be negative.`);
      }
    });
  });

  return { valid, errors };
};

export const firstSlideEmployee = (payload, id) => {
  const errors = [];
  let valid = true;

  if (payload.length === 0) {
    valid = false;
    errors.push('Please select the employee first');
  }

  payload.forEach((unit) => {
    if (unit.child_weight == 0) {
      valid = false;
      errors.push(`The ${unit.unit_name}  weight is required.`);
    } else if (isNaN(unit.child_weight)) {
      valid = false;
      errors.push(`The ${unit.unit_name} weight must be a number.`);
    } else if (unit.child_weight < 0) {
      valid = false;
      errors.push(`The ${unit.unit_name} employee weight is cannot be negative.`);
    } else if (unit.child_weight > 100) {
      valid = false;
      errors.push(`The ${unit.unit_name} employee weight exceeded 100%`);
    }
    if (unit.unit_targets.length === 0) {
      valid = false;
      errors.push(`Enter the employees target`);
    } else if (unit.unit_targets.length > 0) {
      unit.unit_targets.forEach((target) => {
        if (target.parent_id === id && target.target === 0) {
          valid = false;
          errors.push(`Please enter ${unit.unit_name} employee target`);
        } else if (isNaN(target.target)) {
          valid = false;
          errors.push(`The ${unit.unit_name} target must be a number.`);
        } else if (target.target < 0) {
          valid = false;
          errors.push(`The ${unit.unit_name} target cannot be negative.`);
        }
      });
    }
  });

  return { valid, errors };
};
