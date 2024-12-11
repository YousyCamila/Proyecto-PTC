import React, { useState } from 'react';
import { Box, Button, Container, Typography, TextField, AppBar, Toolbar, Grid } from '@mui/material';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import './contactanos.css';
import FacebookIcon from '@mui/icons-material/Facebook';
import YouTubeIcon from '@mui/icons-material/YouTube';
import InstagramIcon from '@mui/icons-material/Instagram';
import LocationOnIcon from '@mui/icons-material/LocationOn';

const Contactanos = () => {
  const [formData, setFormData] = useState({
    nombre: '',
    correoCliente: '',
    numeroCelular: '',
    descripcion: '',
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const validarCorreo = (correo) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(correo);
  const validarNumeroCelular = (numero) => /^[0-9]{10}$/.test(numero);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validarCorreo(formData.correoCliente)) {
      return Swal.fire('Error', 'El correo no tiene un formato válido.', 'error');
    }

    if (!validarNumeroCelular(formData.numeroCelular)) {
      return Swal.fire('Error', 'El número de celular debe tener 10 dígitos y solo contener números.', 'error');
    }

    try {
      const response = await fetch('http://localhost:3000/api/formularios', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        Swal.fire('Formulario Enviado', 'Tu mensaje ha sido enviado correctamente.', 'success').then(() => {
          navigate('/');
        });
      } else {
        const errorData = await response.json();
        Swal.fire('Error', errorData.message || 'No se pudo enviar el formulario.', 'error');
      }
    } catch (error) {
      console.error('Error al enviar el formulario:', error);
      Swal.fire('Error', 'Ocurrió un error inesperado. Inténtalo más tarde.', 'error');
    }
  };

  return (
    <Box className="main-container">
      <AppBar position="static" sx={{ background: 'linear-gradient(to left, rgba(0, 0, 139, 1), rgba(0, 0, 0, 0.911), rgba(0, 0, 139, 1))' }}>
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>PTC</Typography>
          <Button color="inherit" href="/">Inicio</Button>
          <Button color="inherit" href="/servicios">Servicios</Button>
          <Button color="inherit" href="/contactanos">Contáctanos</Button>
          <Button color="inherit" href="/login">Inicio de Sesión</Button>
        </Toolbar>
      </AppBar>

      <Box className="content-container">
        <Container maxWidth="sm" className="form-container">
          <Typography variant="h4" component="h1" className="title">
            Contáctanos
          </Typography>

          <form onSubmit={handleSubmit}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Nombre"
                  name="nombre"
                  value={formData.nombre}
                  onChange={handleChange}
                  required
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Correo Electrónico"
                  name="correoCliente"
                  type="email"
                  value={formData.correoCliente}
                  onChange={handleChange}
                  required
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Número Celular"
                  name="numeroCelular"
                  type="tel"
                  value={formData.numeroCelular}
                  onChange={handleChange}
                  required
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Descripción"
                  name="descripcion"
                  multiline
                  rows={4}
                  value={formData.descripcion}
                  onChange={handleChange}
                  required
                />
              </Grid>
            </Grid>

            <Button
              type="submit"
              variant="contained"
              fullWidth
              className="submit-button"
            >
              Enviar
            </Button>
          </form>
        </Container>

        <Box className="instructions-container">
          <Typography variant="h1" gutterBottom sx={{ fontSize: '1.7rem', fontWeight: 'bold' }}>Instrucciones:</Typography>
          <Typography variant="body1" sx={{ fontSize: '1.3rem' }}>
            Por favor, complete el formulario con sus datos. Nos pondremos en contacto con usted lo antes posible.
          </Typography>
          <Box sx={{ marginTop: '3rem', padding: '3.8rem', border: '1px solid #00448CFF', borderRadius: '8px', backgroundColor: '#f0f8ff', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', marginBottom: '4rem ', display: 'flex', alignItems: 'center' }}>
            <Box sx={{ flex: 1 }}>
              <Typography variant="h5" sx={{ fontWeight: 'bold', color: '#00448DFF' }}>Información de Contacto</Typography>
              <Typography variant="body1" sx={{ marginTop: '1.1rem', color: '#333', fontSize: '1.1rem' }}>
                Teléfono: <span style={{ fontWeight: 'bold' }}>350 797 2131</span>
                <br />
                Dirección: <span style={{ fontWeight: 'bold' }}>Carrera 15 # 79-70</span>
                <br />
                Ciudad: <span style={{ fontWeight: 'bold' }}>Bogotá</span>
                <br />
                País: <span style={{ fontWeight: 'bold' }}>Colombia</span>
              </Typography>
            </Box>
            <a href="https://www.google.com/maps?q=Carrera+15+%2379-70,Bogotá,Colombia" target="_blank" rel="noopener noreferrer" style={{ display: 'flex', alignItems: 'center', marginLeft: '1rem' }}>
              <LocationOnIcon sx={{ fontSize: '100px', color: '#00448DFF', marginRight: '0.5rem' }} />
              <Typography variant="body2" sx={{ color: '#333', fontWeight: 'bold' }}>Encuéntranos acá, Oficina 400</Typography> {/* Aplicar negrita al texto */}
            </a>
          </Box>

          <Box sx={{ marginTop: '1rem' }}>
            <Typography variant="body1" sx={{ marginBottom: '0.5rem' }}>Síguenos en:</Typography>
            <Box sx={{ display: 'flex', gap: '1rem' }}>
              <a href="https://www.facebook.com/ptcinvestigadorprivado" target="_blank" rel="noopener noreferrer">
                <FacebookIcon sx={{ fontSize: '1.8rem'}} />
              </a>
              <a href="https://www.youtube.com/@ptcinvestigationtechnology2936/videos" target="_blank" rel="noopener noreferrer">
                <YouTubeIcon sx={{ fontSize: '1.8rem'}} />
              </a>
              <a href="https://www.instagram.com/ptcinvestigationtechnology/">
                <InstagramIcon sx={{ fontSize: '1.8rem'}} />
              </a>
            </Box>
          </Box>

        </Box>
      </Box>

      <footer className="footer">
        <Typography variant="h4">PTC</Typography>
        <Typography variant="body2" className="footer-text">© 2024 PTC. Todos los derechos reservados.</Typography>
      </footer>
    </Box>
  );
};

export default Contactanos;
