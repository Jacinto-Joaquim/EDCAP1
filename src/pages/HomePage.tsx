import React from 'react';
import { Box, Container, Typography, Button, useMediaQuery } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { useTranslation } from 'react-i18next';
import SEOAuto from '../components/SEO/SEOAuto';

// Componente de acessibilidade para pular para o conteúdo principal
const SkipLink = () => {
  const { t } = useTranslation();
  
  return (
    <Box
      component="a"
      href="#main-content"
      sx={{
        position: 'absolute',
        left: '-9999px',
        top: 'auto',
        width: '1px',
        height: '1px',
        overflow: 'hidden',
        '&:focus': {
          position: 'fixed',
          top: '0',
          left: '0',
          width: 'auto',
          height: 'auto',
          padding: '1rem',
          backgroundColor: 'primary.main',
          color: 'white',
          zIndex: 9999,
          textDecoration: 'none',
          fontWeight: 'bold',
        }
      }}
    >
      {t('accessibility.skipToContent')}
    </Box>
  );
};

const HomePage: React.FC = () => {
  const { t, i18n } = useTranslation();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  
  // Alternar idioma
  const toggleLanguage = () => {
    const newLang = i18n.language === 'pt' ? 'en' : 'pt';
    i18n.changeLanguage(newLang);
  };

  return (
    <>
      <SEOAuto 
        pageData={{
          title: t('common.appName') + ' - ' + t('home.hero.title'),
          path: '/',
          content: t('home.hero.subtitle'),
          image: '/logo.png',
          type: 'website'
        }}
        siteUrl="https://educonnect-angola.vercel.app"
      />
      
      {/* Link de acessibilidade para pular para o conteúdo principal */}
      <SkipLink />
      
      <Box>
        {/* Botão para alternar idioma */}
        <Button 
          onClick={toggleLanguage}
          sx={{ 
            position: 'fixed', 
            top: '1rem', 
            right: '1rem',
            zIndex: 1000,
            backgroundColor: 'background.paper',
            boxShadow: 1,
            '&:hover': {
              backgroundColor: 'background.default'
            }
          }}
          aria-label={i18n.language === 'pt' ? 'Switch to English' : 'Mudar para Português'}
        >
          {i18n.language === 'pt' ? 'EN' : 'PT'}
        </Button>
        
        {/* Hero Section */}
        <Box 
          id="main-content" // Ponto de destino para o link de acessibilidade
          sx={{ 
            bgcolor: 'primary.main', 
            color: 'white', 
            py: 8,
            textAlign: 'center'
          }}
          role="banner"
        >
          <Container maxWidth="lg">
            <Typography 
              variant="h2" 
              component="h1" 
              gutterBottom
              sx={{ fontSize: isMobile ? '2rem' : '3rem' }}
            >
              {t('common.appName')}
            </Typography>
            <Typography 
              variant="h5" 
              component="h2" 
              gutterBottom
              sx={{ fontSize: isMobile ? '1.25rem' : '1.5rem' }}
            >
              {t('home.hero.title')}
            </Typography>
            <Box sx={{ mt: 4 }}>
              <Box 
                component="a" 
                href="/register"
                sx={{ 
                  mr: 2,
                  display: 'inline-block',
                  bgcolor: 'secondary.main',
                  color: 'white',
                  py: 1.5,
                  px: 4,
                  borderRadius: 1,
                  textDecoration: 'none',
                  fontWeight: 'bold',
                  '&:hover': {
                    bgcolor: 'secondary.dark',
                  },
                  '&:focus': {
                    outline: '3px solid white',
                    outlineOffset: '2px'
                  }
                }}
                role="button"
                aria-label={t('home.hero.cta')}
              >
                {t('home.hero.cta')}
              </Box>
              <Box 
                component="a" 
                href="#saiba-mais"
                sx={{ 
                  display: 'inline-block',
                  border: '1px solid white',
                  color: 'white',
                  py: 1.5,
                  px: 4,
                  borderRadius: 1,
                  textDecoration: 'none',
                  fontWeight: 'bold',
                  '&:hover': {
                    bgcolor: 'rgba(255,255,255,0.1)',
                  },
                  '&:focus': {
                    outline: '3px solid white',
                    outlineOffset: '2px'
                  }
                }}
                role="button"
                aria-label={t('home.hero.learnMore')}
              >
                {t('home.hero.learnMore')}
              </Box>
            </Box>
          </Container>
        </Box>

        {/* Para quem é Section */}
        <Container 
          maxWidth="lg" 
          sx={{ py: 8 }}
          id="saiba-mais"
          component="section"
          aria-labelledby="for-who-title"
        >
          <Typography 
            variant="h3" 
            component="h2" 
            align="center" 
            gutterBottom
            id="for-who-title"
          >
            {t('home.forWho.title')}
          </Typography>
          <Box sx={{ 
            display: 'flex', 
            flexDirection: { xs: 'column', md: 'row' }, 
            gap: 4, 
            mt: 2 
          }}>
            <Box 
              sx={{ 
                flex: 1, 
                textAlign: 'center', 
                p: 4, 
                boxShadow: 1, 
                borderRadius: 2,
                '&:hover': {
                  boxShadow: 3,
                  transform: 'translateY(-4px)',
                  transition: 'all 0.3s'
                }
              }}
              component="article"
            >
              <Typography variant="h5" component="h3" gutterBottom>
                {t('home.forWho.schools.title')}
              </Typography>
              <Typography variant="body1">
                {t('home.forWho.schools.description')}
              </Typography>
              <Box 
                component="a" 
                href="/escolas"
                sx={{ 
                  mt: 3,
                  display: 'inline-block',
                  bgcolor: 'primary.main',
                  color: 'white',
                  py: 1,
                  px: 3,
                  borderRadius: 1,
                  textDecoration: 'none',
                  fontWeight: 'bold',
                  '&:hover': {
                    bgcolor: 'primary.dark',
                  },
                  '&:focus': {
                    outline: '3px solid',
                    outlineColor: 'primary.main',
                    outlineOffset: '2px'
                  }
                }}
                role="button"
                aria-label={t('common.seeMore')}
              >
                {t('common.seeMore')}
              </Box>
            </Box>
            
            <Box 
              sx={{ 
                flex: 1, 
                textAlign: 'center', 
                p: 4, 
                boxShadow: 1, 
                borderRadius: 2,
                '&:hover': {
                  boxShadow: 3,
                  transform: 'translateY(-4px)',
                  transition: 'all 0.3s'
                }
              }}
              component="article"
            >
              <Typography variant="h5" component="h3" gutterBottom>
                {t('home.forWho.teachers.title')}
              </Typography>
              <Typography variant="body1">
                {t('home.forWho.teachers.description')}
              </Typography>
              <Box 
                component="a" 
                href="/professores"
                sx={{ 
                  mt: 3,
                  display: 'inline-block',
                  bgcolor: 'primary.main',
                  color: 'white',
                  py: 1,
                  px: 3,
                  borderRadius: 1,
                  textDecoration: 'none',
                  fontWeight: 'bold',
                  '&:hover': {
                    bgcolor: 'primary.dark',
                  },
                  '&:focus': {
                    outline: '3px solid',
                    outlineColor: 'primary.main',
                    outlineOffset: '2px'
                  }
                }}
                role="button"
                aria-label={t('common.seeMore')}
              >
                {t('common.seeMore')}
              </Box>
            </Box>
            
            <Box 
              sx={{ 
                flex: 1, 
                textAlign: 'center', 
                p: 4, 
                boxShadow: 1, 
                borderRadius: 2,
                '&:hover': {
                  boxShadow: 3,
                  transform: 'translateY(-4px)',
                  transition: 'all 0.3s'
                }
              }}
              component="article"
            >
              <Typography variant="h5" component="h3" gutterBottom>
                {t('home.forWho.students.title')}
              </Typography>
              <Typography variant="body1">
                {t('home.forWho.students.description')}
              </Typography>
              <Box 
                component="a" 
                href="/alunos"
                sx={{ 
                  mt: 3,
                  display: 'inline-block',
                  bgcolor: 'primary.main',
                  color: 'white',
                  py: 1,
                  px: 3,
                  borderRadius: 1,
                  textDecoration: 'none',
                  fontWeight: 'bold',
                  '&:hover': {
                    bgcolor: 'primary.dark',
                  },
                  '&:focus': {
                    outline: '3px solid',
                    outlineColor: 'primary.main',
                    outlineOffset: '2px'
                  }
                }}
                role="button"
                aria-label={t('common.seeMore')}
              >
                {t('common.seeMore')}
              </Box>
            </Box>
          </Box>
        </Container>

        {/* Como Funciona Section */}
        <Box 
          sx={{ bgcolor: 'background.paper', py: 8 }}
          component="section"
          aria-labelledby="how-it-works-title"
        >
          <Container maxWidth="lg">
            <Typography 
              variant="h3" 
              component="h2" 
              align="center" 
              gutterBottom
              id="how-it-works-title"
            >
              {t('home.howItWorks.title')}
            </Typography>
            <Box sx={{ 
              display: 'flex', 
              flexDirection: { xs: 'column', md: 'row' },
              alignItems: 'center', 
              gap: 4,
              mt: 2 
            }}>
              <Box sx={{ flex: 1, p: 2 }}>
                <Typography variant="h5" component="h3" gutterBottom>
                  {t('home.howItWorks.liveClasses.title')}
                </Typography>
                <Typography variant="body1" paragraph>
                  {t('home.howItWorks.liveClasses.description')}
                </Typography>
                <Typography variant="h5" component="h3" gutterBottom>
                  {t('home.howItWorks.management.title')}
                </Typography>
                <Typography variant="body1" paragraph>
                  {t('home.howItWorks.management.description')}
                </Typography>
                <Typography variant="h5" component="h3" gutterBottom>
                  {t('home.howItWorks.accessibility.title')}
                </Typography>
                <Typography variant="body1">
                  {t('home.howItWorks.accessibility.description')}
                </Typography>
              </Box>
              <Box sx={{ flex: 1, p: 2, textAlign: 'center' }}>
                <Box 
                  sx={{ 
                    width: '100%', 
                    height: 300, 
                    bgcolor: 'primary.light',
                    borderRadius: 2,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}
                  role="img"
                  aria-label="Ilustração da plataforma"
                >
                  <Typography variant="h6" color="white">
                    [Imagem Ilustrativa]
                  </Typography>
                </Box>
              </Box>
            </Box>
          </Container>
        </Box>

        {/* CTA Section */}
        <Box 
          sx={{ bgcolor: 'secondary.main', color: 'white', py: 6, textAlign: 'center' }}
          component="section"
          aria-labelledby="cta-title"
        >
          <Container maxWidth="md">
            <Typography 
              variant="h4" 
              component="h2" 
              gutterBottom
              id="cta-title"
            >
              {t('home.cta.title')}
            </Typography>
            <Typography variant="body1" paragraph>
              {t('home.cta.description')}
            </Typography>
            <Box 
              component="a" 
              href="/register"
              sx={{ 
                mt: 2,
                display: 'inline-block',
                bgcolor: 'primary.main',
                color: 'white',
                py: 1.5,
                px: 4,
                borderRadius: 1,
                textDecoration: 'none',
                fontWeight: 'bold',
                '&:hover': {
                  bgcolor: 'primary.dark',
                },
                '&:focus': {
                  outline: '3px solid white',
                  outlineOffset: '2px'
                }
              }}
              role="button"
              aria-label={t('home.cta.button')}
            >
              {t('home.cta.button')}
            </Box>
          </Container>
        </Box>
      </Box>
    </>
  );
};

export default HomePage;
