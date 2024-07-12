import * as React from 'react';
import Alert from '@mui/material/Alert';
import CheckIcon from '@mui/icons-material/Check';
import '../error/error.css'



export default function Error({message}) {
  return (
    <div className='error'>
        <Alert icon={<CheckIcon fontSize="inherit" />} severity="error">
          Error: {message}
        </Alert>
    </div>
    
  );
}