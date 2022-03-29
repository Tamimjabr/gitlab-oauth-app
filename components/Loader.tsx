import React from 'react'
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

const Loader = () => {
  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '80vh' }}>
      <CircularProgress color='secondary' size='8rem' />
    </Box>
  )
}

export default Loader