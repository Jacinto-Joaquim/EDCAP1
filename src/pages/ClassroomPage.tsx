import React from 'react';
import { Box, Container, Typography, Paper, Button } from '@mui/material';
import VideocamIcon from '@mui/icons-material/Videocam';
import ChatIcon from '@mui/icons-material/Chat';
import PeopleIcon from '@mui/icons-material/People';
import ScreenShareIcon from '@mui/icons-material/ScreenShare';
import MicIcon from '@mui/icons-material/Mic';

const ClassroomPage: React.FC = () => {
  return (
    <Box sx={{ height: 'calc(100vh - 64px)', display: 'flex', flexDirection: 'column' }}>
      <Box sx={{ bgcolor: 'primary.dark', color: 'white', py: 1, px: 2 }}>
        <Container maxWidth="lg">
          <Typography variant="h6">Matemática - Álgebra Linear</Typography>
          <Typography variant="body2">Prof. Carlos Santos • Ao vivo</Typography>
        </Container>
      </Box>

      <Box sx={{ flexGrow: 1, display: 'flex', flexDirection: { xs: 'column', md: 'row' } }}>
        {/* Área principal de vídeo */}
        <Box sx={{ flexGrow: 1, bgcolor: '#1a1a1a', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <Box sx={{ textAlign: 'center', color: 'white' }}>
            <VideocamIcon sx={{ fontSize: 60, mb: 2, opacity: 0.7 }} />
            <Typography variant="h6">Transmissão ao vivo</Typography>
          </Box>
        </Box>

        {/* Barra lateral */}
        <Box 
          sx={{ 
            width: { xs: '100%', md: 300 }, 
            bgcolor: 'background.paper', 
            borderLeft: '1px solid', 
            borderColor: 'divider',
            display: 'flex',
            flexDirection: 'column'
          }}
        >
          {/* Abas */}
          <Box sx={{ display: 'flex', borderBottom: '1px solid', borderColor: 'divider' }}>
            <Button 
              startIcon={<ChatIcon />} 
              sx={{ 
                flex: 1, 
                borderRadius: 0, 
                py: 1.5,
                borderBottom: '2px solid',
                borderColor: 'primary.main'
              }}
            >
              Chat
            </Button>
            <Button 
              startIcon={<PeopleIcon />} 
              sx={{ 
                flex: 1, 
                borderRadius: 0, 
                py: 1.5,
                color: 'text.secondary'
              }}
            >
              Participantes
            </Button>
          </Box>

          {/* Área de chat */}
          <Box sx={{ flexGrow: 1, p: 2, overflowY: 'auto', display: 'flex', flexDirection: 'column' }}>
            <Box sx={{ flexGrow: 1 }}>
              <Typography variant="body2" color="text.secondary" align="center" sx={{ mt: 4 }}>
                Bem-vindo ao chat da aula!
              </Typography>
            </Box>
          </Box>

          {/* Input de mensagem */}
          <Box sx={{ p: 2, borderTop: '1px solid', borderColor: 'divider' }}>
            <Paper
              component="form"
              sx={{ p: '2px 4px', display: 'flex', alignItems: 'center' }}
              variant="outlined"
            >
              <Box component="input" 
                sx={{ 
                  ml: 1, 
                  flex: 1,
                  border: 'none',
                  outline: 'none',
                  fontSize: '0.875rem',
                  fontFamily: 'inherit'
                }} 
                placeholder="Enviar mensagem..." 
              />
              <Button size="small" sx={{ ml: 1 }}>
                Enviar
              </Button>
            </Paper>
          </Box>
        </Box>
      </Box>

      {/* Controles */}
      <Box sx={{ 
        bgcolor: 'background.paper', 
        py: 2, 
        borderTop: '1px solid', 
        borderColor: 'divider',
        display: 'flex',
        justifyContent: 'center',
        gap: 2
      }}>
        <Button 
          variant="contained" 
          color="primary" 
          startIcon={<MicIcon />}
          sx={{ borderRadius: 8 }}
        >
          Áudio
        </Button>
        <Button 
          variant="contained" 
          color="primary" 
          startIcon={<VideocamIcon />}
          sx={{ borderRadius: 8 }}
        >
          Vídeo
        </Button>
        <Button 
          variant="contained" 
          color="primary" 
          startIcon={<ScreenShareIcon />}
          sx={{ borderRadius: 8 }}
        >
          Compartilhar
        </Button>
        <Button 
          variant="contained" 
          color="error"
          sx={{ borderRadius: 8 }}
        >
          Sair
        </Button>
      </Box>
    </Box>
  );
};

export default ClassroomPage;
