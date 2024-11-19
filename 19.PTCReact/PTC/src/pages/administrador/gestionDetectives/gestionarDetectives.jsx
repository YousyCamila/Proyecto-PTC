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

// Reutilizable para clientes y detectives
const GestionarEntidades = ({ entidad, apiEndpoint, editarPath, detallesPath, crearPath }) => {
  const [items, setItems] = useState([]);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const navigate = useNavigate();

  // Fetch datos desde la API
  const fetchEntidades = async () => {
    try {
      const response = await fetch(apiEndpoint);
      const data = await response.json();
      setItems(data);
    } catch (error) {
      console.error(`Error al cargar ${entidad}:`, error);
      setSnackbarMessage(`Error al cargar los ${entidad}`);
      setOpenSnackbar(true);
    }
  };

  useEffect(() => {
    fetchEntidades();
  }, []);

  const handleEdit = (itemId) => {
    navigate(`${editarPath}/${itemId}`);
  };

  const handleDetails = (itemId) => {
    navigate(`${detallesPath}/${itemId}`);
  };

  const handleDeactivate = async (itemId) => {
    const confirm = await Swal.fire({
      title: `¿Estás seguro?`,
      text: `Cambiará el estado del ${entidad.slice(0, -1)} a inactivo.`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Sí, desactivar',
    });

    if (confirm.isConfirmed) {
      try {
        await fetch(`${apiEndpoint}/${itemId}`, {
          method: 'DELETE',
        });
        setItems((prevItems) =>
          prevItems.map((item) =>
            item._id === itemId ? { ...item, activo: false } : item
          )
        );
        Swal.fire('Desactivado!', `El ${entidad.slice(0, -1)} ha sido desactivado.`, 'success');
      } catch (error) {
        console.error(`Error al desactivar ${entidad.slice(0, -1)}:`, error);
        setSnackbarMessage(`No se pudo desactivar el ${entidad.slice(0, -1)}.`);
        setOpenSnackbar(true);
      }
    }
  };

  const handleCreate = () => {
    navigate(crearPath);
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
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
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Container maxWidth="lg" sx={{ background: 'white', borderRadius: 2, padding: 4, boxShadow: 3 }}>
        <Typography
          variant="h4"
          component="h1"
          gutterBottom
          sx={{ textAlign: 'center', color: '#0077b6' }}
        >
          Gestionar {entidad}
        </Typography>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
          <Button
            variant="contained"
            onClick={handleCreate}
            sx={{
              backgroundColor: '#0077b6',
              '&:hover': { backgroundColor: '#005f91' },
            }}
          >
            Crear {entidad.slice(0, -1)}
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
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell
                  sx={{ fontWeight: 'bold', backgroundColor: '#005f91', color: 'white' }}
                >
                  <strong>Nombre</strong>
                </TableCell>
                <TableCell
                  sx={{ fontWeight: 'bold', backgroundColor: '#005f91', color: 'white' }}
                >
                  <strong>Activo</strong>
                </TableCell>
                <TableCell
                  sx={{ fontWeight: 'bold', backgroundColor: '#005f91', color: 'white' }}
                >
                  <strong>Fecha de Nacimiento</strong>
                </TableCell>
                <TableCell
                  align="right"
                  sx={{ fontWeight: 'bold', backgroundColor: '#005f91', color: 'white' }}
                >
                  <strong>Acciones</strong>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {items.map((item) => (
                <TableRow key={item._id}>
                  <TableCell>{item.nombres} {item.apellidos}</TableCell>
                  <TableCell>{item.activo ? 'Sí' : 'No'}</TableCell>
                  <TableCell>{new Date(item.fechaNacimiento).toLocaleDateString()}</TableCell>
                  <TableCell align="right">
                    <Tooltip title="Ver Detalles" arrow>
                      <IconButton onClick={() => handleDetails(item._id)} color="primary">
                        <VisibilityIcon />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Editar" arrow>
                      <IconButton onClick={() => handleEdit(item._id)} color="primary">
                        <EditIcon />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Desactivar" arrow>
                      <IconButton onClick={() => handleDeactivate(item._id)} color="error">
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

// Ejemplo de uso para Detectives
const GestionarDetectives = () => (
  <GestionarEntidades
    entidad="Detectives"
    apiEndpoint="http://localhost:3000/api/detectives"
    editarPath="/editar-detective"
    detallesPath="/detalles-detective"
    crearPath="/crear-detective"
  />
);

export default GestionarDetectives;
