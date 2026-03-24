import React, { useState, useCallback } from 'react';
import { Avatar, IconButton, Box, Typography, Paper, SxProps } from '@mui/material';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import { useDropzone } from 'react-dropzone';

interface EditableImageDropzoneProps {
  imageUrl: string;
  handleImageChange: (newFile: File) => void;
  sx: SxProps;
  isEditing: boolean;
}

const EditableImageDropzone: React.FC<EditableImageDropzoneProps> = ({
  imageUrl,
  handleImageChange,
  sx,
}) => {
  const [preview, setPreview] = useState(imageUrl);
  const [tempFile, setTempFile] = useState<File | null>(null);
  const [isEditing, setIsEditing] = useState(false);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    if (file) {
      setTempFile(file);
      setPreview(URL.createObjectURL(file));
      setIsEditing(true);
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': [],
    },
    multiple: false,
  });

  const handleSave = () => {
    if (tempFile) {
      handleImageChange(tempFile);
      setIsEditing(false);
    }
  };

  const handleCancel = () => {
    setPreview(imageUrl);
    setTempFile(null);
    setIsEditing(false);
  };

  return (
    <Box display="flex" gap={2} sx={sx}>
      <Avatar src={preview} sx={{ width: 100, height: 100 }} />

      <Box alignSelf={'end'}>
        <Typography variant="body2" color="primary" fontWeight={600} mb={1}>
          Select yur Photo,<br></br> upto 5mb
        </Typography>
        {!isEditing ? (
          <Paper
            variant="outlined"
            {...getRootProps()}
            sx={{
              p: 1,
              width: 100,
              textAlign: 'center',
              borderColor: (theme) => theme.palette.primary.main,
              backgroundColor: (theme) => theme.palette.secondary.main,
              cursor: 'pointer',
              bgcolor: isDragActive ? 'grey.100' : 'inherit',
            }}
          >
            <input {...getInputProps()} />
            <Typography variant="body2" color="primary" fontWeight={600}>
              Upload
            </Typography>
          </Paper>
        ) : (
          <Box display="flex" gap={1}>
            <IconButton color="primary" onClick={handleSave}>
              <CheckIcon />
            </IconButton>
            <IconButton color="error" onClick={handleCancel}>
              <CloseIcon />
            </IconButton>
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default EditableImageDropzone;
