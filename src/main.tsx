import { RouterProvider } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { I18nextProvider } from 'react-i18next';
import router from './routes/routes';
import theme from './theme/theme';
import { SEOProvider } from './components/SEO/SEOProvider';
import i18n from './i18n';

// Registrar o service worker para PWA
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/service-worker.js')
      .then(registration => {
        console.log('Service Worker registrado com sucesso:', registration);
      })
      .catch(error => {
        console.log('Falha ao registrar Service Worker:', error);
      });
  });
}

function App() {
  return (
    <I18nextProvider i18n={i18n}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <SEOProvider defaultSEO={{
          title: 'EduConnect Angola',
          description: 'Plataforma educacional para escolas, professores e alunos em Angola',
          keywords: 'educação, angola, ensino online, plataforma educacional',
          ogImage: '/logo.png',
          twitterCard: 'summary_large_image'
        }}>
          <RouterProvider router={router} />
        </SEOProvider>
      </ThemeProvider>
    </I18nextProvider>
  );
}

export default App;
