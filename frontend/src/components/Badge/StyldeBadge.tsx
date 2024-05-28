import React from 'react';
import { styled } from '@mui/material/styles';
import Badge, { BadgeProps } from '@mui/material/Badge';
import { useAppSelector } from '@/app/store';
import { selectIsAuthentificated } from '@/features/auth/authSelectors';

// Define a custom prop type
interface CustomBadgeProps extends BadgeProps {
  statusColor: 'online' | 'offline';
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const StyledBadge = styled(({ statusColor, ...props }: CustomBadgeProps) => (
  <Badge {...props} />
))(({ theme, statusColor }) => ({
  '& .MuiBadge-badge': {
    backgroundColor: statusColor === 'online' ? '#44b700' : '#696665',
    color: statusColor === 'online' ? '#44b700' : '#696665',
    boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
    '&::after': {
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      borderRadius: '50%',
      animation: 'ripple 3.2s infinite ease-in-out',
      border: '1px solid currentColor',
      content: '""',
    },
  },
  '@keyframes ripple': {
    '0%': {
      transform: 'scale(.8)',
      opacity: 1,
    },
    '100%': {
      transform: 'scale(2.4)',
      opacity: 0,
    },
  },
}));

const BadgeConnected: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const isAuth = useAppSelector(selectIsAuthentificated);
    let statusColor: 'online' | 'offline' = 'offline';
    if(isAuth)
        {
            statusColor = 'online';
        }

  return (
    <StyledBadge
      statusColor={statusColor}
      overlap="circular"
      anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      variant="dot"
    >
      {children}
    </StyledBadge>
  );
};

export default BadgeConnected;
