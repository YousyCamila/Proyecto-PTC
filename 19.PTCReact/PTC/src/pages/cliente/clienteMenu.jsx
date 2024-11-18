import React, { useEffect, useState } from 'react';
import {
  Box,
  Container,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Snackbar,
  IconButton,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import VisibilityIcon from '@mui/icons-material/Visibility';
import MenuOpenIcon from '@mui/icons-material/MenuOpen';
import CasoDetailsMenu from './CasoDetailsMenu';

const ClienteMenu = () => {
  const [casos, setCasos] = useState([]);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [selectedCaso, setSelectedCaso] = useState(null); // Caso seleccionado para ver detalles
  const navigate = useNavigate();

  const email = localStorage.getItem('email'); // Obtiene el email del cliente desde el localStorage
  const API_URL = 'http://localhost:3000/api';

  // Función para buscar casos por correo electrónico
  const fetchCasosByEmail = async (emailCliente) => {
    try {
      const response = await fetch(`${API_URL}/caso/cliente/email/${emailCliente}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const data = await response.json();

      if (response.ok) {
        setCasos(data.casos || []); // Asegurarse de usar solo los casos
      } else {
        throw new Error(data.message || 'Error al buscar los casos');
      }
    } catch (error) {
      console.error('Error fetching casos by email:', error);
      setSnackbarMessage(`Error al buscar los casos: ${error.message}`);
      setOpenSnackbar(true);
    }
  };

  const handleBackToLogin = () => {
    navigate('/login'); // Redirige al login
  };

  const handleOpenCasoDetails = (caso) => {
    setSelectedCaso(caso); // Guardar el caso seleccionado
  };

  const handleCloseCasoDetails = () => {
    setSelectedCaso(null); // Cerrar el menú de detalles del caso
  };

  const handleViewDetails = (caso) => {
    const evidenciasFormatted =
      caso.evidencias && caso.evidencias.length > 0
        ? caso.evidencias
            .map(
              (evidencia, index) =>
                `<li>
                  <strong>Fecha:</strong> ${new Date(evidencia.fechaEvidencia).toLocaleDateString()},
                  <strong>Descripción:</strong> ${evidencia.descripcion},
                  <strong>Tipo:</strong> ${evidencia.tipoEvidencia}
                </li>`
            )
            .join('')
        : 'No hay evidencias asociadas.';

    Swal.fire({
      title: `Detalles del Caso: ${caso.nombreCaso}`,
      html: `
        <div><strong>Nombre del Caso:</strong> ${caso.nombreCaso}</div>
        <div><strong>Estado:</strong> ${caso.activo ? 'Activo' : 'Inactivo'}</div>
        <div><strong>ID del Caso:</strong> ${caso._id}</div>
        <div><strong>Detective Asignado:</strong> ${caso.idDetective ? `${caso.idDetective.nombres} ${caso.idDetective.apellidos}` : 'No asignado'}</div>
        <div><strong>Evidencias:</strong><ul>${evidenciasFormatted}</ul></div>
        <div><strong>Registro de Casos:</strong> ${
          caso.registroCasos && caso.registroCasos.length > 0 ? caso.registroCasos.join(', ') : 'No hay registros asociados.'
        }</div>
      `,
      icon: 'info',
      confirmButtonText: 'Cerrar',
    });
  };

  useEffect(() => {
    if (email) {
      fetchCasosByEmail(email); // Cargar los casos automáticamente si el email está definido
    }
  }, [email]);

  return (
    <Box sx={{ width: '100vw', height: '100vh', background: 'linear-gradient(to right, #ffffff, #e0e0e0)', display: 'flex', justifyContent: 'center', alignItems: 'center', position: 'relative' }}>
      {/* Botón de "Salir" en la esquina superior izquierda con estilo visible */}
      <Button
        variant="contained"
        onClick={handleBackToLogin}
        sx={{
          position: 'absolute',
          top: 16,
          left: 16,
          color: '#ffffff',
          backgroundColor: '#005f91',
          '&:hover': {
            backgroundColor: '#d9d9d9',
          },
        }}
      >
        Salir
      </Button>

      <Container maxWidth="lg" sx={{ background: 'white', borderRadius: 2, padding: 4, boxShadow: 3 }}>
        <Typography variant="h4" component="h1" gutterBottom sx={{ textAlign: 'center', color: '#000000' }}>
          Casos Asociados al Cliente
        </Typography>

        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell sx={{ fontWeight: 'bold', backgroundColor: '#005f91', color: 'white' }}>Nombre del Caso</TableCell>
                <TableCell sx={{ fontWeight: 'bold', backgroundColor: '#005f91', color: 'white' }}>Estado</TableCell>
                <TableCell sx={{ fontWeight: 'bold', backgroundColor: '#005f91', color: 'white' }}>Detective</TableCell>
                <TableCell sx={{ fontWeight: 'bold', backgroundColor: '#005f91', color: 'white' }}>Acciones</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {casos.length > 0 ? (
                casos.map((caso) => (
                  <TableRow key={caso._id}>
                    <TableCell>{caso.nombreCaso}</TableCell>
                    <TableCell>{caso.activo ? 'Activo' : 'Inactivo'}</TableCell>
                    <TableCell>
                      {caso.idDetective
                        ? `${caso.idDetective.nombres} ${caso.idDetective.apellidos}`
                        : 'No asignado'}
                    </TableCell>
                    <TableCell>
                      <IconButton onClick={() => handleViewDetails(caso)}>
                        <VisibilityIcon color="primary" />
                      </IconButton>
                      <IconButton onClick={() => handleOpenCasoDetails(caso)}>
                        <MenuOpenIcon color="secondary" />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={4} sx={{ textAlign: 'center' }}>
                    No hay casos asociados para este cliente.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Container>

      <Snackbar open={openSnackbar} autoHideDuration={6000} onClose={() => setOpenSnackbar(false)} message={snackbarMessage} />

      {selectedCaso && <CasoDetailsMenu caso={selectedCaso} onClose={handleCloseCasoDetails} />}
    </Box>
  );
};

export default ClienteMenu;
