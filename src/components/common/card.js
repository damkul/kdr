import React from 'react';
import Card from '@mui/material/Card';

const CommonCard = ({children,sx,size,click}) => {
  return (
    <Card sx={sx} size={size} onClick={click}>
     {children}
    </Card>
  )
}

export default CommonCard