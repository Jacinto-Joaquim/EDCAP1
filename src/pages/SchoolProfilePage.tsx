import React from 'react';
import { Box, Container, Typography, Paper } from '@mui/material';

const SchoolProfilePage: React.FC = () => {
  return (
    <Box>
      <Box 
        sx={{ 
          bgcolor: 'primary.main', 
          color: 'white', 
          py: 4,
          mb: 4
        }}
      >
        <Container maxWidth="lg">
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 3 }}>
            <Box sx={{ 
              width: 80, 
              height: 80, 
              bgcolor: 'white', 
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <Box sx={{ fontSize: 50, color: 'primary.main' }}>S</Box>
            </Box>
            <Box>
              <Typography variant="h4" component="h1">
                Nome da Escola
              </Typography>
              <Typography variant="subtitle1">
                Localização: Luanda, Angola
              </Typography>
              <Typography variant="subtitle2">
                Tipo: Escola Pública
              </Typography>
            </Box>
          </Box>
        </Container>
      </Box>

      <Container maxWidth="lg">
        <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, gap: 4 }}>
          <Box sx={{ flex: { xs: '1 1 100%', md: '1 1 66.666%' } }}>
            <Paper sx={{ p: 3, mb: 4 }}>
              <Typography variant="h5" component="h2" gutterBottom>
                Sobre a Escola
              </Typography>
              <Typography variant="body1" paragraph>
                Esta é uma escola comprometida com a excelência educacional e o desenvolvimento integral dos alunos. 
                Nossa missão é proporcionar um ambiente de aprendizagem estimulante e inclusivo.
              </Typography>
              <Typography variant="body1">
                Fundada em 2005, nossa instituição tem se destacado pela qualidade do ensino e pela formação de 
                cidadãos conscientes e preparados para os desafios do século XXI.
              </Typography>
            </Paper>

            <Paper sx={{ p: 3, mb: 4 }}>
              <Typography variant="h5" component="h2" gutterBottom>
                Cursos Oferecidos
              </Typography>
              <Box sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, gap: 2 }}>
                <Box sx={{ flex: '1 1 50%' }}>
                  <Paper variant="outlined" sx={{ p: 2 }}>
                    <Typography variant="h6">Ensino Fundamental</Typography>
                    <Typography variant="body2">1º ao 9º ano</Typography>
                  </Paper>
                </Box>
                <Box sx={{ flex: '1 1 50%' }}>
                  <Paper variant="outlined" sx={{ p: 2 }}>
                    <Typography variant="h6">Ensino Médio</Typography>
                    <Typography variant="body2">1º ao 3º ano</Typography>
                  </Paper>
                </Box>
              </Box>
            </Paper>
          </Box>

          <Box sx={{ flex: { xs: '1 1 100%', md: '1 1 33.333%' } }}>
            <Paper sx={{ p: 3, mb: 4 }}>
              <Typography variant="h5" component="h2" gutterBottom>
                Professores Destacados
              </Typography>
              <Box sx={{ mt: 2 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <Box sx={{ 
                    width: 40, 
                    height: 40, 
                    borderRadius: '50%', 
                    bgcolor: 'primary.light', 
                    color: 'white',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    mr: 2
                  }}>P</Box>
                  <Box>
                    <Typography variant="subtitle1">Prof. Paulo Silva</Typography>
                    <Typography variant="body2">Matemática</Typography>
                  </Box>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <Box sx={{ 
                    width: 40, 
                    height: 40, 
                    borderRadius: '50%', 
                    bgcolor: 'primary.light', 
                    color: 'white',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    mr: 2
                  }}>M</Box>
                  <Box>
                    <Typography variant="subtitle1">Profa. Maria Santos</Typography>
                    <Typography variant="body2">Ciências</Typography>
                  </Box>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <Box sx={{ 
                    width: 40, 
                    height: 40, 
                    borderRadius: '50%', 
                    bgcolor: 'primary.light', 
                    color: 'white',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    mr: 2
                  }}>J</Box>
                  <Box>
                    <Typography variant="subtitle1">Prof. João Costa</Typography>
                    <Typography variant="body2">História</Typography>
                  </Box>
                </Box>
              </Box>
            </Paper>

            <Paper sx={{ p: 3 }}>
              <Typography variant="h5" component="h2" gutterBottom>
                Artigos Publicados
              </Typography>
              <Box sx={{ mt: 2 }}>
                <Typography variant="subtitle1" gutterBottom>
                  A Importância da Tecnologia na Educação
                </Typography>
                <Typography variant="body2" color="text.secondary" gutterBottom>
                  Publicado em: 10/05/2025
                </Typography>
                <Typography variant="subtitle1" gutterBottom sx={{ mt: 2 }}>
                  Métodos Inovadores de Ensino
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Publicado em: 25/04/2025
                </Typography>
              </Box>
            </Paper>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default SchoolProfilePage;
