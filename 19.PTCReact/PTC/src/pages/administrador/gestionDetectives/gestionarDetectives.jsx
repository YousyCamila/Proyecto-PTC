import React, { useState, useEffect } from 'react';
import {
  Box,
  Button,
  Container,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Snackbar,
  Tooltip,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import VisibilityIcon from '@mui/icons-material/Visibility';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import NavbarSidebar from '../NavbarSidebar'; // Importa tu NavbarSidebar

const GestionarDetectives = () => {
  const [detectives, setDetectives] = useState([]);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const navigate = useNavigate();

  // Fetch detectives from the API
  const fetchDetectives = async () => {
    try {
      const response = await fetch("http://localhost:3000/api/detectives"); // Cambiar a la ruta de detectives
      const data = await response.json();
      setDetectives(data);
    } catch (error) {
      console.error("Error fetching detectives:", error);
      setSnackbarMessage('Error al cargar los detectives');
      setOpenSnackbar(true);
    }
  };

  useEffect(() => {
    fetchDetectives();
  }, []);

  const handleEdit = (detectiveId) => {
    navigate(`/editar-detective/${detectiveId}`);
  };

  const handleDetails = (detectiveId) => {
    navigate(`/detalles-detective/${detectiveId}`);
  };

  const handleDeactivate = async (detectiveId) => {
    const confirm = await Swal.fire({
      title: '¿Estás seguro?',
      text: "Cambiará el estado del detective a inactivo.",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Sí, desactivar',
    });
  
    if (confirm.isConfirmed) {
      try {
        // Hacer una solicitud PATCH para desactivar el detective
        const response = await fetch(`http://localhost:3000/api/detectives/${detectiveId}`, {
          method: 'PATCH',  // Usamos PATCH para actualizar el estado
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            activo: false,  // Cambiamos el estado de activo a false
          }),
        });
  
        if (response.ok) {
          // Actualizar el estado localmente
          setDetectives(prevDetectives => prevDetectives.map(detective =>
            detective._id === detectiveId ? { ...detective, activo: false } : detective
          ));
          Swal.fire('Desactivado!', 'El detective ha sido desactivado.', 'success');
        } else {
          throw new Error('Error al desactivar el detective');
        }
      } catch (error) {
        console.error("Error al desactivar detective:", error);
        setSnackbarMessage('No se pudo desactivar el detective.');
        setOpenSnackbar(true);
      }
    }
  };
  
  const handleCreate = () => {
    navigate('/crear-detective');
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  const handleBack = () => {
    navigate('/admin-menu'); // Navegar al menú administrativo
  };

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
      {/* NavbarSidebar */}
      <NavbarSidebar />

      <Container
        maxWidth="lg"
        sx={{
          background: 'white',
          borderRadius: 2,
          padding: 4,
          boxShadow: 3,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'flex-start',
          minHeight: '80vh',
          marginTop: 4,
        }}
      >
        {/* Título */}
        <Typography
          variant="h4"
          component="h1"
          gutterBottom
          sx={{
            textAlign: 'center',
            color: '#0077b6',
            fontWeight: 'bold',
            marginBottom: 4,
          }}
        >
          Gestionar Detectives
        </Typography>

        {/* Botones */}
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
          <Button
            variant="contained"
            onClick={handleCreate}
            sx={{
              backgroundColor: '#0077b6',
              '&:hover': { backgroundColor: '#005f91' },
            }}
          >
            Crear Detective
          </Button>
          <Button
            variant="outlined"
            onClick={handleBack}
            sx={{
              color: '#0077b6',
              borderColor: '#0077b6',
              '&:hover': { backgroundColor: '#e0e0e0' },
            }}
          >
            Volver al Menú
          </Button>
        </Box>

        {/* Tabla con scroll */}
        <TableContainer component={Paper} sx={{ maxHeight: '400px', overflowY: 'auto' }}>
          <Table stickyHeader>
            <TableHead>
              <TableRow>
                <TableCell sx={{ fontWeight: 'bold', backgroundColor: '#005f91', color: 'white' }}>
                  <strong>Número de Documento</strong>
                </TableCell>
                <TableCell sx={{ fontWeight: 'bold', backgroundColor: '#005f91', color: 'white' }}>
                  <strong>Nombre</strong>
                </TableCell>
                <TableCell sx={{ fontWeight: 'bold', backgroundColor: '#005f91', color: 'white' }}>
                  <strong>Activo</strong>
                </TableCell>
                <TableCell sx={{ fontWeight: 'bold', backgroundColor: '#005f91', color: 'white' }}>
                  <strong>Especialidad</strong>
                </TableCell>
                <TableCell align="right" sx={{ fontWeight: 'bold', backgroundColor: '#005f91', color: 'white' }}>
                  <strong>Acciones</strong>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {detectives.map((detective) => (
                <TableRow key={detective._id}>
                  <TableCell>{detective.numeroDocumento}</TableCell>
                  <TableCell>{detective.nombres} {detective.apellidos}</TableCell>
                  <TableCell>{detective.activo ? 'Sí' : 'No'}</TableCell>
                  <TableCell>{detective.especialidad || 'N/A'}</TableCell>
                  <TableCell align="right">
                    <Tooltip title="Ver Detalles" arrow>
                      <IconButton onClick={() => handleDetails(detective._id)} color="primary">
                        <VisibilityIcon />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Editar Detective" arrow>
                      <IconButton onClick={() => handleEdit(detective._id)} color="primary">
                        <EditIcon />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Desactivar Detective" arrow>
                      <IconButton onClick={() => handleDeactivate(detective._id)} color="error">
                        <DeleteIcon />
                      </IconButton>
                    </Tooltip>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        <Snackbar
          open={openSnackbar}
          autoHideDuration={6000}
          onClose={handleCloseSnackbar}
          message={snackbarMessage}
        />
      </Container>
    </Box>
  );
};

export default GestionarDetectives;
