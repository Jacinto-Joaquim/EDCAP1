
    import React, { useState, useEffect } from 'react';
    import { Button } from '@/components/ui/button.jsx';
    import { Input } from '@/components/ui/input.jsx';
    import { Textarea } from '@/components/ui/textarea.jsx';
    import { Label } from '@/components/ui/label.jsx';
    import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card.jsx';
    import { Save } from 'lucide-react';

    const AdminPostForm = ({ initialData, onSubmit, onCancel, isEditing }) => {
      const [formData, setFormData] = useState(initialData);

      useEffect(() => {
        setFormData(initialData);
      }, [initialData]);

      const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
      };

      const generateSlug = (title) => {
        return title
          .toLowerCase()
          .replace(/[^\w\s-]/g, '') 
          .replace(/\s+/g, '-') 
          .replace(/--+/g, '-') 
          .trim();
      };
      
      const handleTitleChange = (e) => {
        const title = e.target.value;
        setFormData(prev => ({
          ...prev,
          title: title,
          slug: generateSlug(title)
        }));
      };

      const handleSubmit = (e) => {
        e.preventDefault();
        const postData = {
          ...formData,
          tags: formData.tags.split(',').map(tag => tag.trim()).filter(tag => tag),
        };
        onSubmit(postData);
      };

      return (
        <Card>
          <CardHeader>
            <CardTitle>{isEditing ? 'Editar Post' : 'Criar Novo Post'}</CardTitle>
            <CardDescription>Preencha os campos abaixo para gerenciar o conteúdo do blog.</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <Label htmlFor="title">Título do Post</Label>
                <Input id="title" name="title" value={formData.title} onChange={handleTitleChange} required />
              </div>
              <div>
                <Label htmlFor="slug">Slug (URL Amigável)</Label>
                <Input id="slug" name="slug" value={formData.slug} onChange={handleInputChange} required 
                       className="bg-gray-100" placeholder="Será gerado automaticamente ou edite"/>
              </div>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="author">Autor</Label>
                  <Input id="author" name="author" value={formData.author} onChange={handleInputChange} required />
                </div>
                <div>
                  <Label htmlFor="category">Categoria</Label>
                  <Input id="category" name="category" value={formData.category} onChange={handleInputChange} required />
                </div>
              </div>
              <div>
                <Label htmlFor="tags">Tags (separadas por vírgula)</Label>
                <Input id="tags" name="tags" value={formData.tags} onChange={handleInputChange} />
              </div>
              <div>
                <Label htmlFor="excerpt">Resumo (Excerpt)</Label>
                <Textarea id="excerpt" name="excerpt" value={formData.excerpt} onChange={handleInputChange} rows={3} required />
              </div>
              <div>
                <Label htmlFor="content">Conteúdo Completo (HTML permitido)</Label>
                <Textarea id="content" name="content" value={formData.content} onChange={handleInputChange} rows={10} required 
                          placeholder="Escreva o conteúdo aqui. Você pode usar tags HTML como <p>, <h3>, <ul>, <li>, <a>, etc."/>
                <p className="text-xs text-muted-foreground mt-1">Dica: Use um editor HTML externo e cole o código aqui para formatação avançada.</p>
              </div>
              <div>
                <Label htmlFor="imageUrl">URL da Imagem de Capa ou Palavra-chave Unsplash</Label>
                <Input id="imageUrl" name="imageUrl" value={formData.imageUrl} onChange={handleInputChange} 
                       placeholder="Ex: https://exemplo.com/imagem.jpg ou 'modern office desk'"/>
                <p className="text-xs text-muted-foreground mt-1">Se usar palavra-chave, uma imagem relevante do Unsplash será buscada.</p>
              </div>
              <div className="flex items-center space-x-2">
                <input type="checkbox" id="featured" name="featured" checked={formData.featured} onChange={handleInputChange} className="h-4 w-4 text-primary border-gray-300 rounded focus:ring-primary"/>
                <Label htmlFor="featured" className="font-normal">Marcar como Destaque?</Label>
              </div>
              <div className="flex justify-end space-x-3 pt-4">
                  <Button type="button" variant="outline" onClick={onCancel}>
                      Cancelar
                  </Button>
                  <Button type="submit">
                      <Save className="h-4 w-4 mr-2" />
                      {isEditing ? 'Salvar Alterações' : 'Publicar Post'}
                  </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      );
    };

    export default AdminPostForm;
  