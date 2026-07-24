import React, { useState } from 'react';
import css from '../scss/components_styles/searching.module.scss';
import { checkStates } from '../constants/checkStates';
import type { CheckKey } from '../constants/checkStates';

const Checkbox: React.FC = () => {
  const [checks, setChecks] = useState<Record<CheckKey, boolean>>({
    maxFullness: false,
    businessMention: false,
    mainRole: false,
    includeCalendars: false,
    includeSummaries: false,
  });

  const toggleCheck = (name: CheckKey) => {
    setChecks((prev) => ({ ...prev, [name]: !prev[name] }));
  };

  return (
    <div className={css.checkbox_group}>
      {checkStates.map((item) => (
        <label className={css.checkbox} htmlFor={item.key} key={item.key}>
          <input
            type="checkbox"
            id={item.key}
            checked={checks[item.key]}
            onChange={() => toggleCheck(item.key)}
          />
          <span className={css.checkmark}></span>
          {item.label}
        </label>
      ))}
    </div>
  );
};

export default Checkbox;
