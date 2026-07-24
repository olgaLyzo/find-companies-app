export type CheckKey =
  | 'maxFullness'
  | 'businessMention'
  | 'mainRole'
  | 'includeCalendars'
  | 'includeSummaries';

export interface CheckState {
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