import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Card,
  CardContent,
  Grid,
  CircularProgress,
  Alert,
  Chip,
  LinearProgress,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper
} from '@mui/material';
import {
  ExpandMore as ExpandMoreIcon,
  CheckCircle as CheckCircleIcon,
  Error as ErrorIcon,
  Warning as WarningIcon,
  Info as InfoIcon
} from '@mui/icons-material';

const QualityAnalysis = () => {
  const [carteraData, setCarteraData] = useState(null);
  const [recaudoData, setRecaudoData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchQualityData();
  }, []);

  const fetchQualityData = async () => {
    try {
      setLoading(true);
      setError(null);

      // Fetch data from both endpoints
      const [carteraResponse, recaudoResponse] = await Promise.all([
        fetch('http://localhost:5000/api/calidad-cartera'),
        fetch('http://localhost:5000/api/calidad-recaudo')
      ]);

      if (!carteraResponse.ok || !recaudoResponse.ok) {
        throw new Error('Error al obtener datos del servidor');
      }

      const carteraResult = await carteraResponse.json();
      const recaudoResult = await recaudoResponse.json();

      if (carteraResult.error) {
        throw new Error(carteraResult.error);
      }

      if (recaudoResult.error) {
        throw new Error(recaudoResult.error);
      }

      setCarteraData(carteraResult);
      setRecaudoData(recaudoResult);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const getQualityColor = (percentage) => {
    if (percentage >= 90) return '#10b981'; // Green
    if (percentage >= 70) return '#f59e0b'; // Yellow
    return '#ef4444'; // Red
  };

  const getQualityIcon = (percentage) => {
    if (percentage >= 90) return <CheckCircleIcon sx={{ color: '#10b981' }} />;
    if (percentage >= 70) return <WarningIcon sx={{ color: '#f59e0b' }} />;
    return <ErrorIcon sx={{ color: '#ef4444' }} />;
  };

  const renderColumnAnalysis = (columnData, columnName) => {
    const { valores_nulos, porcentaje_nulos, valores_unicos, analisis_especifico } = columnData;
    
    return (
      <Accordion key={columnName}>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, width: '100%' }}>
            <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
              {columnName}
            </Typography>
            {getQualityIcon(100 - porcentaje_nulos)}
          </Box>
        </AccordionSummary>
        <AccordionDetails>
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <Typography variant="body2" color="text.secondary">
                <strong>Valores nulos:</strong> {valores_nulos} ({porcentaje_nulos}%)
              </Typography>
              <Typography variant="body2" color="text.secondary">
                <strong>Valores únicos:</strong> {valores_unicos}
              </Typography>
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography variant="body2" color="text.secondary">
                <strong>Tipo esperado:</strong> {analisis_especifico.tipo_esperado}
              </Typography>
              {analisis_especifico.porcentaje_validez && (
                <Typography variant="body2" color="text.secondary">
                  <strong>Porcentaje de validez:</strong> {analisis_especifico.porcentaje_validez}%
                </Typography>
              )}
              {analisis_especifico.porcentaje_numericos && (
                <Typography variant="body2" color="text.secondary">
                  <strong>Porcentaje numérico:</strong> {analisis_especifico.porcentaje_numericos}%
                </Typography>
              )}
              {analisis_especifico.porcentaje_fechas_validas && (
                <Typography variant="body2" color="text.secondary">
                  <strong>Fechas válidas:</strong> {analisis_especifico.porcentaje_fechas_validas}%
                </Typography>
              )}
            </Grid>
          </Grid>
        </AccordionDetails>
      </Accordion>
    );
  };

  const renderDatasetCard = (data, title) => {
    if (!data) return null;

    const { total_registros, columnas_analizadas, porcentaje_confianza, analisis_columnas, fecha_analisis } = data;

    return (
      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
            <Typography variant="h5" component="h2" sx={{ fontWeight: 600 }}>
              {title}
            </Typography>
            {getQualityIcon(porcentaje_confianza)}
          </Box>

          <Grid container spacing={3} sx={{ mb: 3 }}>
            <Grid item xs={12} md={4}>
              <Box sx={{ textAlign: 'center' }}>
                <Typography variant="h4" sx={{ 
                  fontWeight: 'bold', 
                  color: getQualityColor(porcentaje_confianza) 
                }}>
                  {porcentaje_confianza}%
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Confianza General
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={12} md={4}>
              <Box sx={{ textAlign: 'center' }}>
                <Typography variant="h4" sx={{ fontWeight: 'bold' }}>
                  {total_registros.toLocaleString()}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Total Registros
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={12} md={4}>
              <Box sx={{ textAlign: 'center' }}>
                <Typography variant="h4" sx={{ fontWeight: 'bold' }}>
                  {columnas_analizadas.length}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Columnas Analizadas
                </Typography>
              </Box>
            </Grid>
          </Grid>

          <Box sx={{ mb: 2 }}>
            <Typography variant="h6" sx={{ mb: 2 }}>
              Análisis por Columna
            </Typography>
            {Object.entries(analisis_columnas).map(([columnName, columnData]) =>
              renderColumnAnalysis(columnData, columnName)
            )}
          </Box>

          <Typography variant="caption" color="text.secondary">
            Última actualización: {new Date(fecha_analisis).toLocaleString()}
          </Typography>
        </CardContent>
      </Card>
    );
  };

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

  return (
    <Box>
      <Typography variant="h4" sx={{ mb: 3, fontWeight: 600 }}>
        Análisis de Calidad de Datos
      </Typography>

      {renderDatasetCard(carteraData, 'Dataset Cartera')}
      {renderDatasetCard(recaudoData, 'Dataset Recaudo')}

      <Box sx={{ mt: 3 }}>
        <Typography variant="h6" sx={{ mb: 2 }}>
          Resumen General
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <Card>
              <CardContent>
                <Typography variant="h6" sx={{ mb: 1 }}>
                  Promedio de Confianza
                </Typography>
                <Typography variant="h4" sx={{ 
                  fontWeight: 'bold',
                  color: getQualityColor((carteraData?.porcentaje_confianza || 0 + recaudoData?.porcentaje_confianza || 0) / 2)
                }}>
                  {((carteraData?.porcentaje_confianza || 0 + recaudoData?.porcentaje_confianza || 0) / 2).toFixed(1)}%
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={6}>
            <Card>
              <CardContent>
                <Typography variant="h6" sx={{ mb: 1 }}>
                  Total de Registros
                </Typography>
                <Typography variant="h4" sx={{ fontWeight: 'bold' }}>
                  {((carteraData?.total_registros || 0) + (recaudoData?.total_registros || 0)).toLocaleString()}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default QualityAnalysis; 