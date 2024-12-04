

import React, { useState } from 'react';
import {
  Box,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton
} from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';
import AddIcon from '@mui/icons-material/Add';
import { useNavigate } from 'react-router-dom';

const EvidenciasCrudDetective = ({ evidencias = [], detectiveId }) => {
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedEvidencia, setSelectedEvidencia] = useState(null);
  const navigate = useNavigate();

  const handleViewEvidencia = (evidencia) => {
    setSelectedEvidencia(evidencia);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSelectedEvidencia(null);
  };

  const handleAddEvidencia = () => {
    navigate(`/agregar-evidencia/${detectiveId}`);
  };

  return (
    <Box>
      <Typography variant="h5" sx={{ mb: 2 }}>
        Evidencias Recopiladas por el Detective
      </Typography>

      <Button
        variant="contained"
        startIcon={<AddIcon />}
        onClick={handleAddEvidencia}
        sx={{ mb: 3, backgroundColor: '#0077b6', '&:hover': { backgroundColor: '#005f91' } }}
      >
        Agregar Evidencia
      </Button>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell sx={{ fontWeight: 'bold', backgroundColor: '#005f91', color: 'white' }}>Fecha</TableCell>
              <TableCell sx={{ fontWeight: 'bold', backgroundColor: '#005f91', color: 'white' }}>Descripción</TableCell>
              <TableCell sx={{ fontWeight: 'bold', backgroundColor: '#005f91', color: 'white' }}>Tipo</TableCell>
              <TableCell sx={{ fontWeight: 'bold', backgroundColor: '#005f91', color: 'white' }}>Detective</TableCell>
              <TableCell sx={{ fontWeight: 'bold', backgroundColor: '#005f91', color: 'white' }}>Acciones</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {evidencias.length > 0 ? (
              evidencias.map((evidencia, index) => (
                <TableRow key={index}>
                  <TableCell>{evidencia.fechaEvidencia}</TableCell>
                  <TableCell>{evidencia.descripcion}</TableCell>
                  <TableCell>{evidencia.tipoEvidencia}</TableCell>
                  <TableCell>{evidencia.detectiveNombre || 'N/A'}</TableCell>
                  <TableCell>
                    <IconButton onClick={() => handleViewEvidencia(evidencia)}>
                      <VisibilityIcon color="primary" />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={5} sx={{ textAlign: 'center' }}>
                  No hay evidencias asociadas a este detective.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>Detalles de la Evidencia</DialogTitle>
        <DialogContent>
          {selectedEvidencia ? (
            <>
              <Typography variant="body1"><strong>Fecha:</strong> {selectedEvidencia.fechaEvidencia}</Typography>
              <Typography variant="body1"><strong>Descripción:</strong> {selectedEvidencia.descripcion}</Typography>
              <Typography variant="body1"><strong>Tipo de Evidencia:</strong> {selectedEvidencia.tipoEvidencia}</Typography>
              <Typography variant="body1"><strong>Detective:</strong> {selectedEvidencia.detectiveNombre || 'No especificado'}</Typography>
            </>
          ) : (
            <Typography>No se seleccionó ninguna evidencia.</Typography>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => navigate('/ver-evidencia')} color="primary">
            Ver Evidencia
          </Button>
          <Button onClick={handleCloseDialog} color="secondary">
            Cerrar
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default EvidenciasCrudDetective;
