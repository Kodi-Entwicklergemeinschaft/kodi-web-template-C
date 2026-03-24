import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { defaultLanguage, languages } from '../i18n';
import { FormControl, Select, MenuItem } from '@mui/material';
import { STORAGE_KEYS } from '../utilities/constants';

const LanguageSwitcher = () => {
  const { i18n } = useTranslation();
  const [language, setLanguage] = useState(
    localStorage.getItem(STORAGE_KEYS.LANGUAGE_SELECTED) ?? defaultLanguage,
  );
  const changeLanguage = (lng: string) => {
    setLanguage(lng);
    i18n.changeLanguage(lng);
    localStorage.setItem(STORAGE_KEYS.LANGUAGE_SELECTED, lng);
    window.location.reload(); // Reload to apply language change
  };

  return (
    <FormControl sx={{ m: 1 }} size="small">
      <Select
        value={language}
        onChange={(event) => changeLanguage(event.target.value)}
        color="primary"
        MenuProps={{
          slotProps: {
            paper: {
              sx: {
                bgcolor: (theme) => theme.palette.common.white,
                borderRadius: '10px',
                boxShadow: 3,
              },
            },
          },
        }}
      >
        {languages.map((lng) => (
          <MenuItem key={lng} value={lng}>
            {lng}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default LanguageSwitcher;
