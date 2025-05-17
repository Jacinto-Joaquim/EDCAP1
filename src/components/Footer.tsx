import React from 'react';
import { Box, Container, Typography } from '@mui/material';

const Footer: React.FC = () => {
  return (
    <Box component="footer" sx={{ bgcolor: 'primary.dark', color: 'white', py: 3, mt: 'auto' }}>
      <Container maxWidth="lg">
        <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, justifyContent: 'space-between', alignItems: { xs: 'center', md: 'flex-start' } }}>
          <Box sx={{ mb: { xs: 2, md: 0 } }}>
            <Typography variant="h6" component="div" gutterBottom>
              EduConnect Angola
            </Typography>
            <Typography variant="body2">
              Conectando a Educação Digital em Angola
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, gap: { xs: 1, sm: 3 }, textAlign: { xs: 'center', md: 'left' } }}>
            <Typography variant="body2">Sobre</Typography>
            <Typography variant="body2">Contato</Typography>
            <Typography variant="body2">Termos</Typography>
            <Typography variant="body2">Privacidade</Typography>
          </Box>
        </Box>
        <Box sx={{ mt: 3, textAlign: 'center' }}>
          <Typography variant="body2">
            © {new Date().getFullYear()} EduConnect Angola. Todos os direitos reservados.
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;
