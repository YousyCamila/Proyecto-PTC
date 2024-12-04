

import React, { useState } from 'react';
import {
  Box,
  Button,
  Container,
  TextField,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from '@mui/material';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';

const AgregarEvidencia = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    fechaEvidencia: '',
    descripcion: '',
    idCasos: '', // ID del caso ingresado manualmente
    tipoEvidencia: '', // Un único tipo seleccionado
  });

  const tiposEvidencia = ['tipoDocumento', 'tipoFotografia', 'tipoVideo', 'tipoAudio', 'archivosDigitales'];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:3000/api/evidencias', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        Swal.fire({
          icon: 'success',
          title: 'Evidencia Agregada',
          text: 'La evidencia se ha agregado exitosamente.',
        });
        navigate('/cliente-menu'); // Redirige al menú general de clientes
      } else {
        const data = await response.json();
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: data.error || 'No se pudo agregar la evidencia.',
        });
      }
    } catch (error) {
      console.error('Error al agregar evidencia:', error);
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Ocurrió un error inesperado.',
      });
    }
  };

  return (
    <Box
      sx={{
        width: '100vw',
        height: '100vh',
        background: 'linear-gradient(to right, #0077b6, #00b4d8)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Container
        maxWidth="sm"
        sx={{
          backgroundColor: 'white',
          padding: 4,
          borderRadius: 2,
          boxShadow: 3,
          minHeight: '80vh',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
        }}
      >
        <Typography variant="h4" sx={{ textAlign: 'center', color: '#0077b6', mb: 2 }}>
          Agregar Evidencia
        </Typography>

        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            label="ID del Caso"
            name="idCasos"
            margin="normal"
            value={formData.idCasos}
            onChange={handleChange}
            required
          />
          <TextField
            fullWidth
            label="Fecha de Evidencia"
            type="date"
            name="fechaEvidencia"
            margin="normal"
            value={formData.fechaEvidencia}
            onChange={handleChange}
            required
            InputLabelProps={{
              shrink: true,
            }}
          />
          <TextField
            fullWidth
            label="Descripción"
            name="descripcion"
            margin="normal"
            value={formData.descripcion}
            onChange={handleChange}
            required
          />
          <FormControl fullWidth margin="normal">
            <InputLabel id="tipoEvidencia-label">Tipo de Evidencia</InputLabel>
            <Select
              labelId="tipoEvidencia-label"
              name="tipoEvidencia"
              value={formData.tipoEvidencia}
              onChange={handleChange}
              required
            >
              {tiposEvidencia.map((tipo) => (
                <MenuItem key={tipo} value={tipo}>
                  {tipo}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, backgroundColor: '#0077b6', '&:hover': { backgroundColor: '#005f91' } }}
          >
            Agregar Evidencia
          </Button>
          <Button
            variant="outlined"
            onClick={() => navigate('/cliente-menu')}
            sx={{
              mt: 2,
              color: '#0077b6',
              borderColor: '#0077b6',
              '&:hover': { backgroundColor: '#e0e0e0' },
            }}
          >
            Volver
          </Button>
        </form>
      </Container>
    </Box>
  );
};

export default AgregarEvidencia;
