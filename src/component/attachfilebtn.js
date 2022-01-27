import * as React from 'react';
import IconButton from '@mui/material/IconButton';
import AttachFileIcon from '@mui/icons-material/AttachFile';

export default function IconButtons() {
  const handleClickOpen = () => {
    console.log('Hello');
  };
    return (
        <IconButton color="secondary" aria-label="add an alarm" onClick={handleClickOpen}>
          <AttachFileIcon />
        </IconButton>
    );
  }
