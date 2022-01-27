import * as React from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';

export default function ComboBox() {
  return (
    <Autocomplete
      disablePortal
      id="combo-box-demo"
      options={top100Films}
      sx={{ width: 100 }}
      renderInput={(params) => <TextField {...params} label="Genre" size="small" />}
    />
  );
}

// Top 100 films as rated by IMDb users. http://www.imdb.com/chart/top
const top100Films = [
  { label: '음악', year: 1994 },
  { label: '뮤지컬', year: 1972 },
  { label: '연극', year: 1974 },
  { label: '쇼', year: 2008 },
];