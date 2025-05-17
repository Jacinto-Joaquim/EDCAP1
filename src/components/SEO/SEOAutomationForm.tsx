import React from 'react';
import Select from '@mui/material/Select';
import type { SelectChangeEvent } from '@mui/material/Select';
import { Box, Container, Typography, TextField, Button, Paper, FormControl, FormControlLabel, Switch, InputLabel, MenuItem } from '@mui/material';

// Interface para as propriedades do componente
interface SEOAutomationFormProps {
  onSubmit: (seoData: SEOFormData) => void;
  initialData?: Partial<SEOFormData>;
  pageTitle?: string;
}

// Interface para os dados do formulário
export interface SEOFormData {
  title: string;
  description: string;
  keywords: string;
  generateSitemap: boolean;
  indexPage: boolean;
  socialImage: string;
  pageType: 'article' | 'product' | 'service' | 'profile' | 'website';
}

// Valores padrão para o formulário
const defaultFormData: SEOFormData = {
  title: '',
  description: '',
  keywords: '',
  generateSitemap: true,
  indexPage: true,
  socialImage: '',
  pageType: 'website'
};

/**
 * Componente de formulário para automação de SEO
 * 
 * Este componente permite que usuários leigos configurem facilmente
 * as meta tags e configurações de SEO para suas páginas.
 */
const SEOAutomationForm: React.FC<SEOAutomationFormProps> = ({ 
  onSubmit, 
  initialData = {}, 
  pageTitle = 'Configuração de SEO'
}) => {
  // Estado do formulário
  const [formData, setFormData] = React.useState<SEOFormData>({
    ...defaultFormData,
    ...initialData
  });

  // Estado para feedback de qualidade
  const [titleFeedback, setTitleFeedback] = React.useState('');
  const [descriptionFeedback, setDescriptionFeedback] = React.useState('');

  // Manipulador de mudança de campos de texto e switches
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, checked, type } = e.target;
    
    if (type === 'checkbox') {
      setFormData(prev => ({ ...prev, [name]: checked }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
    
    // Validação em tempo real
    if (name === 'title') {
      validateTitle(value);
    } else if (name === 'description') {
      validateDescription(value);
    }
  };
  
  // Manipulador específico para o Select
  const handleSelectChange = (e: SelectChangeEvent<'article' | 'product' | 'service' | 'profile' | 'website'>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ 
      ...prev, 
      [name as string]: value 
    }));
  };

  // Validação do título
  const validateTitle = (title: string) => {
    if (title.length === 0) {
      setTitleFeedback('O título é obrigatório');
    } else if (title.length < 30) {
      setTitleFeedback('Título muito curto. Recomendamos pelo menos 30 caracteres');
    } else if (title.length > 60) {
      setTitleFeedback('Título muito longo. Recomendamos no máximo 60 caracteres');
    } else {
      setTitleFeedback('Título com tamanho ideal!');
    }
  };

  // Validação da descrição
  const validateDescription = (description: string) => {
    if (description.length === 0) {
      setDescriptionFeedback('A descrição é obrigatória');
    } else if (description.length < 70) {
      setDescriptionFeedback('Descrição muito curta. Recomendamos pelo menos 70 caracteres');
    } else if (description.length > 160) {
      setDescriptionFeedback('Descrição muito longa. Recomendamos no máximo 160 caracteres');
    } else {
      setDescriptionFeedback('Descrição com tamanho ideal!');
    }
  };

  // Manipulador de envio do formulário
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  // Sugestões de palavras-chave baseadas no título e descrição
  const suggestKeywords = () => {
    const combinedText = `${formData.title} ${formData.description}`;
    
    // Extrair palavras, remover stopwords e selecionar as mais relevantes
    const words = combinedText.toLowerCase().split(/\s+/);
    const stopwords = ['e', 'o', 'a', 'os', 'as', 'um', 'uma', 'de', 'do', 'da', 'dos', 'das', 'em', 'no', 'na', 'nos', 'nas', 'para', 'por', 'com', 'sem'];
    
    const filteredWords = words.filter(word => 
      word.length > 3 && !stopwords.includes(word)
    );
    
    // Contar frequência das palavras
    const wordCount: Record<string, number> = {};
    filteredWords.forEach(word => {
      wordCount[word] = (wordCount[word] || 0) + 1;
    });
    
    // Ordenar por frequência e pegar as 5 mais comuns
    const sortedWords = Object.entries(wordCount)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5)
      .map(entry => entry[0]);
    
    // Atualizar o campo de palavras-chave
    setFormData(prev => ({ 
      ...prev, 
      keywords: sortedWords.join(', ')
    }));
  };

  return (
    <Container maxWidth="md">
      <Paper elevation={3} sx={{ p: 4, mt: 4, mb: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom align="center">
          {pageTitle}
        </Typography>
        
        <Typography variant="body1" paragraph align="center" color="text.secondary">
          Configure o SEO da sua página de forma simples e eficiente
        </Typography>
        
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 4 }}>
          <TextField
            fullWidth
            label="Título da Página"
            name="title"
            value={formData.title}
            onChange={handleChange}
            margin="normal"
            required
            helperText={titleFeedback}
            error={titleFeedback.includes('obrigatório') || titleFeedback.includes('curto') || titleFeedback.includes('longo')}
          />
          
          <Box sx={{ display: 'flex', alignItems: 'center', mt: 1, mb: 2 }}>
            <Typography variant="body2" color="text.secondary">
              {formData.title.length}/60 caracteres
            </Typography>
          </Box>
          
          <TextField
            fullWidth
            label="Descrição da Página"
            name="description"
            value={formData.description}
            onChange={handleChange}
            margin="normal"
            required
            multiline
            rows={3}
            helperText={descriptionFeedback}
            error={descriptionFeedback.includes('obrigatória') || descriptionFeedback.includes('curta') || descriptionFeedback.includes('longa')}
          />
          
          <Box sx={{ display: 'flex', alignItems: 'center', mt: 1, mb: 2 }}>
            <Typography variant="body2" color="text.secondary">
              {formData.description.length}/160 caracteres
            </Typography>
          </Box>
          
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 3 }}>
            <TextField
              fullWidth
              label="Palavras-chave (separadas por vírgula)"
              name="keywords"
              value={formData.keywords}
              onChange={handleChange}
              margin="normal"
            />
            <Button 
              variant="outlined" 
              onClick={suggestKeywords}
              sx={{ mt: 2, height: 56 }}
            >
              Sugerir
            </Button>
          </Box>
          
          <TextField
            fullWidth
            label="URL da Imagem para Redes Sociais"
            name="socialImage"
            value={formData.socialImage}
            onChange={handleChange}
            margin="normal"
            placeholder="https://exemplo.com/imagem.jpg"
          />
          
          <FormControl fullWidth margin="normal">
            <InputLabel id="page-type-label">Tipo de Página</InputLabel>
            <Select
              labelId="page-type-label"
              name="pageType"
              value={formData.pageType}
              onChange={handleSelectChange}
              label="Tipo de Página"
            >
              <MenuItem value="website">Website</MenuItem>
              <MenuItem value="article">Artigo</MenuItem>
              <MenuItem value="product">Produto</MenuItem>
              <MenuItem value="service">Serviço</MenuItem>
              <MenuItem value="profile">Perfil</MenuItem>
            </Select>
          </FormControl>
          
          <Box sx={{ mt: 3 }}>
            <FormControlLabel
              control={
                <Switch
                  checked={formData.indexPage}
                  onChange={handleChange}
                  name="indexPage"
                  color="primary"
                />
              }
              label="Permitir indexação pelos mecanismos de busca"
            />
          </Box>
          
          <Box sx={{ mt: 1 }}>
            <FormControlLabel
              control={
                <Switch
                  checked={formData.generateSitemap}
                  onChange={handleChange}
                  name="generateSitemap"
                  color="primary"
                />
              }
              label="Incluir esta página no sitemap"
            />
          </Box>
          
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            size="large"
            sx={{ mt: 4 }}
          >
            Aplicar Configurações de SEO
          </Button>
        </Box>
      </Paper>
    </Container>
  );
};

export default SEOAutomationForm;
