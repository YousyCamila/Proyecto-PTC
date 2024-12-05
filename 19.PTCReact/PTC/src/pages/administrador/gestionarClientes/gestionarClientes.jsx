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
  Stack,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import VisibilityIcon from '@mui/icons-material/Visibility';
import RefreshIcon from '@mui/icons-material/Refresh';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import NavbarSidebar from '../NavbarSidebar'; // Importa tu NavbarSidebar

const GestionarClientes = () => {
  const [clientes, setClientes] = useState([]);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const navigate = useNavigate();

  // Función para obtener la lista de clientes
  const fetchClientes = async () => {
    try {
      const response = await fetch('http://localhost:3000/api/clientes');
      const data = await response.json();
      setClientes(data);
    } catch (error) {
      console.error('Error fetching clientes:', error);
      setSnackbarMessage('Error al cargar los clientes');
      setOpenSnackbar(true);
    }
  };

  useEffect(() => {
    fetchClientes();
  }, []);

  const handleEdit = (clienteId) => {
    navigate(`/editar-cliente/${clienteId}`);
  };

  const handleDetails = (clienteId) => {
    navigate(`/detalles-cliente/${clienteId}`);
  };

  const handleDeactivate = async (clienteId) => {
    const confirm = await Swal.fire({
      title: '¿Estás seguro?',
      text: 'Cambiará el estado del cliente a inactivo.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Sí, desactivar',
    });

    if (confirm.isConfirmed) {
      try {
        await fetch(`http://localhost:3000/api/clientes/${clienteId}`, {
          method: 'DELETE',
        });
        setClientes((prevClientes) =>
          prevClientes.map((cliente) =>
            cliente._id === clienteId ? { ...cliente, activo: false } : cliente
          )
        );
        Swal.fire('Desactivado!', 'El cliente ha sido desactivado.', 'success');
      } catch (error) {
        console.error('Error al desactivar cliente:', error);
        setSnackbarMessage('No se pudo desactivar el cliente.');
        setOpenSnackbar(true);
      }
    }
  };

  const handleCreate = () => {
    navigate('/crear-cliente');
  };

  const handleBack = () => {
    navigate('/admin-menu');
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
        {/* Agregar el NavbarSidebar aquí */}
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
            justifyContent: 'flex-start', // Asegura que el título se quede en la parte superior
            minHeight: '80vh',
            marginTop: 4, // Añadir margen superior
          }}
        >
          {/* Título fijado en la parte superior */}
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
            startIcon={<ArrowBackIcon />}
          >
            Gestionar Clientes
          </Typography>
    
          {/* Botones de acción */}
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
            <Button
              variant="contained"
              onClick={handleCreate}
              sx={{
                backgroundColor: '#0077b6',
                '&:hover': { backgroundColor: '#005f91' },
              }}
            >
              Crear Cliente
            </Button>
          </Box>
    
          {/* Tabla con scroll para los datos */}
          <TableContainer component={Paper} sx={{ maxHeight: '400px', overflowY: 'auto' }}>
            <Table stickyHeader>
              <TableHead>
                <TableRow>
                  <TableCell sx={{ fontWeight: 'bold', backgroundColor: '#005f91', color: 'white' }}>
                    <strong>Nombre</strong>
                  </TableCell>
                  <TableCell sx={{ fontWeight: 'bold', backgroundColor: '#005f91', color: 'white' }}>
                    <strong>Activo</strong>
                  </TableCell>
                  <TableCell sx={{ fontWeight: 'bold', backgroundColor: '#005f91', color: 'white' }}>
                    <strong>Fecha de Nacimiento</strong>
                  </TableCell>
                  <TableCell align="right" sx={{ fontWeight: 'bold', backgroundColor: '#005f91', color: 'white' }}>
                    <strong>Acciones</strong>
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {clientes.map((cliente) => (
                  <TableRow key={cliente._id}>
                    <TableCell>{cliente.nombres} {cliente.apellidos}</TableCell>
                    <TableCell>{cliente.activo ? 'Sí' : 'No'}</TableCell>
                    <TableCell>{new Date(cliente.fechaNacimiento).toLocaleDateString()}</TableCell>
                    <TableCell align="right">
                      <Tooltip title="Ver Detalles" arrow>
                        <IconButton onClick={() => handleDetails(cliente._id)} color="primary">
                          <VisibilityIcon />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="Editar Cliente" arrow>
                        <IconButton onClick={() => handleEdit(cliente._id)} color="primary">
                          <EditIcon />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="Desactivar Cliente" arrow>
                        <IconButton onClick={() => handleDeactivate(cliente._id)} color="error">
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

export default GestionarClientes;
