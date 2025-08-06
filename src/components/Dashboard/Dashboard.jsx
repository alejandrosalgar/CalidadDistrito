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
  Button,
  Tabs,
  Tab,
  CircularProgress,
  Alert
} from '@mui/material';
import { 
  Menu as MenuIcon,
  // Iconos para las métricas
  Storage as StorageIcon,
  CheckCircle as CheckCircleIcon,
  Error as ErrorIcon,
  Schedule as ScheduleIcon,
  Analytics as AnalyticsIcon
} from '@mui/icons-material';
import Drawer from '../Drawer';
import QualityAnalysis from '../QualityAnalysis/QualityAnalysis';

const Dashboard = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [drawerOpen, setDrawerOpen] = useState(!isMobile);
  const [currentTab, setCurrentTab] = useState(0);
  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setDrawerOpen(!isMobile);
  }, [isMobile]);

  useEffect(() => {
    if (currentTab === 0) {
      fetchDashboardData();
    }
  }, [currentTab]);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      setError(null);

      // Fetch data from backend
      const response = await fetch('http://localhost:5000/api/calidad-todos');
      
      if (!response.ok) {
        throw new Error('Error al obtener datos del servidor');
      }

      const data = await response.json();
      
      if (data.error) {
        throw new Error(data.error);
      }

      setDashboardData(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDrawerToggle = () => {
    setDrawerOpen(!drawerOpen);
  };

  const handleTabChange = (event, newValue) => {
    setCurrentTab(newValue);
  };

  // Calcular métricas dinámicas basadas en datos reales
  const getMetrics = () => {
    if (!dashboardData) return [];

    const { cartera, recaudo } = dashboardData;
    const totalRegistros = (cartera?.total_registros || 0) + (recaudo?.total_registros || 0);
    const promedioConfianza = cartera && recaudo ? 
      (cartera.porcentaje_confianza + recaudo.porcentaje_confianza) / 2 : 0;
    
    // Calcular validaciones exitosas (registros con alta confianza)
    const validacionesExitosas = Math.round(totalRegistros * (promedioConfianza / 100));
    
    // Calcular tasa de errores
    const tasaErrores = 100 - promedioConfianza;
    
    return [
      { 
        title: 'Registros Procesados', 
        value: totalRegistros.toLocaleString(), 
        change: '+3.5%', 
        trend: 'up',
        icon: <StorageIcon />,
        iconColor: '#4a5568',
        iconBg: '#4a5568'
      },
      { 
        title: 'Validaciones Exitosas', 
        value: validacionesExitosas.toLocaleString(), 
        change: '+7.1%', 
        trend: 'up',
        icon: <CheckCircleIcon />,
        iconColor: '#3b82f6',
        iconBg: '#3b82f6'
      },
      { 
        title: 'Tasa de Errores', 
        value: `${tasaErrores.toFixed(1)}%`, 
        change: '+2.3%', 
        trend: 'up',
        icon: <ErrorIcon />,
        iconColor: '#10b981', // Verde
        iconBg: '#10b981'
      },
      { 
        title: 'Confianza General', 
        value: `${promedioConfianza.toFixed(1)}%`, 
        change: '+1.0%', 
        trend: 'up',
        icon: <ScheduleIcon />,
        iconColor: '#e91e63',
        iconBg: '#e91e63'
      },
    ];
  };

  // Session duration chart data - basado en datos reales
  const getSessionData = () => {
    if (!dashboardData) return [];

    const { cartera, recaudo } = dashboardData;
    const carteraConfianza = cartera?.porcentaje_confianza || 0;
    const recaudoConfianza = recaudo?.porcentaje_confianza || 0;
    
    return [
      { date: 'Cartera', newUsers: carteraConfianza, sessions: cartera?.total_registros || 0, avgDuration: carteraConfianza },
      { date: 'Recaudo', newUsers: recaudoConfianza, sessions: recaudo?.total_registros || 0, avgDuration: recaudoConfianza },
    ];
  };

  // Device distribution data - basado en datos reales
  const getDeviceData = () => {
    if (!dashboardData) return [];

    const { cartera, recaudo } = dashboardData;
    const carteraRegistros = cartera?.total_registros || 0;
    const recaudoRegistros = recaudo?.total_registros || 0;
    
    return [
      { name: 'Dataset Cartera', value: carteraRegistros, color: '#3b82f6' },
      { name: 'Dataset Recaudo', value: recaudoRegistros, color: '#10b981' },
    ];
  };

  // Language distribution data - basado en datos reales
  const getLanguageData = () => {
    if (!dashboardData) return [];

    const { cartera, recaudo } = dashboardData;
    const carteraColumnas = cartera?.columnas_analizadas?.length || 0;
    const recaudoColumnas = recaudo?.columnas_analizadas?.length || 0;
    
    return [
      { name: 'Columnas Cartera', value: carteraColumnas, color: '#10b981' },
      { name: 'Columnas Recaudo', value: recaudoColumnas, color: '#f59e0b' },
    ];
  };

  // Histogram data - basado en datos reales
  const getHistogramData = () => {
    if (!dashboardData) return [];

    const { cartera, recaudo } = dashboardData;
    const carteraConfianza = cartera?.porcentaje_confianza || 0;
    const recaudoConfianza = recaudo?.porcentaje_confianza || 0;
    
    return [
      { range: 'Cartera', value: carteraConfianza },
      { range: 'Recaudo', value: recaudoConfianza },
    ];
  };

  // Unique visitors data - basado en datos reales
  const getUniqueVisitorsData = () => {
    if (!dashboardData) return [];

    const { cartera, recaudo } = dashboardData;
    const carteraRegistros = cartera?.total_registros || 0;
    const recaudoRegistros = recaudo?.total_registros || 0;
    
    return [
      { date: 'Cartera', pageViews: carteraRegistros, sessions: carteraRegistros * 0.8 },
      { date: 'Recaudo', pageViews: recaudoRegistros, sessions: recaudoRegistros * 0.8 },
    ];
  };

  // Income overview data - basado en datos reales
  const getIncomeData = () => {
    if (!dashboardData) return [];

    const { cartera, recaudo } = dashboardData;
    const carteraConfianza = cartera?.porcentaje_confianza || 0;
    const recaudoConfianza = recaudo?.porcentaje_confianza || 0;
    
    return [
      { month: 'Cartera', income: carteraConfianza },
      { month: 'Recaudo', income: recaudoConfianza },
    ];
  };

  // Orders data - basado en datos reales
  const getOrders = () => {
    if (!dashboardData) return [];

    const { cartera, recaudo } = dashboardData;
    const now = new Date();
    
    return [
      { 
        id: 'VAL-001', 
        customer: 'Dataset Cartera', 
        date: now.toLocaleDateString(), 
        status: cartera?.porcentaje_confianza >= 80 ? 'Completado' : cartera?.porcentaje_confianza >= 60 ? 'Validando' : 'Error' 
      },
      { 
        id: 'VAL-002', 
        customer: 'Dataset Recaudo', 
        date: now.toLocaleDateString(), 
        status: recaudo?.porcentaje_confianza >= 80 ? 'Completado' : recaudo?.porcentaje_confianza >= 60 ? 'Validando' : 'Error' 
      },
    ];
  };

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

  const renderDashboardContent = () => {
    if (loading) {
      return (
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '400px' }}>
          <CircularProgress />
        </Box>
      );
    }

    if (error) {
      return (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      );
    }

    const metrics = getMetrics();
    const sessionData = getSessionData();
    const deviceData = getDeviceData();
    const languageData = getLanguageData();
    const histogramData = getHistogramData();
    const uniqueVisitorsData = getUniqueVisitorsData();
    const incomeData = getIncomeData();
    const orders = getOrders();

    return (
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
                    Confianza
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
                    Registros
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
                    Promedio
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
              Distribución de Datasets
            </Typography>

            <Box sx={{ mb: 3 }}>
              <Typography variant="subtitle2" sx={{
                fontSize: isMobile ? '0.75rem' : '0.875rem',
                fontWeight: 500,
                color: '#6b7280',
                mb: 1
              }}>
                Registros por Dataset
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
                Columnas por Dataset
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
          alignItems: 'stretch'
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
              Confianza por Dataset
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
                    strokeDasharray={`${dashboardData?.resumen?.promedio_confianza * 2.2 || 60 * 2.2}, 220`}
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
                    {dashboardData?.resumen?.promedio_confianza?.toFixed(1) || '60'} / 100
                  </text>
                </svg>
              </Box>
            </Box>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
              {[
                { label: 'Cartera', value: dashboardData?.cartera?.porcentaje_confianza || 0 },
                { label: 'Recaudo', value: dashboardData?.recaudo?.porcentaje_confianza || 0 },
                { label: 'Promedio', value: dashboardData?.resumen?.promedio_confianza || 0 }
              ].map((item, index) => {
                const colors = ['#14b8a6', '#f59e0b', '#10b981'];
                return (
                  <Box key={item.label} sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between'
                  }}>
                    <Typography variant="body2" sx={{ 
                      fontSize: isMobile ? '0.75rem' : '0.875rem', 
                      color: '#6b7280' 
                    }}>
                      {item.label}
                    </Typography>
                    <Box sx={{
                      width: isMobile ? 60 : 80,
                      height: 8,
                      bgcolor: '#e5e7eb',
                      borderRadius: 1,
                      overflow: 'hidden'
                    }}>
                      <Box sx={{
                        width: `${item.value}%`,
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
          alignItems: 'stretch'
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
                  Datasets
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
                  Estadísticas Generales
                </Typography>
                <Typography variant="h5" sx={{
                  fontSize: isMobile ? '1.25rem' : '1.5rem',
                  fontWeight: 'bold',
                  color: '#111827'
                }}>
                  {dashboardData?.resumen?.total_datasets || 2}
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
    );
  };

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

          {/* Tabs for navigation */}
          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <Tabs value={currentTab} onChange={handleTabChange} sx={{ minHeight: 'auto' }}>
              <Tab 
                label="Dashboard" 
                icon={<AnalyticsIcon />} 
                iconPosition="start"
                sx={{ 
                  minHeight: 'auto',
                  py: 1,
                  px: 2,
                  fontSize: '0.875rem',
                  fontWeight: 500
                }}
              />
              <Tab 
                label="Análisis de Calidad" 
                icon={<AnalyticsIcon />} 
                iconPosition="start"
                sx={{ 
                  minHeight: 'auto',
                  py: 1,
                  px: 2,
                  fontSize: '0.875rem',
                  fontWeight: 500
                }}
              />
            </Tabs>
          </Box>
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
          {currentTab === 0 ? renderDashboardContent() : <QualityAnalysis />}
        </Box>
      </Box>
    </Box>
  );
};

export default Dashboard;