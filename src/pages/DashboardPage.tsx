import React from 'react';
import { Box, Container, Typography, Paper } from '@mui/material';

const DashboardPage: React.FC = () => {
  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Dashboard
      </Typography>
      
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
        <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, gap: 3 }}>
          <Box sx={{ flex: { xs: '1 1 100%', md: '1 1 66.666%' } }}>
            <Paper
              sx={{
                p: 2,
                display: 'flex',
                flexDirection: 'column',
                height: 240,
              }}
            >
              <Typography variant="h6" component="h2" gutterBottom>
                Próximas Aulas
              </Typography>
              <Box sx={{ p: 2, bgcolor: 'background.default', flexGrow: 1 }}>
                <Typography variant="body2" color="text.secondary">
                  Nenhuma aula agendada para hoje.
                </Typography>
              </Box>
            </Paper>
          </Box>
          
          <Box sx={{ flex: { xs: '1 1 100%', md: '1 1 33.333%' } }}>
            <Paper
              sx={{
                p: 2,
                display: 'flex',
                flexDirection: 'column',
                height: 240,
              }}
            >
              <Typography variant="h6" component="h2" gutterBottom>
                Notificações
              </Typography>
              <Box sx={{ p: 2, bgcolor: 'background.default', flexGrow: 1 }}>
                <Typography variant="body2" color="text.secondary">
                  Nenhuma notificação nova.
                </Typography>
              </Box>
            </Paper>
          </Box>
        </Box>
        
        <Box sx={{ width: '100%' }}>
          <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
            <Typography variant="h6" component="h2" gutterBottom>
              Progresso do Curso
            </Typography>
            <Box sx={{ p: 2, bgcolor: 'background.default', height: 200 }}>
              <Typography variant="body2" color="text.secondary">
                Dados de progresso serão exibidos aqui.
              </Typography>
            </Box>
          </Paper>
        </Box>
      </Box>
    </Container>
  );
};

export default DashboardPage;
