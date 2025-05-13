
    import React from 'react';
    import { Button } from '@/components/ui/button.jsx';
    import { Card, CardContent } from '@/components/ui/card.jsx';
    import { Eye, Edit3, Trash2 } from 'lucide-react';
    import { Link } from 'react-router-dom';
    import {
      AlertDialog,
      AlertDialogAction,
      AlertDialogCancel,
      AlertDialogContent,
      AlertDialogDescription,
      AlertDialogFooter,
      AlertDialogHeader,
      AlertDialogTitle,
      AlertDialogTrigger,
    } from "@/components/ui/alert-dialog.jsx";

    const AdminPostList = ({ posts, onEdit, onDelete }) => {
      if (posts.length === 0) {
        return (
          <Card>
            <CardContent>
              <p className="p-6 text-center text-muted-foreground">Nenhum post encontrado. Crie um novo!</p>
            </CardContent>
          </Card>
        );
      }

      return (
        <Card>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Título</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Categoria</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Data</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Destaque</th>
                    <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Ações</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {posts.map(post => (
                    <tr key={post.id}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">{post.title}</div>
                        <div className="text-xs text-gray-500">{post.slug}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{post.category}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{new Date(post.date).toLocaleDateString('pt-BR')}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{post.featured ? 'Sim' : 'Não'}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium space-x-2">
                        <Button variant="ghost" size="sm" asChild className="text-blue-600 hover:text-blue-800">
                          <Link to={`/blog/${post.slug}`} target="_blank"><Eye className="h-4 w-4" /></Link>
                        </Button>
                        <Button variant="ghost" size="sm" onClick={() => onEdit(post)} className="text-yellow-600 hover:text-yellow-800">
                          <Edit3 className="h-4 w-4" />
                        </Button>
                        <AlertDialog>
                          <AlertDialogTrigger asChild>
                            <Button variant="ghost" size="sm" className="text-red-600 hover:text-red-800">
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </AlertDialogTrigger>
                          <AlertDialogContent>
                            <AlertDialogHeader>
                              <AlertDialogTitle>Confirmar Exclusão</AlertDialogTitle>
                              <AlertDialogDescription>
                                Tem certeza que deseja excluir o post "{post.title}"? Esta ação não pode ser desfeita.
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel>Cancelar</AlertDialogCancel>
                              <AlertDialogAction onClick={() => onDelete(post.id)} className="bg-destructive hover:bg-destructive/90">
                                Excluir
                              </AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      );
    };

    export default AdminPostList;
  