import { Grid, Typography, TextField, Box } from '@mui/material';
import { useState } from 'react';

interface EditableUsernameProps {
  value: string | number;
  label: string;
  feildKey: string;
  handleChange: (key: string, newUsername: string | number) => void;
  isEditing?: boolean;
  isMultiline?: boolean;
  isValidCred: () => boolean;
}

const EditableField: React.FC<EditableUsernameProps> = ({
  value,
  handleChange,
  label,
  isEditing,
  isMultiline = false,
  feildKey,
  isValidCred
}) => {

  const [initialValue, setInitialValue] = useState(value);
  const handleSave = (value: string | number) => {
    isValidCred()
    setInitialValue(value);
    handleChange(feildKey, value);
    setInitialValue(value);
  };

  return (
    <Grid container spacing={1} alignItems="center">
      <Grid item xs={12} sm={isMultiline ? 2 : 4}>
        <Typography fontWeight="bold" textAlign="start" pr={1}>
          {label}:
        </Typography>
      </Grid>
      <Grid item xs={12} sm={isMultiline ? 10 : 8}>
        {!isEditing ? (
          <TextField
            fullWidth
            variant="outlined"
            size="small"
            multiline={isMultiline}
            minRows={3}
            value={initialValue}
            disabled
          />
        ) : (
          <Box display="flex" gap={1} alignItems="center">
            <TextField
              fullWidth
              variant="outlined"
              size="small"
              multiline={isMultiline}
              minRows={3}
              value={initialValue}
              onChange={(e) => handleSave(e.target.value)}
              disabled={feildKey === 'username' || feildKey === 'email'}
              title={initialValue?.toString()}
            />
          </Box>
        )}
      </Grid>
    </Grid>
  );
};

export default EditableField;
