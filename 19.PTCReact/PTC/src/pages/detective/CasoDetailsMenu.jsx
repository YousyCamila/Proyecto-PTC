

import React, { useState, useEffect } from 'react';
import { Box, Button, Typography, Dialog, DialogActions, DialogContent, Divider } from '@mui/material';
import EvidenciasCrud from './EvidenciasCrud';

const CasoDetailsMenu = ({ caso, onClose }) => {
  const [view, setView] = useState('details');
  const [loadedCaso, setLoadedCaso] = useState(caso); // Estado para el caso cargado

  const fetchCasoDetails = async (casoId) => {
    try {
      const response = await fetch(`/api/casos/${casoId}`);
      const data = await response.json();
      setLoadedCaso(data);
    } catch (error) {
      console.error('Error al cargar los detalles del caso:', error);
    }
  };

  useEffect(() => {
    if (caso?._id) {
      fetchCasoDetails(caso._id);
    }
  }, [caso]);

  const handleViewDetails = () => setView('details');
  const handleViewEvidencias = () => setView('evidencias');
  const handleViewContrato = () => setView('contrato');
  const handleViewRegistroCasos = () => setView('registro');

  const renderContent = () => {
    switch (view) {
      case 'evidencias':
        return <EvidenciasCrud evidencias={loadedCaso?.evidencias || []} casoId={loadedCaso?._id} />;
      case 'contrato':
        return <Typography variant="body1">Contrato en construcción...</Typography>;
      case 'registro':
        return <Typography variant="body1">Registros en construcción...</Typography>;
      default:
        return (
          <Box>
            <Typography variant="h5" sx={{ mb: 2, fontWeight: 'bold', color: '#004c7f' }}>
              Detalles del Caso: {loadedCaso?.nombreCaso || 'No disponible'}
            </Typography>
            <Divider sx={{ mb: 2 }} />
            <Typography variant="body1"><strong>ID del Caso:</strong> {loadedCaso?._id}</Typography>
            <Typography variant="body1"><strong>Estado:</strong> {loadedCaso?.activo ? 'Activo' : 'Inactivo'}</Typography>
            <Typography variant="body1"><strong>Detective:</strong> {loadedCaso?.idDetective?.nombre || 'No asignado'}</Typography>
          </Box>
        );
    }
  };

  return (
    <Dialog open={true} onClose={onClose} maxWidth="lg" fullWidth>
      <Box sx={{ display: 'flex', minHeight: '60vh' }}>
        <Box sx={{ width: '250px', backgroundColor: '#003b5c', color: '#ffffff', padding: 3 }}>
          <Typography variant="h5" sx={{ mb: 4, fontWeight: 'bold' }}>Opciones</Typography>
          <Button onClick={handleViewDetails} fullWidth sx={{ mb: 2 }}>Detalles</Button>
          <Button onClick={handleViewEvidencias} fullWidth sx={{ mb: 2 }}>Evidencias</Button>
          <Button onClick={handleViewContrato} fullWidth sx={{ mb: 2 }}>Contrato</Button>
          <Button onClick={handleViewRegistroCasos} fullWidth sx={{ mb: 2 }}>Registros</Button>
        </Box>
        <Box sx={{ flex: 1, padding: 4 }}>
          <DialogContent>{renderContent()}</DialogContent>
        </Box>
      </Box>
      <DialogActions>
        <Button onClick={onClose}>Cerrar</Button>
      </DialogActions>
    </Dialog>
  );
};

export default CasoDetailsMenu;
