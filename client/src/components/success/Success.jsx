import * as React from 'react';
import Alert from '@mui/material/Alert';
import CheckIcon from '@mui/icons-material/Check';
import '../success/success.css'

export default function Success({msg}) {
  return (
    <div className='success'>
    <Alert color='green' icon={<CheckIcon fontSize="inherit" />} severity="success">
      {msg}
    </Alert>
    </div>

  );
}