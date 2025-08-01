import React from 'react';
import {
  Drawer as MuiDrawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
  Box,
  Divider,
  Avatar
} from '@mui/material';
import {
  Dashboard as DashboardIcon,
  TableChart as TablesIcon,
  Receipt as BillingIcon,
  FormatTextdirectionRToL as RtlIcon,
  Notifications as NotificationsIcon,
  Person as ProfileIcon,
  Login as SignInIcon,
  PersonAdd as SignUpIcon
} from '@mui/icons-material';

const Drawer = ({ open, onClose, variant = 'temporary', anchor = 'left' }) => {
  const menuItems = [
    {
      id: 'dashboard',
      label: 'Dashboard',
      icon: <DashboardIcon />,
      path: '/dashboard',
      active: true
    },
    {
      id: 'tables',
      label: 'Tables',
      icon: <TablesIcon />,
      path: '/tables'
    },
    {
      id: 'billing',
      label: 'Billing',
      icon: <BillingIcon />,
      path: '/billing'
    },
    {
      id: 'rtl',
      label: 'RTL',
      icon: <RtlIcon />,
      path: '/rtl'
    },
    {
      id: 'notifications',
      label: 'Notifications',
      icon: <NotificationsIcon />,
      path: '/notifications'
    },
    {
      id: 'profile',
      label: 'Profile',
      icon: <ProfileIcon />,
      path: '/profile'
    }
  ];

  const authItems = [
    {
      id: 'signin',
      label: 'Sign In',
      icon: <SignInIcon />,
      path: '/signin'
    },
    {
      id: 'signup',
      label: 'Sign Up',
      icon: <SignUpIcon />,
      path: '/signup'
    }
  ];

  const handleItemClick = (item) => {
    console.log(`Navigating to: ${item.path}`);
    if (onClose && variant === 'temporary') {
      onClose();
    }
  };

  const drawerContent = (
    <Box sx={{ 
      width: 260,
      height: 'calc(100vh - 40px)',
      bgcolor: '#191b1dff', 
      color: 'white',
      display: 'flex',
      flexDirection: 'column',
      overflow: 'hidden',
      
      borderRadius: '20px', // esquinas redondeadas
      margin: '20px', // Margen en todos los lados
      boxShadow: '0 10px 30px rgba(0, 0, 0, 0.3)', // Sombra flotante
    }}>
      {/* Header */}
      <Box sx={{ 
        p: 3, 
        borderBottom: '1px solid #718096',
        display: 'flex',
        alignItems: 'center',
        gap: 1.5
      }}>
        <Avatar sx={{ 
          bgcolor: '#3182ce', 
          width: 32, 
          height: 32,
          fontSize: '1.2rem'
        }}>
          📊
        </Avatar>
        <Typography variant="h6" sx={{ 
          fontWeight: 600, 
          fontSize: '1.1rem',
          color: 'white' 
        }}>
          Calidad de Datos
        </Typography>
      </Box>

      {/* Main Navigation */}
      <Box sx={{ flex: 1, overflow: 'auto' }}>
        <List sx={{ py: 2 }}>
        {menuItems.map((item) => (
          <ListItem key={item.id} disablePadding sx={{ px: 2, mb: 0.5 }}>
            <ListItemButton
              onClick={() => handleItemClick(item)}
              sx={{
                borderRadius: 2,
                py: 1,
                px: 2,
                bgcolor: item.active ? '#3182ce' : 'transparent',
                color: 'white',
                '&:hover': {
                  bgcolor: item.active ? '#3182ce' : '#718096',
                  transform: 'translateX(2px)',
                },
                transition: 'all 0.2s ease-in-out',
                position: 'relative',
                ...(item.active && {
                  boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
                  '&::before': {
                    content: '""',
                    position: 'absolute',
                    left: 0,
                    top: 0,
                    bottom: 0,
                    width: 3,
                    bgcolor: '#63b3ed',
                    borderRadius: '0 2px 2px 0'
                  }
                })
              }}
            >
              <ListItemIcon sx={{ 
                color: 'white', 
                minWidth: 40,
                opacity: item.active ? 1 : 0.8
              }}>
                {item.icon}
              </ListItemIcon>
              <ListItemText 
                primary={item.label}
                sx={{
                  '& .MuiListItemText-primary': {
                    fontSize: '0.875rem',
                    fontWeight: 500,
                    opacity: item.active ? 1 : 0.9
                  }
                }}
              />
            </ListItemButton>
          </ListItem>
        ))}
              </List>

        {/* Divider */}
        <Divider sx={{ 
          bgcolor: '#718096', 
          mx: 3,
          my: 2
        }} />

        {/* Auth Items */}
        <List sx={{ py: 1 }}>
        {authItems.map((item) => (
          <ListItem key={item.id} disablePadding sx={{ px: 2, mb: 0.5 }}>
            <ListItemButton
              onClick={() => handleItemClick(item)}
              sx={{
                borderRadius: 2,
                py: 1,
                px: 2,
                color: 'white',
                '&:hover': {
                  bgcolor: '#718096',
                  transform: 'translateX(2px)',
                },
                transition: 'all 0.2s ease-in-out'
              }}
            >
              <ListItemIcon sx={{ 
                color: 'white', 
                minWidth: 40,
                opacity: 0.8
              }}>
                {item.icon}
              </ListItemIcon>
              <ListItemText 
                primary={item.label}
                sx={{
                  '& .MuiListItemText-primary': {
                    fontSize: '0.875rem',
                    fontWeight: 500,
                    opacity: 0.9
                  }
                }}
              />
            </ListItemButton>
          </ListItem>
        ))}
              </List>
      </Box>

      {/* Footer */}
      <Box sx={{
        p: 3,
        borderTop: '1px solid #718096',
        bgcolor: '#191b1dff',
        flexShrink: 0
      }}>
        {/* Upgrade Button */}
        <Box sx={{
          bgcolor: '#3182ce',
          borderRadius: 2,
          p: 2,
          textAlign: 'center',
          mb: 2,
          cursor: 'pointer',
          '&:hover': {
            bgcolor: '#2c5aa0',
            transform: 'translateY(-1px)'
          },
          transition: 'all 0.2s ease-in-out'
        }}
        onClick={() => console.log('Upgrade to Pro clicked')}
        >
          <Typography sx={{ 
            color: 'white',
            fontSize: '0.875rem',
            fontWeight: 600,
            textTransform: 'uppercase',
            letterSpacing: '0.5px'
          }}>
            UPGRADE TO PRO
          </Typography>
        </Box>

        <Typography variant="caption" sx={{ 
          color: '#a0aec0',
          fontSize: '0.75rem',
          textAlign: 'center',
          display: 'block'
        }}>
          © 2025 Calidad de Datos
        </Typography>
      </Box>
    </Box>
  );

  return (
    <MuiDrawer
      variant={variant}
      anchor={anchor}
      open={open}
      onClose={onClose}
      sx={{
        width: variant === 'persistent' ? 300 : 'auto', 
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          boxSizing: 'border-box',
          width: 300,
          border: 'none',
          boxShadow: 'none', // Quitamos sombra del paper
          height: '100vh',
          overflow: 'visible', // Para mostrar la sombra
          zIndex: 1300,
          backgroundColor: 'transparent', // Fondo transparente para mostrar el efecto flotante
          padding: 0
        },
      }}
      ModalProps={{
        keepMounted: true,
      }}
    >
      {drawerContent}
    </MuiDrawer>
  );
};

export default Drawer;