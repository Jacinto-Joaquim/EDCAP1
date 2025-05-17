import React, { lazy, Suspense } from 'react';
import { Box, CircularProgress, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';

// Componente de carregamento para usar com lazy loading
const LoadingFallback = () => {
  const { t } = useTranslation();
  
  return (
    <Box 
      sx={{ 
        display: 'flex', 
        flexDirection: 'column',
        justifyContent: 'center', 
        alignItems: 'center', 
        height: '100vh' 
      }}
    >
      <CircularProgress size={60} thickness={4} />
      <Typography variant="h6" sx={{ mt: 2 }}>
        {t('common.loading')}
      </Typography>
    </Box>
  );
};

// Lazy loading dos componentes de página
const LazyHomePage = lazy(() => import('../pages/HomePage'));
const LazyLoginPage = lazy(() => import('../pages/LoginPage'));
const LazyRegisterPage = lazy(() => import('../pages/RegisterPage'));
const LazyDashboardPage = lazy(() => import('../pages/DashboardPage'));
const LazySchoolProfilePage = lazy(() => import('../pages/SchoolProfilePage'));
const LazyClassroomPage = lazy(() => import('../pages/ClassroomPage'));
const LazyNotFoundPage = lazy(() => import('../pages/NotFoundPage'));

// Componente de layout com Suspense para lazy loading
const Layout = React.lazy(() => import('../components/Layout'));

// Configuração de rotas com lazy loading
import { createBrowserRouter } from 'react-router-dom';

const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <Suspense fallback={<LoadingFallback />}>
        <Layout />
      </Suspense>
    ),
    errorElement: (
      <Suspense fallback={<LoadingFallback />}>
        <LazyNotFoundPage />
      </Suspense>
    ),
    children: [
      {
        index: true,
        element: (
          <Suspense fallback={<LoadingFallback />}>
            <LazyHomePage />
          </Suspense>
        )
      },
      {
        path: 'login',
        element: (
          <Suspense fallback={<LoadingFallback />}>
            <LazyLoginPage />
          </Suspense>
        )
      },
      {
        path: 'register',
        element: (
          <Suspense fallback={<LoadingFallback />}>
            <LazyRegisterPage />
          </Suspense>
        )
      },
      {
        path: 'dashboard',
        element: (
          <Suspense fallback={<LoadingFallback />}>
            <LazyDashboardPage />
          </Suspense>
        )
      },
      {
        path: 'school/:id',
        element: (
          <Suspense fallback={<LoadingFallback />}>
            <LazySchoolProfilePage />
          </Suspense>
        )
      },
      {
        path: 'classroom/:id',
        element: (
          <Suspense fallback={<LoadingFallback />}>
            <LazyClassroomPage />
          </Suspense>
        )
      }
    ]
  }
]);

export default router;
