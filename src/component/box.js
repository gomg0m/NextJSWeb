import * as React from 'react';
import Box from '@mui/material/Box';

export default function BoxSx({boxprops}) {
  return (
    <Box
      sx={{
        width: boxprops.width,
        height: boxprops.height,
        backgroundColor: 'primary.dark',
        opacity: [0.9, 0.8, 0.7],
        '&:hover': {
          backgroundColor: 'primary.main',
          opacity: [0.1, 0.1, 0.1],
        },
      }}
    />
  );
}