import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { I18nextProvider } from 'react-i18next';
import i18n from '../src/i18n';

// Mock para o componente HomePage
jest.mock('../src/pages/HomePage', () => {
  return function MockHomePage() {
    return <div data-testid="home-page">Home Page Content</div>;
  };
});

// Mock para o componente SEOProvider
jest.mock('../src/components/SEO/SEOProvider', () => {
  return {
    SEOProvider: ({ children }) => <div data-testid="seo-provider">{children}</div>,
  };
});

// Mock para o RouterProvider
jest.mock('react-router-dom', () => {
  return {
    RouterProvider: ({ router }) => <div data-testid="router-provider">{router}</div>,
  };
});

// Mock para o ThemeProvider
jest.mock('@mui/material/styles', () => {
  return {
    ThemeProvider: ({ children }) => <div data-testid="theme-provider">{children}</div>,
    useTheme: () => ({ palette: { primary: { main: '#1a56db' } } }),
  };
});

// Mock para CssBaseline
jest.mock('@mui/material/CssBaseline', () => {
  return function MockCssBaseline() {
    return <div data-testid="css-baseline"></div>;
  };
});

// Importar o componente App
import App from '../src/main';

describe('App Component', () => {
  test('renders without crashing', () => {
    render(<App />);
    
    // Verificar se os principais componentes estão presentes
    expect(screen.getByTestId('theme-provider')).toBeInTheDocument();
    expect(screen.getByTestId('css-baseline')).toBeInTheDocument();
    expect(screen.getByTestId('seo-provider')).toBeInTheDocument();
    expect(screen.getByTestId('router-provider')).toBeInTheDocument();
  });
  
  test('has correct providers structure', () => {
    const { container } = render(<App />);
    
    // Verificar a estrutura de aninhamento dos providers
    const themeProvider = screen.getByTestId('theme-provider');
    const seoProvider = screen.getByTestId('seo-provider');
    const routerProvider = screen.getByTestId('router-provider');
    
    expect(themeProvider).toContainElement(seoProvider);
    expect(seoProvider).toContainElement(routerProvider);
  });
});
