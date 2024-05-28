import React, { ReactNode } from 'react';
import { Box } from '@mui/material';

interface BackgroundProps {
  children: ReactNode;
}

const Background: React.FC<BackgroundProps> = ({ children }) => {
  return (
    <Box
      sx={{
        boxShadow: 2,
        width: 'auto', 
        height: 'auto', 
        backgroundColor: 'primary.main',
        borderRadius: 1, 
        p: 0.65,
      }}
    >
      {children}
    </Box>
  );
};

export default Background;
