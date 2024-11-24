import React, { useEffect, useState } from 'react';
import {
  Box,
  Container,
  Paper,
  Typography,
  Grid,
  Tabs,
  Tab,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  List,
  ListItem,
  ListItemText,
  Button,
} from '@mui/material';
import { useParams, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import NavbarSidebar from '../NavbarSidebar'; 

const DetallesDetective = () => {
  const { id } = useParams(); // Obtener el ID del detective de la URL
  const [detective, setDetective] = useState(null);
  const navigate = useNavigate();
  const [tabValue, setTabValue] = useState(0);

  // Fetch detective details from the API
  const fetchDetective = async () => {
    try {
      const response = await fetch(`http://localhost:3000/api/detectives/${id}`);
      const data = await response.json();

      if (response.ok) {
        setDetective(data);
      } else {
        throw new Error(data.error);
      }
    } catch (error) {
      console.error("Error fetching detective:", error);
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'No se pudo cargar la información del detective.',
      });
    }
  };

  useEffect(() => {
    fetchDetective();
  }, [id]);

  const handleBack = () => {
    navigate('/gestionar-detectives'); // Navegar a la lista de detectives
  };

  if (!detective) return <div>Cargando...</div>; // Mostrar un mensaje de carga si no se ha cargado el detective

  return (
    <Box
      sx={{
        width: '100vw',
        height: '100vh',
        background: 'linear-gradient(to right, #001f3f, #0077b6)',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <NavbarSidebar />

      <Container maxWidth="lg" sx={{ marginTop: 4 }}>
        <Paper sx={{ padding: 4, borderRadius: 2, boxShadow: 3 }}>
          <Typography
            variant="h4"
            component="h1"
            gutterBottom
            sx={{ textAlign: 'center', color: '#0077b6' }}
          >
            Detalles del Detective
          </Typography>

          <Tabs value={tabValue} onChange={(e, newValue) => setTabValue(newValue)} centered>
            <Tab label="Información Personal" />
            <Tab label="Detalles Adicionales" />
          </Tabs>

          {tabValue === 0 && (
            <Box>
              <Grid container spacing={3}>
                <Grid item xs={12}>
                  <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#005f91' }}>
                    Información Personal
                  </Typography>
                </Grid>
                <Grid item xs={12} md={6}>
                  <Typography variant="body1">
                    <strong>ID:</strong> {detective._id}
                  </Typography>
                </Grid>
                <Grid item xs={12} md={6}>
                  <Typography variant="body1">
                    <strong>Nombres:</strong> {detective.nombres}
                  </Typography>
                </Grid>
                <Grid item xs={12} md={6}>
                  <Typography variant="body1">
                    <strong>Apellidos:</strong> {detective.apellidos}
                  </Typography>
                </Grid>
                <Grid item xs={12} md={6}>
                  <Typography variant="body1">
                    <strong>Correo:</strong> {detective.correo}
                  </Typography>
                </Grid>
                <Grid item xs={12} md={6}>
                  <Typography variant="body1">
                    <strong>Tipo de Documento:</strong> {detective.tipoDocumento}
                  </Typography>
                </Grid>
                <Grid item xs={12} md={6}>
                  <Typography variant="body1">
                    <strong>Número de Documento:</strong> {detective.numeroDocumento}
                  </Typography>
                </Grid>
                <Grid item xs={12} md={6}>
                  <Typography variant="body1">
                    <strong>Fecha de Nacimiento:</strong>{' '}
                    {new Date(detective.fechaNacimiento).toLocaleDateString()}
                  </Typography>
                </Grid>
                <Grid item xs={12} md={6}>
                  <Typography variant="body1">
                    <strong>Estado:</strong> {detective.activo ? 'Activo' : 'Inactivo'}
                  </Typography>
                </Grid>
                <Grid item xs={12} md={6}>
                  <Typography variant="body1">
                    <strong>Especialidad:</strong>{' '}
                    {detective.especialidad && detective.especialidad.length > 0
                      ? detective.especialidad.join(', ')
                      : 'No especificada'}
                  </Typography>
                </Grid>
              </Grid>
            </Box>
          )}

          {tabValue === 1 && (
            <Box sx={{ maxHeight: '60vh', overflowY: 'auto' }}>
              <Accordion>
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                  <Typography>Casos ({detective.casos.length})</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <List>
                    {detective.casos.length > 0 ? (
                      detective.casos.map((caso, index) => (
                        <ListItem key={index}>
                          <ListItemText primary={caso.nombre} />
                        </ListItem>
                      ))
                    ) : (
                      <Typography variant="body2">No hay casos asociados.</Typography>
                    )}
                  </List>
                </AccordionDetails>
              </Accordion>

              <Accordion>
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                  <Typography>Historial de Casos ({detective.historialCasos.length})</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <List>
                    {detective.historialCasos.length > 0 ? (
                      detective.historialCasos.map((historial, index) => (
                        <ListItem key={index}>
                          <ListItemText primary={historial.nombre} />
                        </ListItem>
                      ))
                    ) : (
                      <Typography variant="body2">No hay historial de casos.</Typography>
                    )}
                  </List>
                </AccordionDetails>
              </Accordion>

              <Accordion>
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                  <Typography>Contratos ({detective.contratos.length})</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <List>
                    {detective.contratos.length > 0 ? (
                      detective.contratos.map((contrato, index) => (
                        <ListItem key={index}>
                          <ListItemText primary={contrato.nombre} />
                        </ListItem>
                      ))
                    ) : (
                      <Typography variant="body2">No hay contratos asociados.</Typography>
                    )}
                  </List>
                </AccordionDetails>
              </Accordion>
            </Box>
          )}

          <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
            <Button
              variant="outlined"
              onClick={handleBack}
              sx={{
                color: '#0077b6',
                borderColor: '#0077b6',
                '&:hover': { backgroundColor: '#e0e0e0' },
              }}
            >
              Volver a la Gestión de Detectives
            </Button>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
};

export default DetallesDetective;
