import React from 'react';
import { Box, Container, Typography, Button, Paper } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';

const NotFoundPage: React.FC = () => {
  return (
    <Container maxWidth="md">
      <Box sx={{ mt: 8, mb: 8, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Paper elevation={3} sx={{ p: 4, width: '100%', textAlign: 'center' }}>
          <Typography variant="h1" component="h1" sx={{ fontSize: '6rem', fontWeight: 'bold', color: 'primary.main' }}>
            404
          </Typography>
          <Typography variant="h4" component="h2" gutterBottom>
            Página não encontrada
          </Typography>
          <Typography variant="body1" paragraph sx={{ mb: 4 }}>
            A página que você está procurando não existe ou foi movida.
          </Typography>
          <Button 
            variant="contained" 
            color="primary" 
            component={RouterLink} 
            to="/"
            size="large"
          >
            Voltar para a página inicial
          </Button>
        </Paper>
      </Box>
    </Container>
  );
};

export default NotFoundPage;
