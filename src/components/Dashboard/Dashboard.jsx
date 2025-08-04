import React, { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell, Area, AreaChart } from 'recharts';
import { 
  AppBar, 
  Toolbar, 
  IconButton, 
  Typography, 
  Box, 
  useMediaQuery, 
  useTheme,
} from '@mui/material';
import { 
  Menu as MenuIcon,
  // Iconos para las métricas
  Storage as StorageIcon,
  CheckCircle as CheckCircleIcon,
  Error as ErrorIcon,
  Schedule as ScheduleIcon
} from '@mui/icons-material';
import Drawer from '../Drawer';

const Dashboard = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [drawerOpen, setDrawerOpen] = useState(!isMobile);

  useEffect(() => {
    setDrawerOpen(!isMobile);
  }, [isMobile]);

  const handleDrawerToggle = () => {
    setDrawerOpen(!drawerOpen);
  };



  // Main metrics data con iconos y colores
  const metrics = [
    { 
      title: 'Registros Procesados', 
      value: '1,019,084', 
      change: '+3.5%', 
      trend: 'up',
      icon: <StorageIcon />,
      iconColor: '#4a5568',
      iconBg: '#4a5568'
    },
    { 
      title: 'Validaciones Exitosas', 
      value: '591,008', 
      change: '+7.1%', 
      trend: 'up',
      icon: <CheckCircleIcon />,
      iconColor: '#3b82f6',
      iconBg: '#3b82f6'
    },
    { 
      title: 'Tasa de Errores', 
      value: '13.8%', 
      change: '+2.3%', 
      trend: 'up',
      icon: <ErrorIcon />,
      iconColor: '#10b981', // Verde
      iconBg: '#10b981'
    },
    { 
      title: 'Tiempo de Validación', 
      value: '3m 40s', 
      change: '+1.0%', 
      trend: 'up',
      icon: <ScheduleIcon />,
      iconColor: '#e91e63',
      iconBg: '#e91e63'
    },
  ];

  // Session duration chart data
  const sessionData = [
    { date: 'Ene 1', newUsers: 4, sessions: 8, avgDuration: 6 },
    { date: 'Ene 8', newUsers: 3, sessions: 5, avgDuration: 4 },
    { date: 'Ene 15', newUsers: 5, sessions: 7, avgDuration: 5 },
    { date: 'Ene 22', newUsers: 6, sessions: 9, avgDuration: 7 },
    { date: 'Ene 29', newUsers: 8, sessions: 12, avgDuration: 9 },
    { date: 'Feb 5', newUsers: 7, sessions: 10, avgDuration: 8 },
    { date: 'Feb 12', newUsers: 9, sessions: 14, avgDuration: 11 },
    { date: 'Feb 19', newUsers: 10, sessions: 15, avgDuration: 12 },
  ];

  // Device distribution data
  const deviceData = [
    { name: 'Fuentes API', value: 5894, color: '#3b82f6' },
    { name: 'Fuentes Archivo', value: 2004, color: '#10b981' },
  ];

  // Language distribution data
  const languageData = [
    { name: 'Datos Estructurados', value: 6303, color: '#10b981' },
    { name: 'Datos No Estructurados', value: 1595, color: '#f59e0b' },
  ];

  // Histogram data
  const histogramData = [
    { range: 'Ene', value: 180 },
    { range: 'Feb', value: 220 },
    { range: 'Mar', value: 190 },
    { range: 'Abr', value: 250 },
    { range: 'May', value: 200 },
    { range: 'Jun', value: 180 },
    { range: 'Jul', value: 240 },
    { range: 'Ago', value: 260 },
    { range: 'Sep', value: 280 },
    { range: 'Oct', value: 300 },
    { range: 'Nov', value: 320 },
    { range: 'Dic', value: 340 },
  ];

  // Unique visitors data
  const uniqueVisitorsData = [
    { date: 'Ene', pageViews: 800, sessions: 400 },
    { date: 'Feb', pageViews: 1200, sessions: 600 },
    { date: 'Mar', pageViews: 900, sessions: 450 },
    { date: 'Abr', pageViews: 1100, sessions: 550 },
    { date: 'May', pageViews: 1300, sessions: 650 },
    { date: 'Jun', pageViews: 1000, sessions: 500 },
    { date: 'Jul', pageViews: 1400, sessions: 700 },
    { date: 'Ago', pageViews: 1600, sessions: 800 },
    { date: 'Sep', pageViews: 1200, sessions: 600 },
    { date: 'Oct', pageViews: 1500, sessions: 750 },
    { date: 'Nov', pageViews: 1100, sessions: 550 },
    { date: 'Dic', pageViews: 1300, sessions: 650 },
  ];

  // Income overview data
  const incomeData = [
    { month: 'Ene', income: 4000 },
    { month: 'Feb', income: 5200 },
    { month: 'Mar', income: 4800 },
    { month: 'Abr', income: 3200 },
    { month: 'May', income: 3800 },
    { month: 'Jun', income: 4600 },
    { month: 'Jul', income: 5800 },
  ];

  // Orders data
  const orders = [
    { id: 'VAL-007', customer: 'Dataset Transacciones', date: '10 Jun, 2025', status: 'Validando' },
    { id: 'VAL-006', customer: 'Dataset Clientes', date: '10 Jun, 2025', status: 'Completado' },
    { id: 'VAL-004', customer: 'Dataset Productos', date: '10 Jun, 2025', status: 'Error' },
    { id: 'VAL-003', customer: 'Dataset Inventario', date: '10 Jun, 2025', status: 'Validando' },
    { id: 'VAL-002', customer: 'Dataset Ventas', date: '10 Jun, 2025', status: 'Completado' },
    { id: 'VAL-001', customer: 'Dataset Usuarios', date: '10 Jun, 2025', status: 'Completado' },
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'Validando': return '#f59e0b';
      case 'Completado': return '#10b981';
      case 'Error': return '#ef4444';
      default: return '#6b7280';
    }
  };

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div style={{
          backgroundColor: 'white',
          padding: '0.75rem',
          border: '1px solid #e5e7eb',
          borderRadius: '0.5rem',
          boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
          fontSize: isMobile ? '0.75rem' : '0.875rem'
        }}>
          <p style={{ fontWeight: '500', marginBottom: '0.25rem' }}>{label}</p>
          {payload.map((entry, index) => (
            <p key={index} style={{ color: entry.color, margin: 0 }}>
              {entry.name}: {entry.value}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  const drawerWidth = 300;

  return (
    <Box sx={{ display: 'flex', height: '100vh', bgcolor: '#f9fafb', overflow: 'hidden' }}>
      {/* App Bar */}
      <AppBar
        position="fixed"
        sx={{
          
          ...(drawerOpen && !isMobile && {
            marginLeft: `-${drawerWidth}px`,
            paddingLeft: `${drawerWidth}px`
          }),
          bgcolor: 'white',
          color: '#1a202c',
          boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1)',
          zIndex: 1200, // Z-index menor que el drawer
        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          
          <Typography variant="h6" noWrap component="div" sx={{ fontWeight: 600, flexGrow: 1 }}>
            Dashboard de Calidad de Datos
          </Typography>

          {/* Search Bar */}
          

          {/* Action Buttons */}
          
        </Toolbar>
      </AppBar>

      {/* Drawer */}
      <Drawer
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        variant={isMobile ? 'temporary' : 'persistent'}
      />

      {/* Main Content */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          height: '100vh',
          overflow: 'auto',
          
          ...(drawerOpen && !isMobile && {
            marginLeft: `-${drawerWidth}px`,
            paddingLeft: `${drawerWidth}px`
          }),
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        {/* Toolbar spacer */}
        <Toolbar />

        {/* Scrollable Dashboard Content */}
        <Box sx={{ 
          flex: 1,
          p: isMobile ? 2 : '24px 24px 24px 16px', // Mínimo padding necesario
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start'
        }}>
          {/* Dashboard Content*/}
          <Box sx={{ 
            mt: 1,
            width: '100%',
           
          }}>
            {/* Main Metrics */}
            <Box sx={{
              display: 'grid',
              gridTemplateColumns: isMobile ? '1fr' : 'repeat(auto-fit, minmax(280px, 1fr))',
              gap: 2.5,
              mb: 3,
              justifyItems: 'stretch' 
            }}>
              {metrics.map((metric, index) => (
                <Box key={index} sx={{
                  bgcolor: 'white',
                  p: isMobile ? 2 : 3,
                  borderRadius: 3,
                  boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)', // Sombra más suave
                  border: 'none', 
                  width: '100%',
                  minWidth: '280px',
                  position: 'relative', 
                  overflow: 'visible' 
                }}>
                  {/* Icono flotante */}
                  <Box sx={{
                    position: 'absolute',
                    top: -10,
                    left: 20,
                    width: 56,
                    height: 56,
                    bgcolor: metric.iconBg,
                    borderRadius: 3,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    boxShadow: '0 8px 25px rgba(0, 0, 0, 0.15)',
                    color: 'white',
                    '& svg': {
                      fontSize: '1.5rem'
                    }
                  }}>
                    {metric.icon}
                  </Box>

                  <Box sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    mb: 1,
                    pl: 8
                  }}>
                    <Typography variant="body2" sx={{
                      fontSize: isMobile ? '0.75rem' : '0.875rem',
                      fontWeight: 500,
                      color: '#6b7280'
                    }}>
                      {metric.title}
                    </Typography>
                    <Typography variant="body2" sx={{
                      fontSize: isMobile ? '0.75rem' : '0.875rem',
                      fontWeight: 500,
                      color: metric.trend === 'up' ? '#10b981' : '#ef4444'
                    }}>
                      {metric.change}
                    </Typography>
                  </Box>
                  <Typography variant="h4" sx={{
                    fontSize: isMobile ? '1.5rem' : '1.875rem',
                    fontWeight: 'bold',
                    color: '#111827',
                    pl: 8 
                  }}>
                    {metric.value}
                  </Typography>
                </Box>
              ))}
            </Box>

            {/* Charts Row 1 - Line Chart and Pie Charts */}
             <Box sx={{
              display: 'grid',
              gridTemplateColumns: isMobile ? '1fr' : '1.8fr 1fr',
              gap: 2.5,
              mb: 3,
              alignItems: 'stretch'
            }}>
              
              <Box sx={{
                bgcolor: 'white',
                p: isMobile ? 2 : 3,
                borderRadius: 2,
                boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1)',
                border: '1px solid #e5e7eb',
                width: '100%'
              }}>
                <Box sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  mb: 3,
                  flexWrap: 'wrap',
                  gap: 1
                }}>
                  <Typography variant="h6" sx={{
                    fontSize: isMobile ? '1rem' : '1.25rem',
                    fontWeight: 600,
                    color: '#111827'
                  }}>
                    Monitoreo de Calidad
                  </Typography>
                  <Box sx={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: isMobile ? 1 : 2,
                    fontSize: isMobile ? '0.75rem' : '0.875rem',
                    flexWrap: 'wrap'
                  }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                      <Box sx={{
                        width: 12,
                        height: 12,
                        bgcolor: '#8b5cf6',
                        borderRadius: '50%'
                      }} />
                      <Typography variant="body2" sx={{ color: '#6b7280', fontSize: 'inherit' }}>
                        Nuevos Datasets
                      </Typography>
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                      <Box sx={{
                        width: 12,
                        height: 12,
                        bgcolor: '#3b82f6',
                        borderRadius: '50%'
                      }} />
                      <Typography variant="body2" sx={{ color: '#6b7280', fontSize: 'inherit' }}>
                        Validaciones
                      </Typography>
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                      <Box sx={{
                        width: 12,
                        height: 12,
                        bgcolor: '#f59e0b',
                        borderRadius: '50%'
                      }} />
                      <Typography variant="body2" sx={{ color: '#6b7280', fontSize: 'inherit' }}>
                        Tiempo Promedio
                      </Typography>
                    </Box>
                  </Box>
                </Box>
                <ResponsiveContainer width="100%" height={isMobile ? 250 : 300}>
                  <LineChart data={sessionData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                    <XAxis dataKey="date" stroke="#666" fontSize={isMobile ? 10 : 12} />
                    <YAxis stroke="#666" fontSize={isMobile ? 10 : 12} />
                    <Tooltip content={<CustomTooltip />} />
                    <Line type="monotone" dataKey="newUsers" stroke="#8b5cf6" strokeWidth={2} dot={{ fill: '#8b5cf6', strokeWidth: 2 }} />
                    <Line type="monotone" dataKey="sessions" stroke="#3b82f6" strokeWidth={2} dot={{ fill: '#3b82f6', strokeWidth: 2 }} />
                    <Line type="monotone" dataKey="avgDuration" stroke="#f59e0b" strokeWidth={2} dot={{ fill: '#f59e0b', strokeWidth: 2 }} />
                  </LineChart>
                </ResponsiveContainer>
              </Box>

              <Box sx={{
                bgcolor: 'white',
                p: isMobile ? 2 : 3,
                borderRadius: 2,
                boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1)',
                border: '1px solid #e5e7eb',
                width: '100%'
             
              }}>
                <Typography variant="h6" sx={{
                  fontSize: isMobile ? '1rem' : '1.25rem',
                  fontWeight: 600,
                  color: '#111827',
                  mb: 3
                }}>
                  Origen de Datos
                </Typography>

                <Box sx={{ mb: 3 }}>
                  <Typography variant="subtitle2" sx={{
                    fontSize: isMobile ? '0.75rem' : '0.875rem',
                    fontWeight: 500,
                    color: '#6b7280',
                    mb: 1
                  }}>
                    Fuente de Datos
                  </Typography>
                  <Box sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    mb: 2
                  }}>
                    <ResponsiveContainer width={isMobile ? 60 : 80} height={isMobile ? 60 : 80}>
                      <PieChart>
                        <Pie
                          data={deviceData}
                          cx="50%"
                          cy="50%"
                          innerRadius={isMobile ? 15 : 20}
                          outerRadius={isMobile ? 25 : 35}
                          paddingAngle={3}
                          dataKey="value"
                        >
                          {deviceData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Pie>
                      </PieChart>
                    </ResponsiveContainer>
                  </Box>
                  <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                    {deviceData.map((device, index) => (
                      <Box key={index} sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        fontSize: isMobile ? '0.75rem' : '0.875rem'
                      }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                          <Box sx={{
                            width: 12,
                            height: 12,
                            borderRadius: '50%',
                            bgcolor: device.color
                          }} />
                          <Typography variant="body2" sx={{ color: '#6b7280', fontSize: 'inherit' }}>
                            {device.name}
                          </Typography>
                        </Box>
                        <Typography variant="body2" sx={{
                          fontWeight: 500,
                          color: '#111827',
                          fontSize: 'inherit'
                        }}>
                          {device.value.toLocaleString()}
                        </Typography>
                      </Box>
                    ))}
                  </Box>
                </Box>

                <Box>
                  <Typography variant="subtitle2" sx={{
                    fontSize: isMobile ? '0.75rem' : '0.875rem',
                    fontWeight: 500,
                    color: '#6b7280',
                    mb: 1
                  }}>
                    Tipo de Datos
                  </Typography>
                  <Box sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    mb: 2
                  }}>
                    <ResponsiveContainer width={isMobile ? 60 : 80} height={isMobile ? 60 : 80}>
                      <PieChart>
                        <Pie
                          data={languageData}
                          cx="50%"
                          cy="50%"
                          innerRadius={isMobile ? 15 : 20}
                          outerRadius={isMobile ? 25 : 35}
                          paddingAngle={3}
                          dataKey="value"
                        >
                          {languageData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Pie>
                      </PieChart>
                    </ResponsiveContainer>
                  </Box>
                  <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                    {languageData.map((language, index) => (
                      <Box key={index} sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        fontSize: isMobile ? '0.75rem' : '0.875rem'
                      }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                          <Box sx={{
                            width: 12,
                            height: 12,
                            borderRadius: '50%',
                            bgcolor: language.color
                          }} />
                          <Typography variant="body2" sx={{ color: '#6b7280', fontSize: 'inherit' }}>
                            {language.name}
                          </Typography>
                        </Box>
                        <Typography variant="body2" sx={{
                          fontWeight: 500,
                          color: '#111827',
                          fontSize: 'inherit'
                        }}>
                          {language.value.toLocaleString()}
                        </Typography>
                      </Box>
                    ))}
                  </Box>
                </Box>
              </Box>
            </Box>

            {/* Charts Row 2 - Bar Chart and Quality Score */}
            <Box sx={{
              display: 'grid',
              gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr',
              gap: 2.5,
              mb: 3,
              alignItems: 'start'
            }}>
              <Box sx={{
                bgcolor: 'white',
                p: isMobile ? 2 : 3,
                borderRadius: 2,
                boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1)',
                border: '1px solid #e5e7eb'
              }}>
                <Typography variant="h6" sx={{
                  fontSize: isMobile ? '1rem' : '1.25rem',
                  fontWeight: 600,
                  color: '#111827',
                  mb: 3
                }}>
                  Resumen Mensual de Calidad
                </Typography>
                <ResponsiveContainer width="100%" height={isMobile ? 250 : 300}>
                  <BarChart data={histogramData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                    <XAxis dataKey="range" stroke="#666" fontSize={isMobile ? 10 : 12} />
                    <YAxis stroke="#666" fontSize={isMobile ? 10 : 12} />
                    <Tooltip />
                    <Bar dataKey="value" fill="#3b82f6" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </Box>

              <Box sx={{
                bgcolor: 'white',
                p: isMobile ? 2 : 3,
                borderRadius: 2,
                boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1)',
                border: '1px solid #e5e7eb'
              }}>
                <Typography variant="h6" sx={{
                  fontSize: isMobile ? '1rem' : '1.25rem',
                  fontWeight: 600,
                  color: '#111827',
                  mb: 3
                }}>
                  Puntuación de Calidad
                </Typography>
                <Box sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  mb: 3
                }}>
                  <Box sx={{ 
                    position: 'relative', 
                    width: isMobile ? 120 : 160, 
                    height: isMobile ? 120 : 160 
                  }}>
                    <svg style={{ width: '100%', height: '100%' }} viewBox="0 0 100 100">
                      <circle
                        cx="50"
                        cy="50"
                        r="35"
                        stroke="#e5e7eb"
                        strokeWidth="8"
                        fill="none"
                      />
                      <circle
                        cx="50"
                        cy="50"
                        r="35"
                        stroke="#f59e0b"
                        strokeWidth="8"
                        fill="none"
                        strokeDasharray={`${60 * 2.2}, 220`}
                        strokeDashoffset="0"
                        strokeLinecap="round"
                        transform="rotate(-90 50 50)"
                      />
                      <text
                        x="50"
                        y="50"
                        textAnchor="middle"
                        dy="0.3em"
                        fontSize={isMobile ? "14" : "16"}
                        fontWeight="bold"
                        fill="#374151"
                      >
                        60 / 100
                      </text>
                    </svg>
                  </Box>
                </Box>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
                  {['Integridad', 'Consistencia', 'Completitud'].map((label, index) => {
                    const widths = ['75%', '67%', '83%'];
                    const colors = ['#14b8a6', '#f59e0b', '#10b981'];
                    return (
                      <Box key={label} sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between'
                      }}>
                        <Typography variant="body2" sx={{ 
                          fontSize: isMobile ? '0.75rem' : '0.875rem', 
                          color: '#6b7280' 
                        }}>
                          {label}
                        </Typography>
                        <Box sx={{
                          width: isMobile ? 60 : 80,
                          height: 8,
                          bgcolor: '#e5e7eb',
                          borderRadius: 1,
                          overflow: 'hidden'
                        }}>
                          <Box sx={{
                            width: widths[index],
                            height: '100%',
                            bgcolor: colors[index]
                          }} />
                        </Box>
                      </Box>
                    );
                  })}
                </Box>
              </Box>
            </Box>

            {/* Charts Row 3 - Area Chart and Bar Chart */}
            <Box sx={{
              display: 'grid',
              gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr',
              gap: 2.5,
              mb: 3,
              alignItems: 'start'
            }}>
              <Box sx={{
                bgcolor: 'white',
                p: isMobile ? 2 : 3,
                borderRadius: 2,
                boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1)',
                border: '1px solid #e5e7eb'
              }}>
                <Box sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  mb: 3,
                  flexWrap: 'wrap',
                  gap: 1
                }}>
                  <Typography variant="h6" sx={{
                    fontSize: isMobile ? '1rem' : '1.25rem',
                    fontWeight: 600,
                    color: '#111827'
                  }}>
                    Análisis de Datasets
                  </Typography>
                  <Box sx={{ display: 'flex', gap: 0.5 }}>
                    <Box sx={{
                      px: 2,
                      py: 1,
                      bgcolor: '#3b82f6',
                      color: 'white',
                      borderRadius: 1,
                      fontSize: isMobile ? '0.75rem' : '0.875rem',
                      fontWeight: 500,
                      cursor: 'pointer'
                    }}>
                      Mes
                    </Box>
                    <Box sx={{
                      px: 2,
                      py: 1,
                      bgcolor: '#e5e7eb',
                      color: '#374151',
                      borderRadius: 1,
                      fontSize: isMobile ? '0.75rem' : '0.875rem',
                      fontWeight: 500,
                      cursor: 'pointer'
                    }}>
                      Semana
                    </Box>
                  </Box>
                </Box>
                <ResponsiveContainer width="100%" height={isMobile ? 250 : 300}>
                  <AreaChart data={uniqueVisitorsData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                    <XAxis dataKey="date" stroke="#666" fontSize={isMobile ? 10 : 12} />
                    <YAxis stroke="#666" fontSize={isMobile ? 10 : 12} />
                    <Tooltip />
                    <Legend />
                    <Area type="monotone" dataKey="pageViews" stackId="1" stroke="#3b82f6" fill="#3b82f6" fillOpacity={0.6} />
                    <Area type="monotone" dataKey="sessions" stackId="1" stroke="#1e40af" fill="#1e40af" fillOpacity={0.6} />
                  </AreaChart>
                </ResponsiveContainer>
              </Box>

              <Box sx={{
                bgcolor: 'white',
                p: isMobile ? 2 : 3,
                borderRadius: 2,
                boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1)',
                border: '1px solid #e5e7eb'
              }}>
                <Box sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  mb: 3,
                  flexWrap: 'wrap',
                  gap: 1
                }}>
                  <Typography variant="h6" sx={{
                    fontSize: isMobile ? '1rem' : '1.25rem',
                    fontWeight: 600,
                    color: '#111827'
                  }}>
                    Tendencia de Validación
                  </Typography>
                  <Box sx={{ textAlign: 'right' }}>
                    <Typography variant="body2" sx={{
                      fontSize: isMobile ? '0.75rem' : '0.875rem',
                      color: '#6b7280'
                    }}>
                      Estadísticas de la Semana
                    </Typography>
                    <Typography variant="h5" sx={{
                      fontSize: isMobile ? '1.25rem' : '1.5rem',
                      fontWeight: 'bold',
                      color: '#111827'
                    }}>
                      7,650
                    </Typography>
                  </Box>
                </Box>
                <ResponsiveContainer width="100%" height={isMobile ? 230 : 280}>
                  <BarChart data={incomeData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                    <XAxis dataKey="month" stroke="#666" fontSize={isMobile ? 10 : 12} />
                    <YAxis stroke="#666" fontSize={isMobile ? 10 : 12} />
                    <Tooltip />
                    <Bar dataKey="income" fill="#10b981" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </Box>
            </Box>

            {/* Latest Orders Table */}
            <Box sx={{
              bgcolor: 'white',
              borderRadius: 2,
              boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1)',
              border: '1px solid #e5e7eb',
              overflow: 'hidden',
              width: '100%'
            }}>
              <Box sx={{
                p: isMobile ? 2 : 3,
                borderBottom: '1px solid #e5e7eb'
              }}>
                <Box sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  flexWrap: 'wrap',
                  gap: 1
                }}>
                  <Typography variant="h6" sx={{
                    fontSize: isMobile ? '1rem' : '1.25rem',
                    fontWeight: 600,
                    color: '#111827'
                  }}>
                    Últimas Validaciones
                  </Typography>
                  <Typography sx={{
                    color: '#3b82f6',
                    fontSize: isMobile ? '0.75rem' : '0.875rem',
                    fontWeight: 500,
                    cursor: 'pointer'
                  }}>
                    Ver todas →
                  </Typography>
                </Box>
              </Box>
              
              <Box sx={{ overflowX: 'auto', WebkitOverflowScrolling: 'touch' }}>
                <table style={{ 
                  width: '100%',
                  minWidth: isMobile ? '600px' : 'auto',
                  borderCollapse: 'collapse'
                }}>
                  <thead style={{ backgroundColor: '#f9fafb' }}>
                    <tr>
                      {['Validación', 'Dataset', 'Fecha', 'Estado'].map((header) => (
                        <th key={header} style={{
                          padding: isMobile ? '12px 16px' : '16px 24px',
                          textAlign: 'left',
                          fontSize: isMobile ? '0.75rem' : '0.875rem',
                          fontWeight: 500,
                          color: '#6b7280',
                          textTransform: 'uppercase',
                          letterSpacing: '0.05em'
                        }}>
                          {header}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {orders.map((order, index) => (
                      <tr key={index} style={{
                        borderBottom: index < orders.length - 1 ? '1px solid #e5e7eb' : 'none'
                      }}>
                        <td style={{
                          padding: isMobile ? '12px 16px' : '16px 24px',
                          fontSize: isMobile ? '0.75rem' : '0.875rem',
                          fontWeight: 500,
                          color: '#111827'
                        }}>
                          {order.id}
                        </td>
                        <td style={{
                          padding: isMobile ? '12px 16px' : '16px 24px',
                          fontSize: isMobile ? '0.75rem' : '0.875rem',
                          color: '#111827'
                        }}>
                          {isMobile ? order.customer.replace('Dataset ', '') : order.customer}
                        </td>
                        <td style={{
                          padding: isMobile ? '12px 16px' : '16px 24px',
                          fontSize: isMobile ? '0.75rem' : '0.875rem',
                          color: '#6b7280'
                        }}>
                          {order.date}
                        </td>
                        <td style={{
                          padding: isMobile ? '12px 16px' : '16px 24px'
                        }}>
                          <span style={{
                            display: 'inline-flex',
                            padding: isMobile ? '2px 8px' : '4px 12px',
                            fontSize: isMobile ? '0.625rem' : '0.75rem',
                            fontWeight: 600,
                            borderRadius: '9999px',
                            backgroundColor: getStatusColor(order.status) + '20',
                            color: getStatusColor(order.status)
                          }}>
                            {order.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Dashboard;