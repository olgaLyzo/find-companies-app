import React, { useState } from 'react';
import css from '../scss/components_styles/searching.module.scss';

type CheckKey =
  'maxFullness' | 'businessMention' | 'mainRole' | 'includeCalendars' | 'includeSummaries';

interface CheckState {
  key: CheckKey;
  label: string;
}

export const checkStates: CheckState[] = [
  { key: 'maxFullness', label: 'Признак максимальной полноты' },
  { key: 'businessMention', label: 'Упоминания в бизнес-контексте' },
  { key: 'mainRole', label: 'Главная роль в публикации' },
  { key: 'includeCalendars', label: 'Включать анонсы и календари' },
  { key: 'includeSummaries', label: 'Включать сводки новостей' },
];

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
      {checkStates.map((item, index) => (
        <label className={css.checkbox} htmlFor={`${index}`} key={index}>
          <input
            type="checkbox"
            id={`${index}`}
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
