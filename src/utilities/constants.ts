export const EMAIL_REGEX =
  /^(?:[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}|[a-zA-Z0-9._-]{3,20})$/;

export const EMAIL_REGEX_FEEDBACK = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

export const PASSWORD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?#&^])[A-Za-z\d@$!%*?#&^]{8,}$/;

export enum STORAGE_KEYS {
  ACCESS_TOKEN = 'access_token',
  USER_ID = 'user_id',
  REFRESH_TOKEN = 'refresh_token',
  LANGUAGE_SELECTED = 'i18nextLng',
  SEARCH_QUERY = 'search_query'
}

export const enum CATEGORIES {
  HIGHLIGHTS = '41',
  TODAYS_EVENTS = '3',
  TODAYS_NEWS = '1',
  NEAR_YOU = '5',
  ALL = '',
}

export const referenceOptions = [
  'infra',
  'traffic',
  'cleanliness',
  'digital',
  'damages',
  'service',
  'general'
];

export const KUSEL_COORDINATES = {
  lat: 49.5375,
  lng: 7.4064,
  radius: 20
};
