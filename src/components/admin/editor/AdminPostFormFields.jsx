
    import React from 'react';
    import { Input } from '@/components/ui/input.jsx';
    import { Textarea } from '@/components/ui/textarea.jsx';
    import { Label } from '@/components/ui/label.jsx';
    import { Button } from '@/components/ui/button.jsx';
    import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card.jsx';
    import { ImagePlus } from 'lucide-react';

    const AdminPostFormFields = ({ formData, onFormChange, userRole, imagePreview, onImageUploadDialogOpen }) => {
      const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;
        onFormChange(name, type === 'checkbox' ? checked : value);
      };
      
      const handleTitleChange = (e) => {
        onFormChange('title', e.target.value);
      };

      return (
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="text-xl text-primary">{formData.title || 'Novo Post'}</CardTitle>
            <CardDescription>Detalhes básicos e metadados do post.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <Label htmlFor="title" className="text-primary font-semibold">Título do Post <span className="text-destructive">*</span></Label>
              <Input id="title" name="title" value={formData.title} onChange={handleTitleChange} required className="mt-1 bg-background focus:border-accent" />
            </div>
            <div>
              <Label htmlFor="slug" className="text-primary font-semibold">Slug (URL Amigável) <span className="text-destructive">*</span></Label>
              <Input id="slug" name="slug" value={formData.slug} onChange={handleInputChange} required className="mt-1 bg-muted focus:border-accent" placeholder="Será gerado automaticamente ou edite"/>
            </div>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <Label htmlFor="category" className="text-primary font-semibold">Categoria <span className="text-destructive">*</span></Label>
                <Input id="category" name="category" value={formData.category} onChange={handleInputChange} required className="mt-1 bg-background focus:border-accent" />
              </div>
              <div>
                <Label htmlFor="tags" className="text-primary font-semibold">Tags (separadas por vírgula)</Label>
                <Input id="tags" name="tags" value={formData.tags} onChange={handleInputChange} className="mt-1 bg-background focus:border-accent" />
              </div>
            </div>

            <div>
              <Label htmlFor="excerpt" className="text-primary font-semibold">Resumo (Excerpt) <span className="text-destructive">*</span></Label>
              <Textarea id="excerpt" name="excerpt" value={formData.excerpt} onChange={handleInputChange} rows={3} required className="mt-1 bg-background focus:border-accent" />
            </div>

             <div className="space-y-2">
                <Label className="text-primary font-semibold">Imagem de Capa</Label>
                <div className="flex items-center gap-4">
                    {imagePreview ? (
                        <img src={imagePreview} alt="Pré-visualização da capa" className="h-24 w-auto rounded-md border border-border object-contain" />
                    ) : (
                        <div className="h-24 w-32 flex items-center justify-center bg-muted rounded-md border border-dashed border-border text-muted-foreground">
                            Sem Imagem
                        </div>
                    )}
                    <Button type="button" variant="outline" onClick={onImageUploadDialogOpen} className="border-primary text-primary hover:bg-primary/5">
                        <ImagePlus className="h-4 w-4 mr-2" />
                        {imagePreview ? 'Alterar Imagem' : 'Adicionar Imagem'}
                    </Button>
                </div>
                 <Input 
                    id="imageUrl" 
                    name="imageUrl" 
                    value={formData.imageUrl} 
                    onChange={handleInputChange} 
                    className="mt-2 bg-muted focus:border-accent" 
                    placeholder="URL da imagem (preenchida após upload)"
                    readOnly 
                />
                <p className="text-xs text-muted-foreground">A imagem de capa é enviada através do botão acima. Cole uma URL externa apenas se necessário.</p>
            </div>

             <div>
              <Label htmlFor="imageAlt" className="text-primary font-semibold">Texto Alternativo da Imagem de Capa (SEO)</Label>
              <Input id="imageAlt" name="imageAlt" value={formData.imageAlt} onChange={handleInputChange} className="mt-1 bg-background focus:border-accent" placeholder="Descreva a imagem para acessibilidade e SEO"/>
            </div>


            <div className="flex items-center space-x-4 pt-2">
              <div className="flex items-center space-x-2">
                <input type="checkbox" id="featured" name="featured" checked={formData.featured} onChange={handleInputChange} className="h-4 w-4 text-accent border-border rounded focus:ring-accent"/>
                <Label htmlFor="featured" className="font-normal text-primary">Marcar como Destaque?</Label>
              </div>
              {userRole === 'manager' && (
                <div className="flex items-center space-x-2">
                  <input type="checkbox" id="approved" name="approved" checked={formData.approved} onChange={handleInputChange} className="h-4 w-4 text-success border-border rounded focus:ring-success"/>
                  <Label htmlFor="approved" className="font-normal text-primary">Aprovado para Publicação?</Label>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      );
    };

    export default AdminPostFormFields;
  